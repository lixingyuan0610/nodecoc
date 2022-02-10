import koa from "koa";
import cors from "koa2-cors"; 
import bodyParser from "koa-bodyparser";

import appInit from "./app";

const app = new koa();

app.use(cors());
app.use(bodyParser());
appInit(app);
