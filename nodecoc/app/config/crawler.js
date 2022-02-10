let crawlerConfig = {
    IMAGE_SERVER_REGEXP: "_HOMEIMAGEURIREGEXP_",
    imgAssets: "http://127.0.0.1:5000/public/",
    // apiServer: "http://127.0.0.1:8080/",
    // apiServer: "https://api.anys.top/",
    // apiServer: "http://47.98.136.70:8090/",
    apiServer: "http://127.0.0.1:8090/",
    //郑
    // apiServer_WRITE: "http://192.168.2.124:8090/",
    // apiServer: "http://192.168.2.124:8090/",
    //李
    // apiServer_WRITE: "http://192.168.2.189:8090/",
    // apiServer: "http://192.168.2:189:8090/",
    // apiServer_WRITE: "http://47.98.136.70:8090/",
    apiServer_WRITE: "http://127.0.0.1:8090/",
    // apiServer: "http://120.79.179.1:8080/",
    crawlerServerList: {
        // 0: "http://127.0.0.1:6060"
        // 2: "http://127.0.0.1:6060"
    },
    serverType: {
        1: "/crawler/list",
        2: "/crawler/item",
        101: "/crawler/user"
    },
    // 文章更新过期时间
    CreatedOut: 24, // 创建时间在 CreatedOut 内
    UpdateOut: 1, // 更新时间在 UpdateOut  外
    MaxCount: 20, // 最大更新次数
    MaxTag: 10 // 单片内容提取最大标签数
};

if (process.env.NODE_ENV === "production") {
    crawlerConfig.apiServer = "http://47.98.136.70:8080/";
    crawlerConfig.apiServer_WRITE = "http://120.55.42.47:8080/";
}
//长沙老
// crawlerConfig.apiServer = "http://124.232.137.72:8070/";
// crawlerConfig.apiServer_WRITE = "http://124.232.137.72:8070/";
//长沙new
crawlerConfig.apiServer = "http://124.232.137.72:8170/";
crawlerConfig.apiServer_WRITE = "http://124.232.137.72:8170/";
//本地服务器
// crawlerConfig.apiServer = "http://192.168.50.213:8070/";
// crawlerConfig.apiServer_WRITE = "http://192.168.50.213:8070/";
//本地
// crawlerConfig.apiServer = "http://127.0.0.1:8070/";
// crawlerConfig.apiServer_WRITE = "http://127.0.0.1:8070/";


export default crawlerConfig;