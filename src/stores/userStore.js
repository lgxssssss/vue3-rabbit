import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({})
    const getUserInfo =async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.result
    }
    const delUserInfo = () => {
        userInfo.value = {}
    }
    return {
        userInfo,
        getUserInfo,
        delUserInfo
    }
}, {
    persist: true,
})