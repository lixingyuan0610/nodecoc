import extend from '../../../core/extend';

let matchstr = {
    hei: ["#2CR2V2QCL", "#80JQ8Y9JY", "#9J9JLJV02", "#8PYPRGR9G", "#222QR229C", "#Y298CC2VQ", "#8R08JQ8CV", "#PCP8GUCYR", "#2Q89RRPYV", "#PPCGLVUQU", "#9R99V9GP8", "#2CYP9RYQY", "#2YJJ2CRGR"],
    // hei: ["#P0C8LJ8GP"],

    key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjlkZDk3ZWEwLWQzMWEtNGFkYi04NWM4LWQxOTY0MGEzNTgyMyIsImlhdCI6MTYzNjM0MzYyMiwic3ViIjoiZGV2ZWxvcGVyLzFjZDdmZjEzLTM4NjEtYzQ1OC1iOTBjLWM0NWUyOWFiN2I2NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxMTMuMjQ3LjIyLjIzMSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.rztA9sBeaa7fLQNgBGtwrtea-vvbhKVjyXNMpbXAicowVleLQm_qTkp5LM_bcAnQ-RYW-aR1Nzn47QBLTjlrlQ',
    // 部落公共方法
    startNewsList: async function (CategoriesItem) {

        //key 申请 https://developer.clashroyale.com/#/documentation
        //部落  https://api.clashroyale.com/v1/clans?name=%23
        //家里 key eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhZjlmOGQyLWZiYjQtNDZjOC04NDU5LTYzNzRiZjgzZmUxOCIsImlhdCI6MTU3NTExNjc1OCwic3ViIjoiZGV2ZWxvcGVyLzFjZDdmZjEzLTM4NjEtYzQ1OC1iOTBjLWM0NWUyOWFiN2I2NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMjIuMjQ3LjEyMC4yMjEiXSwidHlwZSI6ImNsaWVudCJ9XX0.vX7d45wYENPvjctZXniYOTOLoaKb7FScX_1QIuSbEbQlOa7wBjd9DF_N_gMkPXv6fd6fvoMRP9_bw-j9F9OWag

        let setupDatas = await extend.getJSON("https://api.clashroyale.com/v1/clans/%23" + CategoriesItem.keys, {
            "Authorization": "Bearer " + matchstr.key,
            "cache-control": "max-age=120",
            "content-type": "application/json; charset=utf-8"
        });
        // console.log('setupDatas-523--', JSON.stringify(setupDatas))
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
            let tagname = '';
            let role = 0;
            let roleNum = 0;
            let elderNum = 0;
            let lastTime = '';
            let lastTimeNum = 0;
            let day = new Date();
            // let month = (day.getMonth() + 1) > 9 ? (day.getMonth() + 1) : '0' + (day.getMonth() + 1)
            // let newTime = parseInt(day.getFullYear() + month + day.getDate());
            let trophies4 = 0,
                trophies5 = 0,
                trophies6 = 0;
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
                if (item['role'] == 'elder') {
                    elderNum++
                }
                if (!item['tag']) {
                    tagname += item['name'] + ' || ';
                }

                if (daynow >= 3) {
                    lastTime += item['name'] + ' || ';
                    lastTimeNum++
                }

                if (item['role'] == 'leader') {
                    leaderTime = item['name']; // +'=='+ daynow+ ' 天前';
                    leaderday = daynow;
                }
                //部落400实力
                if (item.trophies > 5000 && item.trophies < 6000) {
                    trophies4++
                }
                if (item.trophies > 6000 && item.trophies < 7000) {
                    trophies5++
                }
                if (item.trophies > 7000) {
                    trophies6++
                }
            }
            console.log('<tr><td>#' + CategoriesItem.keys + '</td><td>' + CategoriesItem.name.split('#')[0] + '</td><td>' + donationsPerWeek + '</td><td>' + clanWarTrophies + '</td><td>' + members + '</td><td>' + (roleNum - role) + '</td><td>' + roleNum + '</td><td>' + rolename + '</td><td>' + lastTime + '</td><td>' + lastTimeNum + '</td><td>' + requiredTrophies + '</td><td>' + leaderTime + '</td><td>' + leaderday + '</td><td>' + type + '</td><td>' + trophies4 + '</td><td>' + trophies5 + '</td><td>' + trophies6 + '</td><td>' + elderNum + '</td><td>' + tagname + '</td></tr>')
        }
    },
    // 部落战
    startNewsLists: async function (CategoriesItem) {

        //key 申请 https://developer.clashroyale.com/#/documentation
        //部落  https://api.clashroyale.com/v1/clans?name=%23
        //家里 key eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhZjlmOGQyLWZiYjQtNDZjOC04NDU5LTYzNzRiZjgzZmUxOCIsImlhdCI6MTU3NTExNjc1OCwic3ViIjoiZGV2ZWxvcGVyLzFjZDdmZjEzLTM4NjEtYzQ1OC1iOTBjLWM0NWUyOWFiN2I2NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMjIuMjQ3LjEyMC4yMjEiXSwidHlwZSI6ImNsaWVudCJ9XX0.vX7d45wYENPvjctZXniYOTOLoaKb7FScX_1QIuSbEbQlOa7wBjd9DF_N_gMkPXv6fd6fvoMRP9_bw-j9F9OWag

        //https://api.clashroyale.com/v1/clans/%23GRPYYJG/currentriverrace
        let setupDatas = await extend.getJSON("https://api.clashroyale.com/v1/clans/%23" + CategoriesItem.keys + "/currentriverrace", {
            "Authorization": "Bearer " + matchstr.key,
            "cache-control": "max-age=160",
            "content-type": "application/json; charset=utf-8"
        });
        // console.log('setupDatas-523--', JSON.stringify(setupDatas))
        // return
        // console.log('周捐--', setupDatas.items[0]['donationsPerWeek'])
        if (setupDatas.clan) {
            let setdata = setupDatas.clan.participants
            let num00 = 0,
                num0 = 0,
                num1 = 0,
                num2 = 0,
                num3 = 0,
                num4 = 0,
                num5 = 0,
                num6 = 0,
                num7 = 0,
                num8 = 0,
                num9 = 0;
            for (let s in setdata) {
                let item = setdata[s];
                if (item.fame == 0) {
                    num00++;
                }
                if (item.fame > 0 && item.fame < 500) {
                    num0++;
                }
                if (item.fame > 500 && item.fame < 1000) {
                    num1++;
                }
                if (item.fame > 1000 && item.fame < 1500) {
                    num2++;
                }
                if (item.fame > 1500 && item.fame < 2000) {
                    num3++;
                }
                if (item.fame > 2000 && item.fame < 3000) {
                    num4++;
                }
                if (item.fame > 3000) {
                    num5++;
                }
                /*    if (item.fame > 4000 && item.fame < 5000) {
                     num6++;
                   }
                   if (item.fame > 5000 && item.fame < 6000) {
                     num7++;
                   }
                   if (item.fame > 6000) {
                     num8++;
                   } */

            }
            let setclansdata = setupDatas.clans;
            setclansdata.sort(function f(a, b) { //排序函数
                return (b.fame - a.fame); //返回比较参数
            });
            let clansstr = "",
                sortnumm, clanfame, clanScore
            for (let s in setclansdata) {
                let item = setclansdata[s];
                let sint=parseInt(s)+1
                clansstr += `${sint}-${item.name}(${item.fame})||`
                if ("#" + CategoriesItem.keys == item.tag) {
                    sortnumm = sint;
                    clanfame = item.fame
                    clanScore = item.clanScore
                }
            }
            console.log('<tr><td>#' + CategoriesItem.keys + '</td><td>' + CategoriesItem.name.split('#')[0] + '</td><td>' + clanScore + '</td><td>' + num00 + '</td><td>' + num0 + '</td><td>' + num1 + '</td><td>' + num2 + '</td><td>' + num3 + '</td><td>' + num4 + '</td><td>' + num5 + '</td><td>' + clanfame + '</td><td>' + sortnumm + '</td><td>' + clansstr + '</td></tr>')
        }
    },
}



