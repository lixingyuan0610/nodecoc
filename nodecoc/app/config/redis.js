let redisConfig = {
  // redis服务器地址
  RDS_HOST: "127.0.0.1",
  // redis服务器端口
  RDS_PORT: 6379,
  // redis配置
  RDS_OPTS: {}
};

// 杭州备DEV
if (process.env.NODE_ENV === "production") {
  // redisConfig.RDS_HOST = "r-bp18b84a6a4f3814.redis.rds.aliyuncs.com";
  // redisConfig.RDS_PORT = "6379";
  // redisConfig.RDS_OPTS = {
  //   password:"reDisaPd2018"
  // };
}

export default redisConfig;
