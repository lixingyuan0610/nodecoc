import extend from '../extend';
import config from '../../config';
// import serviceCommon from '../service/common';
import schedule from 'node-schedule';
import pm2 from 'pm2';
import { coreRedis } from '../../core';
import download from '../../core/tools/download';
import { toolsParseDate } from "../../core/tools/time";
import parseMediaHtml from "../../core/tools/parseMediaHtml";

let QUEUEMAP = {};
schedule.scheduleJob('0 0 0 * * *', async () => {
    QUEUEMAP = {};
});

export const runEnd = (wordName) => {
    coreRedis.publish("chat", wordName);
}

/**
 * 服务器接口公共方法
 */
export default class parseCommon {

    constructor(formData = {}) {
        this.formData = formData;
    }

    /**
     * 国外服务器
     * @param {*} LangName 国外服务器
     */
    setType(Type) {
        if (Type) {
            this.formData['Type'] = Type;
        }
    }
    /**
     * 语种
     * @param {*} LangName 语种
     */
    setLangName(LangName) {
        if (LangName) {
            this.formData['LangName'] = LangName;
        }
    }
    /**
     * 网站域名
     * @param {*} WebSite 网站域名
     */
    setWebSite(WebSite) {
        if (WebSite) {
            this.formData['WebSite'] = WebSite;
        }
    }
    /**
     * 网站名
     * @param {*} WebName 网站名
     */
    setWebName(WebName) {
        if (WebName) {
            this.formData['WebName'] = WebName;
        }
    }
    /**
     * 网站介绍
     * @param {*} UserAvatar 网站介绍
     */
    setWebDesc(WebDesc) {
        if (WebDesc) {
            this.formData['WebDesc'] = WebDesc;
        }
    }
    /**
     * 用户名
     * @param {*} UserNickName 用户名
     */
    setUserNickName(UserNickName) {
        if (UserNickName) {
            this.formData['UserNickName'] = UserNickName;
        }
    }
    /**
     * 用户介绍
     * @param {*} UserDesc 用户介绍
     */
    setUserDesc(UserDesc) {
        if (UserDesc) {
            this.formData['UserDesc'] = UserDesc;
        }
    }
    /**
     * 用户头像
     * @param {*} UserAvatar 用户头像
     */
    setUserAvatar(UserAvatar) {
        if (UserAvatar) {
            this.formData['UserAvatar'] = UserAvatar;
        }
    }
    /**
     * 用户性别
     * @param {*} UserSex 用户头像地址
     */
    setUserSex(UserSex) {
        if (UserSex) {
            this.formData['UserSex'] = UserSex;
        }
    }
    /**
     * 图集
     * @param {*} ContentAtlas 图集
     */
    setContentAtlas(ContentAtlas) {
        if (ContentAtlas) {
            this.formData['ContentAtlas'] = ContentAtlas;

        }
    }
    /**
     * 视频地址
     * @param {*} ContentVideo 视频地址
     */
    setContentVideo(ContentVideo) {
        if (ContentVideo) {
            this.formData['ContentVideo'] = ContentVideo;
        }
    }
    /**
     * 音频地址
     * @param {*} UserAvatar 音频地址
     */
    setContentAudio(ContentAudio) {
        if (ContentAudio) {
            this.formData['ContentAudio'] = ContentAudio;
        }
    }
    /**
     * 焦点图片
     * @param {*} ContentPicture 焦点图片
     */
    async setContentPicture(ContentPicture) {
        // console.log('ContentPicture----',ContentPicture)
        if (ContentPicture) {
            if (this.formData['Type'] == 1) {
                // 下载封面图
                let fileDIR = `content/${toolsParseDate(new Date(), "yyyy/MM/dd/")}`;
                // let dowPath = await download(ContentPicture, fileDIR, uuidv4().replace(/-/gim, ""));
                let dowPath = await download(ContentPicture, fileDIR, this.formData['UserNickName']);
                if (dowPath) {
                    ContentPicture = dowPath.Url;
                }
                this.formData['UploadId'] = dowPath.UploadId;
            }
            // console.log('焦点图片----------', ContentPicture)

            this.formData['ContentPicture'] = ContentPicture;
        }
    }
    /**
     * 链接地址
     * @param {*} ContentUrl 链接地址
     */
    setContentUrl(ContentUrl) {
        if (ContentUrl && (ContentUrl.indexOf('http') >= 0 || ContentUrl.indexOf('HTTP') >= 0)) {
            this.formData['ContentUrl'] = ContentUrl;
        }
    }
    /**
     * 标题
     * @param {*} ContentTitle 标题
     */
    setContentTitle(ContentTitle) {
        if (ContentTitle) {
            this.formData['ContentTitle'] = ContentTitle;
        }
    }
    /**
     * 排序
     * @param {*} Up 
     */
    setUp(Up) {
        if (Up) {
            this.formData['Up'] = Up;
        }
    }
    /**
     * 排序
     * @param {*} Up 
     */
    setState(State) {
        if (State) {
            this.formData['State'] = State;
        }
    }
    /**
     * 排序
     * @param {*} Pr 
     */
    setPr(Pr) {
        if (Pr) {
            this.formData['Pr'] = Pr;
        }
    }
    /**
     * 排序
     * @param {*} Nav 
     */
    setNav(Nav) {
        if (Nav) {
            this.formData['Nav'] = Nav;
        }
    }
    /**
     * 排序
     * @param {*} Top 
     */
    setTop(Top) {
        if (Top) {
            this.formData['Top'] = Top;
        }
    }
    /**
     * 排序
     * @param {*} Hot 
     */
    setHot(Hot) {
        if (Hot) {
            this.formData['Hot'] = Hot;
        }
    }
    /**
     * 排序
     * @param {*} Rec 
     */
    setRec(Rec) {
        if (Rec) {
            this.formData['Rec'] = Rec;
        }
    }
    /**
     * 排序
     * @param {*} Pre 
     */
    setPre(Pre) {
        if (Pre) {
            this.formData['Pre'] = Pre;
        }
    }


