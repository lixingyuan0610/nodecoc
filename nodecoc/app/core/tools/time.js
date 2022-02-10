// 取剩余秒
const pluralize = (time, label) => {
    return time + label + '前'
  };
  
  // 相对时间过滤器，传入时间，返回距离今天有多久
  export const timeAgo = time => {
    time = time instanceof Date ? time : new Date(time);
    const between = Date.now() / 1000 - (Number(time) / 1000);
    if (between < 3600) {
      if (Object.is(~~(between / 60), 0)) return '刚刚'
      return pluralize(~~(between / 60), ' 分钟')
    } else if (between < 86400) {
      return pluralize(~~(between / 3600), ' 小时')
    } else {
      return pluralize(~~(between / 86400), ' 天')
    }
  };
  
  // 转换为本地时间格式
  export const toLocalString = date => {
    return date ? new Date(date).toLocaleString() : date;
  };
  
  // YMDHMS时间转换过滤器
  export const toYMD = date => {
    if (!date) return date;
    date = new Date(date);
    return `${date.getFullYear()}/${
      date.getMonth() + 1
      }/${
      date.getDate()
      } ${date.getHours() > 11 ? '下午' : '上午'}`;
  };
  
  
  
  /**
   * yyyy-MM-dd hh:mm:ss.S
   */
  export const toolsParseDate = (time, format) => {
    var t = new Date(time);
    var o = {
      "M+": t.getMonth() + 1, // month
      "d+": t.getDate(), // day
      "h+": t.getHours(), // hour
      "m+": t.getMinutes(), // minute
      "s+": t.getSeconds(), // second
      "q+": Math.floor((t.getMonth() + 3) / 3), // quarter
      S: t.getMilliseconds() // millisecond
    };
  
    if (/(y+)/.test(format)) {
      format = format.replace(
        RegExp.$1,
        (t.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
  
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
        );
      }
    }
    return format;
  };