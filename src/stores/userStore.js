import { loginAPI } from '@/apis/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
    const userStore = useCartStore()
    const userInfo = ref({})
    const getUserInfo =async ({account, password}) => {
        const res = await loginAPI({account, password})
        userInfo.value = res.result
    }
    const delUserInfo = () => {
        userInfo.value = {}
        userStore.clearCart()
    }
    return {
        userInfo,
        getUserInfo,
        delUserInfo
    }
}, {
    persist: true,
})