// axios基础的封装
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 10000
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()
  // 处理业务失败, 给错误提示，抛出错误
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  if (e.response.status === 401) {
    userStore.delUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})


export default httpInstance