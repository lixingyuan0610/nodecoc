import schedule from 'node-schedule';
import modules from "./modules";
import run from "./run";

export default async (myArgv) => {

    let runFun = modules;
    if( myArgv.rule && myArgv.rule.indexOf('/') >= 0 ){
        myArgv.rule.split('/').map((key)=>{
            if(runFun && runFun[key]){
                runFun = runFun[key];
            }else{
                runFun = 0;
            }
        });
    }else{
        runFun = 0;
    }

    if(runFun){
        runFun(myArgv)
    }

    if (myArgv.main == 1) {
        run(modules);
    }

};

