import log4js from "log4js";
import { argv } from "yargs";
import config from "./config";
import ruleInit from "./rule";
import schedule from 'node-schedule';
import coreInit from "./core";

const logSystem = log4js.getLogger("system");
export default async app => {
  let myArgv = argv;
  if (process.env.NODE_ENV === "production") {
    myArgv = process.env;
  }else{
    if(!myArgv.rule && !myArgv.main){
      myArgv = process.env;
    }
  }

  if(!myArgv.rule && !myArgv.main){
    myArgv = argv;
  }

  await coreInit(app);
  // myArgv = myArgv.rule || process.env;
  ruleInit(myArgv);
  
  schedule.scheduleJob('* * * * * *', async () => {
  });

};
