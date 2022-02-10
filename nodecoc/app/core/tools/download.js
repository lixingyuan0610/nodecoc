
import config from '../../config';
// import uuidv5 from "uuid/v4";
import extend from "../extend";
import { toolsExists, getPathPicSize } from "./file";
import keystore from "apd-keystore";
import fs from 'fs';
// import { coreModel } from "../../../core";

/**
 * 下载文件
 * @param {*} url 
 * @param {*} path 
 * @param {*} name 
 */
export default async function (url, path, name) {

    let suf = /(jpeg)+|(jpg)+|(png)+|(webp)+|(gif)+|(mp3)+|(ogg)+|(wav)+|(mp4)+|(avi)+|(webm)+/gim.exec(url.toLocaleLowerCase());
    if (suf && suf.length > 0) {
        suf = suf[0];
    } else {
        suf = "jpg";
    }

    // let Guid = uuidv5(url, uuidv5.URL);
    // Guid = Guid.replace(/-/gim, "");
    name = name + url.substring(url.lastIndexOf("/") + 1, url.length).split('.')[0].replace('?', '_');
    let findUploadData = '';//await coreModel.Upload.findOne({ 'where': { 'Guid': Guid } });
    let UploadData = {};
    UploadData['Size'] = 0;
    UploadData['LocPath'] = url;
    // UploadData['Guid'] = Guid;

    if (findUploadData) {

        UploadData['UploadId'] = findUploadData.id;
        UploadData['Url'] = findUploadData.Url;

    } else {

        let dowPath = "";
        if (!toolsExists(`${config.UPLOAD_DIR}${path}${name}.${suf}`)) {
            dowPath = await extend.Download(url, path, name, suf);
            dowPath = dowPath.filename;
        } else {
            dowPath = `${path}${name}.${suf}`;
        }
        if (dowPath) {

            UploadData['Url'] = config.UPLOAD_DIR + dowPath;
            if (/(jpeg)+|(jpg)+|(png)+|(gif)+/.test(suf)) {
                let UploadFile = await getPathPicSize(`${config.UPLOAD_DIR}${dowPath}`);
                // console.log('UploadFile=0=====', UploadFile)
                suf = suf == 'jpg' ? 'jpeg' : suf;
                UploadData['MimeType'] = `image/${suf}`;
                UploadData['Width'] = UploadFile.Width;
                UploadData['Height'] = UploadFile.Height;
            }
            if (/(mp3)+|(ogg)+|(wav)+/.test(suf)) {
                UploadData['MimeType'] = `audio/${suf}`;
            }
            if (/(mp4)+|(avi)+|(webm)+/.test(suf)) {
                UploadData['MimeType'] = `video/${suf}`;
            }
            // findUploadData = await coreModel.Upload.create(UploadData);
            UploadData['secret'] = keystore.secret;
            // 上传文件
            let names = UploadData['Url'].split('/');
            UploadData['File'] = {
                value: fs.createReadStream(UploadData['Url']),
                options: {
                    filename: names[names.length - 1],
                }
            };

            let updateData = await extend.post(`${config.APISERVER}/public/upload/save`, {}, UploadData);
            updateData = JSON.parse(updateData)
            if (updateData.Code == '200') {
                UploadData['UploadId'] = updateData.Data.UploadId;
                UploadData['Url'] = config.APISERVER + '/' + updateData.Data.Url;
            }
        } else {
            UploadData = 0;
        }

    }

    return UploadData;

};