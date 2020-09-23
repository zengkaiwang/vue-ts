import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { BASE_URL } from '@/config'

const env = process.env.NODE_ENV
let baseUrl: any = BASE_URL[env] || ''

/**
 * 创建axios实例，在这里可以设置请求的默认配置
 */
const instance = axios.create({
  timeout: 10000, // 设置超时时间10s
})

/**
 * 添加请求拦截器
 */
axios.interceptors.request.use(
  config => {
    // 设置post请求常见的数据格式（Content-Type）
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) {
      config.headers['Content-Type'] = 'application/json'
    }

    // config.headers['lang'] = getLang()
    const userInfo = JSON.parse(localStorage.getItem('USERINFO') || '{}')
    config.headers['tenantID'] = userInfo.tenantId

    // 若是有做鉴权token , 就给头部带上token
    if (sessionStorage.token) {
      config.headers['Authorization'] = sessionStorage.token
    }
    return config
  },
  error => {
    showTip(error)
    return Promise.reject(error.data.error.message)
  }
)

/**
 * 添加响应拦截器
 */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.msg)
      return Promise.reject(error)
    } else {
      showTip('请求超时, 请刷新重试')
      return Promise.reject(new Error('请求超时, 请刷新重试'))
    }
  }
)

/**
 * 错误统一处理
 */
const errorHandle = (status: any, msg: any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      debounce(msg, 1000, toLogin)
      break
    // 403 token过期，清除token并跳转登录页
    case 403:
      debounce('登录过期，请重新登录', 1000, toLogin)
      sessionStorage.removeItem('token')
      break
    case 404:
      showTip('请求的资源不存在')
      break
    case 500:
      showTip('服务器错误')
      break
    default:
    // console.log(other)
  }
}

/**
 * 请求方法的封装
 */
export const request = (param: any): any => {
  const method = String(param.method || 'GET').toUpperCase()

  // 调用者可通过设置isUseSelfHost，来使用自定义的服务器域名
  const url = param.isUseSelfHost ? param.url : `${baseUrl}${param.url}`

  // axios参数
  const config = {
    method: param.method,
    url: url,
    headers: param.headers || {},
    cancelToken: param.cancelToken
  }

  if (method === 'GET') {
    Object.assign(config, { params: param.data || {} })
  } else {
    Object.assign(config, { data: param.data || {} })
  }

  return new Promise((resolve, reject) => {
    // axios({
    instance({
      ...config
    }).then((res: any) => {
      if (res.data.code !== 100200 && res.data.code !== 'Success' && res.data.resultCode !== 'Success') {
        // 接口返回200
        if (!param.notShowToast && res.data.msg) {
          showTip(res.data.msg)
        }
      }
      resolve(res.data)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * 文件下载请求的封装
 * 支持各种类型的文件
 */
export const downloadFile = (param: any): any => {
  return axios({
    method: param.method || 'post',
    url: `${baseUrl}${param.url}`,
    data: param.data,
    responseType: 'blob' // 表明返回服务器返回的数据类型

  }).then(res => { // 处理返回的文件流
    const blob = new Blob([res.data]) // new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）
    const fileName = `${param.name}` // 下载文件名称,此文件名需带后缀
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  })
}

/**
 * 提示函数,禁止点击蒙层,显示一秒后关闭
 */
const showTip = (msg: any) => {
  Message({
    showClose: true,
    message: msg,
    type: 'error'
  })
}

/**
 * 跳转登录页，携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 防抖函数
 */
let timer: any = null
const debounce = (msg: any, delay: number, callback: Function) => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
  timer = setTimeout(() => {
    showTip(msg)
    callback()
  }, delay)
}