export default matchstr


/*
1-1000院 node ./build/index.js --rule room/coc  黏贴完命令 回车
1000-1999院 node ./build/index.js --rule room/coc1000  黏贴完命令 回车
*/

/*
var aa=`
京朝1500院	#YR9JRCPQ
`
aa=aa.split('京朝')
var itemlist=[]
for(let a in aa){
itemlist.push({"name":aa[a].split('#')[0],"keys":aa[a].split('#')[1]})
}
JSON.stringify(itemlist)

*/
/* {
    "state": "full",
    "clan": {
      "tag": "#2LG9Y0YP",
      "name": "京朝四院",
      "badgeId": 16000143,
      "fame": 3175,
      "repairPoints": 0,
      "periodPoints": 21875,
      "clanScore": 3500
    },
    "clans": [
      {
        "tag": "#2LG9Y0YP",
        "name": "京朝四院",
        "badgeId": 16000143,
        "fame": 3175,
        "repairPoints": 0,
        "periodPoints": 21875,
        "clanScore": 3500
      },
      {
        "tag": "#2G0GRP2",
        "name": "Alsace Team",
        "badgeId": 16000044,
        "fame": 7155,
        "repairPoints": 0,
        "periodPoints": 28100,
        "clanScore": 3505
      },
      {
        "tag": "#UVPCPRG",
        "name": "Spartani Italia",
        "badgeId": 16000081,
        "fame": 7094,
        "repairPoints": 0,
        "periodPoints": 30350,
        "clanScore": 3510
      },
      {
        "tag": "#R2Y0Q",
        "name": "FINLANDIA V",
        "badgeId": 16000063,
        "fame": 5046,
        "repairPoints": 0,
        "periodPoints": 27700,
        "clanScore": 3500
      },
      {
        "tag": "#YUVYJ20G",
        "name": "#AlkoparK#",
        "badgeId": 16000024,
        "fame": 2505,
        "repairPoints": 0,
        "periodPoints": 20975,
        "clanScore": 3495
      }
    ],
    "sectionIndex": 0,
    "periodIndex": 6,
    "periodType": "warDay",
    
  } */