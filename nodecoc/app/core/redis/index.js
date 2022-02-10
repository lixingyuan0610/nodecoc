import fs from "fs";
import log4js from "log4js";
import path from "path";
import redis from "redis";
import config from "../../config/";

const logSystem = log4js.getLogger("redis");
let redisclient = null;

export default async () => {
  return new Promise((resolve, reject) => {
    //初始连接
    redisclient = redis.createClient(
      config.RDS_PORT,
      config.RDS_HOST,
      config.RDS_OPTS
    );
    redisclient.on("ready", res => {
      resolve(redisclient);
      logSystem.info(`${config.RDS_HOST} ${config.RDS_PORT} ready`);
    });
    //已连接
    redisclient.on("connect", res => {
      // logSystem.info(`host: ${config.RDS_HOST} port:${config.RDS_PORT}`);
    });
    //重连
    redisclient.on("reconnecting", res => {
      logSystem.warn("reconnecting");
    });
    //连接异常
    redisclient.on("error", err => {
      logSystem.error(err);
    });
  });
};
