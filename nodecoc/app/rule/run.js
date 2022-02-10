import log4js from "log4js";
import schedule from 'node-schedule';
import pm2 from 'pm2';
import path from 'path';
import { coreRedis } from '../core';
import { toolsObjSort } from '../core/tools/index';


const logSystem = log4js.getLogger("system");

let QueueIndex = 2;
let Queuelength = 2;
let forkList = [];
let QueueInterval;
let QueueAppTime;
let QueueIntervalTime = 30 * 60 * 1000;

export default async(modules) => {

    let list = await pmList();
    for (let item of list) {
        await pmStop(item.name);
        await pmDel(item.name);
    }

    let forkObj = {};
    let forkFun;
    let forkState;
    //获取所有爬虫
    for (let key in modules) {
        if (modules[key]) {
            for (let fkey in modules[key]) {
                forkFun = modules[key][fkey];
                if (forkFun) {
                    forkState = await forkFun(null, 1);
                    if (forkState && forkState.fork) {
                        forkObj = {};
                        forkObj['order'] = forkState.order;
                        forkObj['overdueTime'] = forkState.minTime * 60 || 5 * 60; //过期时间
                        forkObj['spaceTime'] = forkState.maxTime * 60 || 10 * 60; //重启间隔时间，时间没到则跳过
                        forkObj['state'] = 2;
                        forkObj['name'] = `apddata-${key}-${fkey}`;
                        forkObj['rule'] = `${key}/${fkey}`;
                        forkList.push(forkObj);
                    }
                }
            }
        }
    }

    // //console.log('modules===', modules);

    //所有爬虫排序
    forkList = toolsObjSort(forkList, 'order');


    let name;
    coreRedis.subscribe("chat");
    //执行完毕之后推送消息关闭进程
    coreRedis.on("message", async function(channel, message) {
        if (message.indexOf('/') >= 0) {
            name = message.replace('/', "-");
            if (name) {
                //console.log(`结束进程---------------------：-------apddata-${name}`)
                await pmDel(`apddata-${name}`);
                setTimeout(() => {
                    QueueRun();
                }, 3 * 1000);
            }
        }
    });

    // //console.log('forkList===', forkList, 'QueueIndex===',QueueIndex);
    //循环启动
    for (let forkItem of forkList.slice(0, Queuelength)) {
        //console.log('====首次执行进程====：', forkItem.name)
        await pmStart(forkItem.name, forkItem.rule);
        forkItem.startTime = parseInt(new Date().getTime() / 1000);
        forkItem.state = 1;
    }

    // //console.log('forkList=2==', forkList);
    //启动过期超时遍历
    AppTime();
    // QueueIndex--;

};

//定时判断是否过期
/* { order: 10000,
    overdueTime: 300,
    name: 'apddata-works-apdnews',
    rule: 'works/apdnews' }, */
async function AppTime(next = 0) {
    QueueAppTime && clearInterval(QueueAppTime);
    QueueAppTime = setInterval(() => {
        // apddata-works-apdnews
        for (let t in forkList) {
            let fork = forkList[t];
            let time = parseInt(new Date().getTime() / 1000);
            // //console.log('====过期时间===',fork.name, fork.startTime + fork.overdueTime, '当前时间=', time, '是否过期',fork.startTime + fork.overdueTime < time, 'state状态=', fork.state)
            if (fork.startTime + fork.overdueTime < time && fork.state == 1) {
                //console.log('====关闭进程===', fork.name)
                fork.state = 0;
                pmDel(fork.name);
                //关闭进程之后启动下一组进程
                QueueRun();
                //防止进程减少
                Queue();
            }
        }
    }, 2 * 1000);
}


async function Queue(next = 0) {

    QueueInterval && clearInterval(QueueInterval);
    //定时启动一组进程
    QueueInterval = setInterval(() => {
        QueueRun();
    }, QueueIntervalTime);
    //当执行一组技术后继续启动下一组进程
    next && QueueRun();

}

//启动爬虫，每次往下增加一个
async function QueueRun() {

    let list = await pmList();
    if (list && list.length >= Queuelength) {
        return false;
    }
    // //console.log('pm2list --------------------------------------------',  list.length)
    QueueIndex++;
    // //console.log('QueueIndex', QueueIndex);
    if (QueueIndex > forkList.length - 1) {
        QueueIndex = 0;
    }
        
    let QueueItem = forkList[QueueIndex]
    if (QueueItem) {
        let time = parseInt(new Date().getTime() / 1000);
        //执行时查看是否超过时间，超过则执行，没超过则查看下一组
        // //console.log('====执行时间===', QueueItem.startTime + QueueItem.spaceTime, '当前时间=', time, '是否到时间执行', QueueItem.startTime + QueueItem.spaceTime < time, 'startTime=')
        if ((QueueItem.startTime && time > QueueItem.startTime + QueueItem.spaceTime) || QueueItem.state == 2) {
            //console.log('====执行进程====：', QueueItem.name)
            await pmStart(QueueItem.name, QueueItem.rule);
            QueueItem.startTime = parseInt(new Date().getTime() / 1000);
            QueueItem.state = 1;
        } else if (QueueItem.startTime) {
            setTimeout(() => {
                //console.log(QueueItem.name, '没有到再一次启动时间，执行下一条---->>>>>')
                QueueRun();
            }, 5 * 1000);
        }

    }

}



function pmList() {
    return new Promise(function(resolve, reject) {

        let pmStartMap = {};
        pm2.list((err, processDescriptionList) => {
            let resList = [];
            processDescriptionList = processDescriptionList.map((item) => {
                pmStartMap = {};

                if (item && item.name.indexOf('apddata') >= 0) {
                    pmStartMap['name'] = item.name;
                    if (item.pm2_env) {
                        pmStartMap['status'] = item.pm2_env.status;
                        pmStartMap['pm_uptime'] = item.pm2_env.pm_uptime;
                        pmStartMap['created_at'] = item.pm2_env.created_at;
                    }
                    resList.push(pmStartMap);
                }
            });
            resolve(resList);
        });

    });
}



function pmStart(name, rule) {

    return new Promise(function(resolve, reject) {

        let SERVERDIR = path.resolve('./build');
        let STARTNAME = '/index.js';
        if (process.env.NODE_ENV === "production") {
            SERVERDIR = path.resolve('/server/union-data');
            STARTNAME = '/index.js';
        }

        // //console.log('process.env.NODE_ENV',  process.env.NODE_ENV  );



        // return;

        pm2.start({
            "name": name,
            "script": `${SERVERDIR}${STARTNAME}`,
            "instances": 1,
            "merge_logs": true,
            "max_memory_restart": "300M",
            "monit": { "memory": "300M" },
            "exec_mode": "cluster",
            "out_file": `${SERVERDIR}/apdlog/${name}.log`,
            "error_file": `${SERVERDIR}/apdlog/${name}-err.log`,
            "pid_file": `${SERVERDIR}/apdlog/${name}.pid`,
            "env": {
                "NODE_ENV": "production",
                "rule": rule
            }
        }, async(err, apps) => {
            // //console.log( 'err===>', err, apps );
            resolve(await pmList());
        });

    })
}

function pmStop(name) {
    return new Promise(function(resolve, reject) {
        if (name) {
            pm2.stop(name, () => {
                resolve();
            });
        } else {
            resolve();
        }
    })
}

function pmDel(name) {
    return new Promise(function(resolve, reject) {
        if (name) {
            pm2.delete(name, () => {
                resolve();
            });
        } else {
            resolve();
        }
    })
}