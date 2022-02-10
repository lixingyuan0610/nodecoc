import extend from '../../../core/extend';

import matchstr from '../coc/list5000'
import config from '../coc/config'

export default async (myArgv, state = 0) => {
  if (state) {
    return {
      order: 9,
      fork: 0,
      minTime: 20,
      maxTime: 30
    };
  }

  console.log('开始拉取战船数据 5000===')
  await extend.eachLimit(matchstr, 5, async (CategoriesItem, cb) => {
    await config.startNewsLists(CategoriesItem);
    cb(null);
  });
  console.log('=================END=================');
}


//解析栏目列表  
async function startNewsList(CategoriesItem, page = 0) {
  //key 申请 https://developer.clashroyale.com/#/documentation
  //部落  https://api.clashroyale.com/v1/clans?name=%23
  //家里 key eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhZjlmOGQyLWZiYjQtNDZjOC04NDU5LTYzNzRiZjgzZmUxOCIsImlhdCI6MTU3NTExNjc1OCwic3ViIjoiZGV2ZWxvcGVyLzFjZDdmZjEzLTM4NjEtYzQ1OC1iOTBjLWM0NWUyOWFiN2I2NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMjIuMjQ3LjEyMC4yMjEiXSwidHlwZSI6ImNsaWVudCJ9XX0.vX7d45wYENPvjctZXniYOTOLoaKb7FScX_1QIuSbEbQlOa7wBjd9DF_N_gMkPXv6fd6fvoMRP9_bw-j9F9OWag

  //https://api.clashroyale.com/v1/clans/%23GRPYYJG/currentriverrace
  let setupDatas = await extend.getJSON("https://api.clashroyale.com/v1/clans/%23" + CategoriesItem.keys + "/currentriverrace", {
    "Authorization": "Bearer " + config.key,
    "cache-control": "max-age=160",
    "content-type": "application/json; charset=utf-8"
  });
  // console.log('setupDatas-523--', JSON.stringify(setupDatas))
  // return
  // console.log('周捐--', setupDatas.items[0]['donationsPerWeek'])
  if (setupDatas.clan) {
    let setdata = setupDatas.clan.participants
    let num00 = 0,num0 = 0, num1 = 0, num2 = 0, num3 = 0, num4 = 0, num5 = 0, num6 = 0, num7 = 0, num8 = 0, num9 = 0;
    for(let s in setdata) {
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
      if (item.fame > 3000 && item.fame < 4000) {
        num5++;
      }
      if (item.fame > 4000 && item.fame < 5000) {
        num6++;
      }
      if (item.fame > 5000 && item.fame < 6000) {
        num7++;
      }
      if (item.fame > 6000) {
        num8++;
      }

    }
    console.log('<tr><td>#' + CategoriesItem.keys + '</td><td>' + CategoriesItem.name.split('#')[0] + '</td><td>' + num00 + '</td><td>' + num0 + '</td><td>' + num1 + '</td><td>' + num2 + '</td><td>' + num3 + '</td><td>' + num4 + '</td><td>' + num5 + '</td><td>' + num6 + '</td><td>' + num7 + '</td><td>' + num8 + '</td></tr>')
  }

}