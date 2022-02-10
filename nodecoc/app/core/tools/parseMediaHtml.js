

export const toolsObjSort = (objarr) => {
    for (var i = 0; i < objarr.length; i++) {
      for (var j = i; j < objarr.length; j++) {
        if (objarr[i].length < objarr[j].length) {
          var temp = objarr[i];
          objarr[i] = objarr[j];
          objarr[j] = temp;
        }
      }
    }
    return objarr;
};

  
/**
 * 提取纯文本
 * @param {*} str 参数
 */
export default async function (strHtml) {

  let imgUrlList = [];
  let videoUrlList = [];
  let audioUrlList = [];

  if(strHtml){
    
    let imgReg = /<img.*?(?:>|\/>)/gi;
    let imgSrcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let imgMatch = strHtml.match(imgReg);
    if(imgMatch){
      for (let item of imgMatch) {
        if(item){
          let src = item.match(imgSrcReg);
           if(src && src[1]){
            imgUrlList.push(src[1]);
           }
        }
      }
    }

    let videoReg = /<video.*?(?:>|\/>)/gi;
    let videoSrcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let videoMatch = strHtml.match(videoReg);
    if(videoMatch){
      for (let item of videoMatch) {
        if(item){
           let src = item.match(videoSrcReg);
           if(src && src[1]){
            videoUrlList.push(src[1]);
           }
        }
      }
    }

    let audioReg = /<audio.*?(?:>|\/>)/gi;
    let audioSrcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let audioMatch = strHtml.match(audioReg);
    if(audioMatch){
      for (let item of audioMatch) {
        if(item){
          let src = item.match(audioSrcReg);
           if(src && src[1]){
            audioUrlList.push(src[1]);
           }
        }
      }
    }
  }

  return [...imgUrlList, ...videoUrlList, ...audioUrlList ];
    
}
