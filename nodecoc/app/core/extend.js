import Cheerio from 'cheerio';
import asyncRun from 'async';
import Request from 'request';
import config from '../config';
import httpRequest from './tools/httpRequest';
import {toolsForFn, toolsForStartEnd} from './tools/index';
import {toolsParseDate} from './tools/time';


// 工具方法
export default {
  /**
   * 获取配置信息
   */
  getConfig(){
    return config;
  },
   /**
   * GET请求
   * @param {*} url 网络地址
   * @param {*} formData form数据
   * @param {*} encoding  encoding 解码
   */
  get(url, formData, encoding){
    return new Promise( function(resolve, reject) {
      Request.get({ url: url, form: formData, encoding : encoding },(err, httpResponse, body) => {
          resolve(body);
      });
    });
  },
    /**
   * 下载文件
   * @param {*} url 
   * @param {*} path 
   * @param {*} name 
   */
  async Download(url, path = "", name, suf) {
    // let suf = /(jpeg)+|(jpg)+|(png)+|(webp)+|(gif)+|(mp3)+|(ogg)+|(wav)+|(mp4)+|(avi)+|(webm)+/gim.exec(url);
    // if(suf && suf.length > 0){
    //   suf = suf[0];
    // }else{
    //   suf = "jpg";
    // }
    // name = name || UUID();
    return await httpRequest.Download(url, config.UPLOAD_DIR, path, name, '.'+suf);
  },
  /**
   * POST 请求
   * @param {*} url 网络地址
   * @param {*} form form数据
   * @param {*} formData  form数据-上传
   */
  post(url, form, formData){
    return new Promise( function(resolve, reject) {
      Request.post({ url, form, formData },(err, httpResponse, body) => {
          resolve(body);
      });
    });
  },
    /**
   * POST JSON 请求
   * @param {*} url 网络地址
   * @param {*} json json数据
   */
  postJSON(url, body){
    return new Promise( function(resolve, reject) {
      Request.post({ url, json: true, body },(err, httpResponse, body) => {
          resolve(body);
      });
    });
  },
  /**
   * GET请求获取JSON数据
   * @param {*} url 网络地址
   * @param {*} headers 自定义head信息
   */
  async getJSON(url, headers) {
    return await httpRequest.getJSON(url, headers);
  },
  /**
   * 获取HTML
   * @param {*} url 网络地址
   * @param {*} headers 自定义head信息
   */
  async getHTML(url, headers) {
    return await httpRequest.getHTML(url, headers);
  },
  /**
   * 解析html
   * @param {*} html 
   */
  CheerioLoad(html) {
    return Cheerio.load(html, {decodeEntities: false});
  },
  /**
   * 循环执行
   * @param {*} list 数组
   * @param {*} f 执行方法
   * @param {*} c 完成后回调
   */
  toolsForFn(list, f, c) {
    return toolsForFn(list, f, c);
  },
  /**
   * 执行F循环S++ 到N后执行C
   * @param {*} s 开始
   * @param {*} e 结束
   * @param {*} f 执行方法
   * @param {*} c 完成后回调
   */
  toolsForStartEnd(s, e, f, c) {
    return toolsForStartEnd(s, e, f, c);
  },

  /**
   * 执行F循环N后执行C
   * @param {*} n 执行次数
   * @param {*} f 执行方法
   * @param {*} c 完成后回调
   */
  toolsForCount(n, f, c) {
    return toolsForStartEnd(0, n, f, c);
  },
  /**
   * 多线程执行
   * @param {*} list 数组
   * @param {*} thread 同步执行数
   * @param {*} runFn 执行方法
   */
  eachLimit(list, thread, runFn) {
    
    return new Promise( function(next, reject) {
      asyncRun.eachLimit( list, thread, async (item, cb) => {
          await runFn(item, cb);
        },() => {
          next('all end');
        });
      });
      
    }
};
