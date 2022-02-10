import extend from '../../../core/extend';

import matchstr from './list3000'
import config from './config'

export default async (myArgv, state = 0) => {
  if (state) {
    return {
      order: 9,
      fork: 0,
      minTime: 20,
      maxTime: 30
    };
  }
  //设置语种
  let LangList = [{
    indexe: 'en',
    langName: 'English'
  }];
  console.log('开始拉取数据 3000-3999===')
  await extend.eachLimit(matchstr, 5, async (CategoriesItem, cb) => {
    await config.startNewsList(CategoriesItem);
    cb(null);
  });
  console.log('=================END=================');
}


//解析栏目列表  
async function startNewsList(CategoriesItem, page = 0) {
  //key 申请 https://developer.clashroyale.com/#/documentation
  //部落  https://api.clashroyale.com/v1/clans?name=%23
  //家里 key eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhZjlmOGQyLWZiYjQtNDZjOC04NDU5LTYzNzRiZjgzZmUxOCIsImlhdCI6MTU3NTExNjc1OCwic3ViIjoiZGV2ZWxvcGVyLzFjZDdmZjEzLTM4NjEtYzQ1OC1iOTBjLWM0NWUyOWFiN2I2NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMjIuMjQ3LjEyMC4yMjEiXSwidHlwZSI6ImNsaWVudCJ9XX0.vX7d45wYENPvjctZXniYOTOLoaKb7FScX_1QIuSbEbQlOa7wBjd9DF_N_gMkPXv6fd6fvoMRP9_bw-j9F9OWag


  let setupDatas = await extend.getJSON("https://api.clashroyale.com/v1/clans/%23" + CategoriesItem.keys, {
    "Authorization": "Bearer " + config.key,
    "cache-control": "max-age=160",
    "content-type": "application/json; charset=utf-8"
  });
  // console.log('setupDatas-523--', JSON.stringify(setupDatas))
  // return
  // console.log('周捐--', setupDatas.items[0]['donationsPerWeek'])
  if (setupDatas) {
    let donationsPerWeek = setupDatas['donationsPerWeek'] //捐献
    let clanWarTrophies = setupDatas['clanWarTrophies'] //奖杯
    let members = setupDatas['members'] //部落数量
    let requiredTrophies = setupDatas['requiredTrophies'] //所需奖杯
    let type = setupDatas['type'] //所需奖杯

    let daynow = '';
    let leaderTime = '';
    let leaderday = '';
    let rolename = '';
    let role = 0;
    let roleNum = 0;
    let lastTime = '';
    let lastTimeNum = 0;
    let day = new Date();
    // let month = (day.getMonth() + 1) > 9 ? (day.getMonth() + 1) : '0' + (day.getMonth() + 1)
    // let newTime = parseInt(day.getFullYear() + month + day.getDate());
    let trophies4=0,trophies5=0,trophies6=0;
    for (let s in setupDatas['memberList']) {
      let item = setupDatas['memberList'][s];
      let lastSeen = item['lastSeen'].split('T')[0]
      lastSeen = new Date(lastSeen.substring(0, 4) + '-' + lastSeen.substring(4, 6) + '-' + lastSeen.substring(6, 9))
      daynow = parseInt(Math.abs(day - lastSeen) / 1000 / 60 / 60 / 24);

      if (item['role'] == 'coLeader') {
        rolename += item['name'] + ' || ';
        roleNum++

        if (daynow >= 3) {
          role++
        }
      }
      if (daynow >= 3) {
        lastTime += item['name'] + ' || ';
        lastTimeNum++
      }

      if (item['role'] == 'leader') {
        leaderTime = item['name'];// +'=='+ daynow+ ' 天前';
        leaderday = daynow;
      }
      //部落400实力
      if(item.trophies>4000 && item.trophies<5000){
        trophies4++
      }
      if(item.trophies>5000 && item.trophies<6000){
        trophies5++
      }
      if(item.trophies>6000){
        trophies6++
      }
    }
    console.log('<tr><td>#' + CategoriesItem.keys + '</td><td>' + CategoriesItem.name.split('#')[0] + '</td><td>' + donationsPerWeek + '</td><td>' + clanWarTrophies + '</td><td>' + members + '</td><td>' + (roleNum - role) + '</td><td>' + roleNum + '</td><td>' + rolename + '</td><td>' + lastTime + '</td><td>' + lastTimeNum + '</td><td>' + requiredTrophies + '</td><td>' + leaderTime + '</td><td>' + leaderday + '</td><td>' + type + '</td><td>' + trophies4 + '</td><td>' + trophies5 + '</td><td>' + trophies6 + '</td></tr>')
  }

}