    /**
     * 描述
     * @param {*} ContentDesc 描述
     */
    setContentDesc(ContentDesc) {
        if (ContentDesc) {
            this.formData['ContentDesc'] = ContentDesc;
        }
    }
    /**
     * 内容
     * @param {*} ContentDetails 内容
     */
    async setContentDetails(ContentDetails) {
        // console.log('ContentDetails>>>>', ContentDetails)
        if (ContentDetails) {
            if (this.formData['Type'] == 1) {
                // 提取媒体链接
                let mediaList = await parseMediaHtml(ContentDetails);
                // console.log('mediaList>>>>', mediaList)
                // 下载内容中的媒体文件
                if (mediaList) {

                    let fileDIR = `content/${toolsParseDate(new Date(), "yyyy/MM/dd/")}`;

                    let rExp;
                    for (let mediaItem of mediaList) {

                        // let dowPath = await download(mediaItem, fileDIR, uuidv4().replace(/-/gim, ""));

                        let dowPath = await download(mediaItem, fileDIR, this.formData['UserNickName']);
                        // console.log('dowPath 下载后的路径----------',dowPath)
                        if (dowPath) {

                            rExp = new RegExp(dowPath.LocPath.replace(/\?/gim, '\\?'), 'gim');
                            ContentDetails = ContentDetails.replace(rExp, dowPath.Url);

                        }
                        // console.log('内容图片----------',ContentDetails)
                    }
                }
            }
            this.formData['ContentDetails'] = ContentDetails;

        }
    }
    /**
     * 发布时间
     * @param {*} ContentTime 发布时间
     */
    setContentTime(ContentTime) {
        if (ContentTime) {
            this.formData['ContentTime'] = ContentTime;
        }
    }
    /**
     * 来源
     * @param {*} ContentSource 来源
     */
    setContentSource(ContentSource) {
        if (ContentSource) {
            this.formData['ContentSource'] = ContentSource;
        }
    }
    /**
     * 分类名
     * @param {*} CategoryName 分类名
     */
    setCategoryName(CategoryName) {
        if (CategoryName) {
            this.formData['CategoryName'] = CategoryName;
        }
    }
    /**
     * 是否公用文章
     * @param {*} ISPublic 是否公用文章
     */
    setISPublic(ISPublic) {
        if (ISPublic) {
            this.formData['ISPublic'] = ISPublic || 0;
        }
    }
    /**
     * 文章类型
     * @param {*} TypeJump 是否公用文章
     */
    setTypeJump(TypeJump) {
        if (TypeJump) {
            this.formData['TypeJump'] = TypeJump || 0;
        }
    }
    /**
     * 外链
     * @param {*} Link 外链
     */
    setLink(Link) {
        if (Link) {
            this.formData['Link'] = Link || '';
        }
    }
    /**
     * 外链文章
     * @param {*} Link 外链文章
     */
    setLink(Link) {
        if (Link) {
            this.formData['Link'] = Link;
        }
    }
    /**
    * 标签名
    * @param {*} TagName 标签名
    */
    setTagName(TagName) {
        if (TagName) {
            this.formData['TagName'] = TagName;
        }
    }
    /**
     * 执行提交
     */
    async run() {
        //如果是亚太日报则状态为发布
        if (!this.formData['Up']) {
            this.formData['State'] = 4;
        }
        // return
        if (
            this.formData['LangName']
            && this.formData['WebName']
            && this.formData['WebSite']
            && this.formData['ContentUrl']
            && this.formData['ContentTitle']
            && (this.formData['ContentDetails'] || this.formData['Link'])
        ) {

            // 过滤当次提交的重复数据
            if (QUEUEMAP[this.formData.ContentUrl] && QUEUEMAP[this.formData.ContentUrl].Code == 200) {
                return { Code: 200, Msg: '跳过提交，本地列表数据重复' };
            } else {

                QUEUEMAP[this.formData.ContentUrl] = {};
                // QUEUEMAP[this.formData.ContentUrl] = await serviceCommon.saveContent(this.formData);
                try {
                    QUEUEMAP[this.formData.ContentUrl] = JSON.parse(QUEUEMAP[this.formData.ContentUrl]);
                } catch (e) {
                    QUEUEMAP[this.formData.ContentUrl] = {};
                }
                return QUEUEMAP[this.formData.ContentUrl];
            }
        } else {
            return {
                Code: 500, Msg: `跳过提交，缺少关键数据 `, formData: {
                    LangName: this.formData['LangName'],
                    WebName: this.formData['WebName'],
                    WebSite: this.formData['WebSite'],
                    ContentUrl: this.formData['ContentUrl'],
                    ContentTitle: this.formData['ContentTitle'],
                    ContentDetails: this.formData['ContentDetails']
                }
            }

        }
    }

}

