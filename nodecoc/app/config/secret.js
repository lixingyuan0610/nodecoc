// 秘钥配置

let secretConfig = {
  OPENID: 2,
  SECRET: '696ca8067777068fb074204699995b512',
};

if (process.env.NODE_ENV === "production") {
  secretConfig.OPENID = 2;
  secretConfig.SECRET = '696ca8067777068fb074204699995b512';
}
export default secretConfig;