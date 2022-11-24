import axios, { AxiosResponse } from 'axios'
import { isEmpty } from 'lodash'
import cookie from 'js-cookie'
import baseStore from '@/store/baseStore'
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'

import { HttpResponse } from '../types/http'

const { userInfo, project_id } = storeToRefs(baseStore())

const http = axios.create({
  baseURL: '/api/meos',
  timeout: 24 * 60 * 60 * 1000,
  headers: {
    post: {
      'Content-Type': 'application/json,charset=utf-8'
    }
  }
})

const errHandle = function errHandle(err: any) {
  const res = err.response
  switch (res.status) {
    case 403:
      console.log('服务器拒绝请求！')
      break
    case 404:
      console.log('页面或方法不存在！')
      break
    case 405:
      console.log('请求方法出错！')
      break
    case 500:
      console.log('服务器内部错误！')
      break
    case 503:
      console.log('服务器内部错误！')
      break
    case 504:
      console.log('请求超时！')
      break
    default:
      console.log('出错了，请稍后再试！')
  }
}
/**
 * 下载
 * @param response file
 */
const download = function download(response: AxiosResponse) {
  const { data, config } = response
  let configData: Record<string, string> = {}
  let fileName = ''
  let mimeType = ''

  configData = Object.prototype.toString.call(response.config.data) === '[Object Object]' ? config.data : JSON.parse(config.data)
  fileName = configData.fileName
  mimeType = response.config.data.mimeType

  const blob = !isEmpty(mimeType) ? new Blob([data], { type: mimeType }) : new Blob([data])

  if ('download' in document.createElement('a')) {
    // 支持a标签download的浏览器/rules/strict-boolean-expressions
    const link = document.createElement('a') // 创建a标签
    link.download = fileName // a标签添加属性
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click() // 执行下载
    URL.revokeObjectURL(link.href) // 释放url
    document.body.removeChild(link) // 释放标签
  } else {
    // 其他浏览器
    ;(navigator as any).msSaveBlob(blob, fileName)
  }
}

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    // const project_id = store.state.project_id
    const { pd, user_id, person_id, userName, userId: userCode } = toRefs(userInfo)
    const groupCode = userInfo.groupCode || cookie.get('groupCode')
    // // 公共参数
    const params = { user_id, pd, person_id, userName, userCode, groupCode }

    // config.headers.groupCode = groupCode
    // config.headers.userId = user_id
    // config.headers.userName = userName

    // Object.assign(params, project_id ? { project_id } : {})
    // 运维系统需要额外的参数
    // if (config.url && config.url.includes('EMS_SaaS_Web')) {
    //   Object.assign(params, {
    //     puser: {
    //       userId: user_id,
    //       loginDevice: 'PC',
    //       pd
    //     }
    //   })
    // }
    // 合并参数
    // if (config.headers.mergeParams !== false) {
    //   config.method === 'post'
    //     ? config.data = Object.assign(params, config.data)
    //     : config.params = Object.assign(params, config.params)
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果responseType='blob'  则是下载文件
    if (response.request.responseType === 'blob') {
      download(response)
    }

    const { data: configData, url } = response.config

    // 暂时只兼容碳管理
    if ((url as string).includes('energy-carbon')) {
      return response
    }
    if (response.data.code === '00000' && response.data.result === 'success') {
      return response
    } else {
      // 是否自动处理错误
      const autoHandleError = !(configData as string).includes('autoHandleError=false')
      if (autoHandleError) {
        alert(isEmpty(response.data.message) ? '服务器异常' : response.data.message)
        return Promise.reject(response)
      } else {
        return response
      }
    }
  },
  error => {
    errHandle(error.response)
    return Promise.reject(error.response)
  }
)

/**
 * post
 * @param {string} url 请求url
 * @param {object} data POST-请求体
 * @param {object} config axios配置
 * @returns {promise}
 */
export const post = function post1<T>(url: string, data: object = {}, config: object = {}): HttpResponse<T> {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(
      res => {
        resolve(res.data)
      },
      err => {
        reject(err)
      }
    )
  })
}

export default http
