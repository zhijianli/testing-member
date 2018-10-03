let env = process.env.NODE_ENV === "production" ? "prd" : "test"


let qiniuPic = ''
let qiniuMp3 = ''

if (env == 'test') { // 开发&测试&预发布
    qiniuPic = 'http://oml9ntix5.qnssl.com'
    qiniuMp3 = 'http://oml9jrsxm.bkt.clouddn.com'
}

if (env == 'prd') { // 生产
    qiniuPic = 'http://picture.120xinmao.com'
    qiniuMp3 = 'https://file.120xinmao.com'
}


export {qiniuPic, qiniuMp3}
