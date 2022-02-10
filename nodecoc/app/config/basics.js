import path from 'path';
let SERVERDIR = path.resolve('./') + '/';
let basicsConfig = {
  // APISERVER:'http://127.0.0.1:8170',//测试环境
  //长沙老
  // APISERVER:'http://124.232.137.72:8070',
  //长沙新
  APISERVER:'http://124.232.137.72:8170',
//  APISERVER:'http://127.0.0.1:7000/amazon/save',
  // APISERVER:'http://127.0.0.1:8070',
  // 上传文件大小
  UPLOAD_SIZE: 5 * 1024 * 1024,
  // 上传文件路径
  UPLOAD_DIR: SERVERDIR + "assets/union-data/",
  // 调试模式
  DEV: true,
  PORT: 6060,
};

if (process.env.NODE_ENV === "production") {
}

export default basicsConfig;
