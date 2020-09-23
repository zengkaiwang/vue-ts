export const BASE_URL: any = {
  dev: 'dev',
  qa: 'http://10.122.61.224:8090',
  production: process.env.VUE_APP_HOST || 'https://www.aiot.lenovo.com.cn:8090',
}

const env = process.env.NODE_ENV
export const UPLOAD: string = `${BASE_URL[env]}/file-api`