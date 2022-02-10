import Crawler from 'crawler';
import fs from 'fs';
import _ from 'lodash';
import log4js from 'log4js';
import UUID from 'node-uuid';
import path from 'path';

import {toolsMKDirsSync} from './file';

let SuffixList = ['.jpeg', '.jpg', '.png', '.gif', '.mp3', '.mp4'];

const logCrawlerLib = log4js.getLogger('CrawlerLib');

export default {
  /**
   * 下载文件
   * 下载地址，文件尾缀，存储位置
   */
  Download(url, pathDev = process.cwd(), path = path.join('assets/public/'),  name = '', Suffix = '.jpg') {

    return new Promise(function(resolve, reject) {

      if (!url || url.trim() == "") {
        resolve({filename: '', pathUrl: ''});
      }

      if (!name) {
        name = UUID.v4();  //生成Token
        name = name.replace(/-/gim, '');
      }

      if (SuffixList.indexOf(Suffix) < 0) {
        Suffix = '.jpg'
      }
      
      let pathURL = pathDev + path;
      toolsMKDirsSync(pathURL);

      let c = new Crawler({
        encoding: null,
        jQuery: false,
        retries: 3,
        retryTimeout: 15000,
        callback: function(error, res, done) {
          if (error) {
            logCrawlerLib.info(`Download ERROR： ${url} ERR：${error}`);
            resolve({filename: '', pathUrl: ''});
          } else {
            let output = fs.createWriteStream(res.options.filename)
            output.write(res.body);
            output.on('close', function() {
              resolve({
                filename: path + name + Suffix,
                pathUrl: res.options.filename
              });
            });
            output.end();
          }
          done();
        }
      });
      c.queue({uri: url, filename: pathURL + name + Suffix});

    });

  },
  /**
   * 获取json
   */
  getJSON(url, headers = {}) {

    return new Promise(function(resolve, reject) {

      if (!url) {
        resolve({});
      }
      let cf = {
        maxConnections: 10,
        retries: 2,
        retryTimeout: 25000,
        encoding: null,
        // forceUTF8:true,
        jQuery: false,
        callback: function(error, res, done) {
          if (error) {
            // logCrawlerLib.info(`getJSON ERROR： ${url} ERR：${error}`);
            resolve(null);
          } else {
            let data = {};
            try {
              data = JSON.parse(res.body.toString())
            } catch (e) {
              // logCrawlerLib.info(`getJSON parse ERROR： ${url}  ERR：${e}`);
            }
            resolve(data);
          }
          done();
        }
      };

      let c = new Crawler(cf);
      c.queue([{
        headers: headers,
        // proxy: 'http://192.168.1.199:8888',
        uri: url,
        timeout: 9000,
      }]);

    });

  },

  /**
   * 获取页面dom
   */
  getHTML(url, headers = {}) {

    return new Promise(function(resolve, reject) {

      if (!url || url.trim() == "") {
        resolve('');
      }

      let cf = {
        maxConnections: 20,
        retries: 1,
        retryTimeout: 15000,
        jQuery: false,
        callback: function(error, res, done) {
          if (error) {
            logCrawlerLib.info(`getHTML ERROR： ${url} ERR：${error}`);
            resolve(null);
          } else {
            resolve(res.body.toString());
          }
          done();
        }
      };

      let c = new Crawler(cf);
      c.queue({headers: headers, uri: url, timeout: 9000});

    });

  }

}