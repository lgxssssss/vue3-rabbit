
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])

     // 获取最新购物车列表action
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }

    const addCart= async (goods) => {
        const {skuId, count} = goods
        if(isLogin.value) {
            await insertCartAPI({ skuId, count })
            updateNewList()
        }else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if(item) {
                item.count++
            }else{
                cartList.value.push(goods)
            }
        }
    }

    // 删除购物车
  const delCart = async (skuId) => {
      if(isLogin.value) {
        await delCartAPI([skuId])
        updateNewList()
    }else {
        // 思路：
        // 1. 找到要删除项的下标值 - splice
        // 2. 使用数组的过滤方法 - filter
        const idx = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(idx, 1)
    }
  }

  // 单选功能
  const changeSelect = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected 
  }

  // 全选功能
  const allCheck = (selected) => {
    // 把cartList中的每一项的selected都设置为当前的全选框状态
    cartList.value.forEach(item => item.selected = selected)
  }


   // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  // 3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected === true).reduce((a, c) => a + c.count, 0))
  // 3. 已选择数量
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected === true).reduce((a, c) => a + c.count * c.price, 0))

  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected === true))

    return {
        cartList,
        allCount,
        allPrice,
        isAll,
        selectedCount,
        selectedPrice,
        addCart,
        delCart,
        changeSelect,
        allCheck
    }
},{
    persist:true
})