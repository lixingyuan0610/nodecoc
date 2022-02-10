import fs from 'fs';
import path from 'path';
import gm from 'gm';

/**
 * 查看路径下 文件是否存在
 */
export const toolsExists = (path) => {
  return fs.existsSync(path);
}


/**
 * 获取图片大小
 * @param {*} filepath 
 */
export const getPathPicSize = (path) => {
  return new Promise((resolve, reject) => {
    let mSize = { width: 0, height: 0 };
    if (path) {


      // gm(path).format((err, format) => {
      //     console.log( 'format', format );
      // })

      // 获取图片大小
      gm(path).size((err, size) => {
       
        if (err) {
          return resolve({
            Width: mSize.width,
            Height: mSize.height
          });
        } else {
          mSize = size;
        }
        let mediaData = {
          Width: mSize.width,
          Height: mSize.height
        };
        resolve(mediaData);

      });
    }else{
      resolve({
        Width: mSize.width,
        Height: mSize.height
      });
    }
  });
};



/**
 * 递归创建目录 异步方法
 */
export const toolsMKDirs = (dirname, mode) => {
  return new Promise((resolve, reject) => {
    fs.exists(dirname, function (exists) {
      if (exists) {
        reject();
      } else {
        toolsMKDirs(path.dirname(dirname), mode, function () {
          fs.mkdir(dirname, mode, resolve);
        });
      }
    });
  });
};

/**
 * 递归创建目录 同步方法
 */
export const toolsMKDirsSync = (dirname, mode) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (toolsMKDirsSync(path.dirname(dirname), mode)) {
      fs.mkdirSync(dirname, mode);
      return true;
    }
  }
};

/**
  * 移动拷贝重命名
  */
export const toolsRenameSync = (path, newPath) => {
  return fs.renameSync(path, newPath);  //重命名
};

/**
 * 删除文件夹
 */
export const toolsDeleteFolder = (path, isMe) => {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {  // recurse
        this.deleteFolder(curPath, true);
      } else {  // delete file
        fs.unlinkSync(curPath);
      }
    });
    isMe && fs.rmdirSync(path);
  }
};

/**
 * 删除文件
 * @param {*} filepath 
 */
export const toolsUnlink = (filepath) => {
  return new Promise((resolve, reject) => {
    if (filepath && fs.existsSync(filepath)) {
      return fs.unlink(filepath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

/**
 * 文件尾椎
 */
export const toolsSuf = (src) => {
  return src.substring(src.lastIndexOf('.'), src.length);
};
