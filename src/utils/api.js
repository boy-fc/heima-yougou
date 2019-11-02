import wepy from 'wepy'

const baseUrl ='https://uinav.com/api/public/v1'
// 封装提示消息
wepy.baseToast = function (title='获取数据失败',icon='none') {
    wepy.showToast({
        title,
        icon
    })
}

// 封装get请求
wepy.get = function (path,data={}) {
    return wepy.request({
        url:baseUrl+path,
        data
    })
}

// 封装post请求
wepy.post = function (path,data={}) {
    return wepy.request({
        url:baseUrl+path,
        method:'post',
        data
    })
}