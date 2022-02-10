import crypto from "crypto";
/*
        obj_	_Object  	[{index:1}, {index:2}]
        key		排序关键词
*/
export const toolsObjSort = (objarr, key) => {
  for (var i = 0; i < objarr.length; i++) {
    for (var j = i; j < objarr.length; j++) {
      if (objarr[i][key] < objarr[j][key]) {
        var temp = objarr[i];
        objarr[i] = objarr[j];
        objarr[j] = temp;
      }
    }
  }
  return objarr;
};

//乱序
export const toolsShuffle = o => {
  for (
    var j, x, i = o.length;
    i;
    j = Math.random() * i, x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
};

/*

        common.forFn( [1,2,3,20] , function(res,cb){ console.log(res); cb(res);
   }, function(res){ console.log(res); } );
*/
export const toolsForFn = (ags, fn, tcb) => {
  let ti = 0,
    trs = [];
  let cb = rs => {
    trs.push(rs);
    ti++;
    if (ags[ti] != undefined) {
      for_fn(ags[ti]);
    } else {
      tcb(trs);
    }
  };
  let for_fn = v => {
    fn(v, cb);
  };
  for_fn(ags[ti]);
};

export const toolsForStartEnd = (s, e, scb, ecb) => {
  let trs = {};
  let cb = (s, e, scb, ecb) => {
    if (s >= e) {
      ecb(trs);
    } else {
      scb(s, function (rs) {
        trs[s] = rs;
        s++;
        cb(s, e, scb, ecb);
      });
    }
  };
  cb(s, e, scb, ecb);
};

/**
 * 对称加密
 */
export const toolsCodeverify = (
  val,
  keys = "fc8308851e6249558536a8394923ff5f"
) => {
  try {
    let cipher = crypto.createCipheriv("aes-256-ecb", keys, "");
    return cipher.update(val, "utf8", "hex") + cipher.final("hex");
  } catch (err) {
    return "";
  }
};

/**
 * 对称解密
 * key 32位
 */
export const toolsCreateCipher = (
  val,
  keys = "fc8308851e6249558536a8394923ff5f"
) => {
  try {
    let cipher = crypto.createDecipheriv("aes-256-ecb", keys, "");
    return cipher.update(val, "hex", "utf8") + cipher.final("utf8");
  } catch (err) {
    return "";
  }
};

/**
 * 得到日期（增加天数后）
 */
export const toolsGetAddDayDate = AddDayCount => {
  let dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
  return new Date(
    dd.getFullYear() +
    "/" +
    (dd.getMonth() + 1) +
    "/" +
    dd.getDate() +
    " 00:00:00"
  );
};

/**
 * 得到日期（增加小时后）
 */
export const toolsGetAddHourDate = AddHourCount => {
  let dd = new Date();
  dd.setHours(dd.getHours() + AddHourCount); //获取AddHourCount小时后的日期
  return new Date(
    dd.getFullYear() +
    "/" +
    (dd.getMonth() + 1) +
    "/" +
    dd.getDate() +
    " " +
    dd.getHours() +
    ":" +
    dd.getMinutes() +
    ":" +
    dd.getSeconds()
  );
};

//随机数最小值-最大值不包括max
export const toolsRandom = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};

//产生一个4位数随机验证码
export const toolsGetcode = len => {
  var str = "";
  for (var i = 0; i < len; i++) {
    str += toolsRandom(1, 10);
  }
  return parseInt(str);
};

// MD5加密
export const toolsMd5 = str => {
  return crypto
    .createHash("md5")
    .update(str)
    .digest("hex")
    .toLowerCase();
};

//混合加密
export const toolsPassword = (str, encrypt) => {
  return module.exports.md5(module.exports.md5(str) + encrypt);
};

//数组
export const toolsIsArray = o => {
  return Object.prototype.toString.call(o) === "[object Array]";
};

const chnNumChar = {
  零: 0,
  一: 1,
  二: 2,
  三: 3,
  四: 4,
  五: 5,
  六: 6,
  七: 7,
  八: 8,
  九: 9
};

const chnNameValue = {
  十: { value: 10, secUnit: false },
  百: { value: 100, secUnit: false },
  千: { value: 1000, secUnit: false },
  万: { value: 10000, secUnit: true },
  亿: { value: 100000000, secUnit: true }
};

export const ChineseToNumber = chnStr => {
  let rtn = 0;
  let section = 0;
  var number = 0;
  let secUnit = false;
  let str = chnStr.split("");

  for (let i = 0; i < str.length; i++) {
    let num = chnNumChar[str[i]];
    if (typeof num !== "undefined") {
      number = num;
      if (i === str.length - 1) {
        section += number;
      }
    } else {
      let unit = chnNameValue[str[i]].value;
      secUnit = chnNameValue[str[i]].secUnit;
      if (secUnit) {
        section = (section + number) * unit;
        rtn += section;
        section = 0;
      } else {
        section += number * unit;
      }
      number = 0;
    }
  }
  return rtn + section;
};

// 相对地址转绝对地址
export function absolutizeURI(base, href) {// RFC 3986

    function parseURI(url) {
        var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
        // authority = '//' + user + ':' + pass '@' + hostname + ':' port
        return (m ? {
            href     : m[0] || '',
            protocol : m[1] || '',
            authority: m[2] || '',
            host     : m[3] || '',
            hostname : m[4] || '',
            port     : m[5] || '',
            pathname : m[6] || '',
            search   : m[7] || '',
            hash     : m[8] || ''
        } : null);
    }

    function removeDotSegments(input) {
        var output = [];
        input.replace(/^(\.\.?(\/|$))+/, '')
            .replace(/\/(\.(\/|$))+/g, '/')
            .replace(/\/\.\.$/, '/../')
            .replace(/\/?[^\/]*/g, function (p) {
                if (p === '/..') {
                    output.pop();
                } else {
                    output.push(p);
                }
            });
        return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
    }

    href = parseURI(href || '');
    base = parseURI(base || '');

    return !href || !base ? null : (href.protocol || base.protocol) +
        (href.protocol || href.authority ? href.authority : base.authority) +
        removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
        (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
        href.hash;
}


