import extend from '../../../core/extend';

// import matchstr from './list'
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
  console.log('开始拉取数据 黑名单===')
  await extend.eachLimit(config.hei, 5, async (CategoriesItem, cb) => {
    await startNewsList(CategoriesItem);
    cb(null);
  });
  console.log('=================END=================');
}


//解析栏目列表  
async function startNewsList(CategoriesItem, page = 0) {
  //key 申请 https://developer.clashroyale.com/#/documentation
  //部落  https://api.clashroyale.com/v1/clans?name=%23
  //家里 key eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhZjlmOGQyLWZiYjQtNDZjOC04NDU5LTYzNzRiZjgzZmUxOCIsImlhdCI6MTU3NTExNjc1OCwic3ViIjoiZGV2ZWxvcGVyLzFjZDdmZjEzLTM4NjEtYzQ1OC1iOTBjLWM0NWUyOWFiN2I2NSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyMjIuMjQ3LjEyMC4yMjEiXSwidHlwZSI6ImNsaWVudCJ9XX0.vX7d45wYENPvjctZXniYOTOLoaKb7FScX_1QIuSbEbQlOa7wBjd9DF_N_gMkPXv6fd6fvoMRP9_bw-j9F9OWag

  let url = "https://api.clashroyale.com/v1/players/%23" + CategoriesItem.replace('#', '')
  let setupDatas = await extend.getJSON(url, {
    "Authorization": "Bearer " + config.key,
    "cache-control": "max-age=160",
    "content-type": "application/json; charset=utf-8"
  });

  // elder
  // console.log('周捐--', JSON.stringify(setupDatas))
  if (setupDatas) {
    // console.log('====',setupDatas.tag,setupDatas.clan)
    let lder = setupDatas.role == "member" ? '成员' : setupDatas.role == "coLeader" ? '副首领' : setupDatas.role == "leader" ? '首领': setupDatas.role == "elder" ? '长老' : '-'
    console.log('<tr><td>' + setupDatas.tag + '</td><td>' + setupDatas.name + '</td><td>' + lder + '</td><td>' + (setupDatas.clan && setupDatas.clan.tag)  + '</td><td>' + (setupDatas.clan && setupDatas.clan.name)  + '</td></tr>')
  }

}