
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])
    const addCart= (goods) => {
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if(item) {
            item.count++
        }else{
            cartList.value.push(goods)
        }
    }

    // 删除购物车
  const delCart = (skuId) => {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
  }

  const changeSelect = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected 
  }

   // 计算属性
  // 1. 总的数量 所有项的count之和
  const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  // 2. 总价 所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))

    return {
        cartList,
        addCart,
        delCart,
        allCount,
        allPrice,
        changeSelect
    }
},{
    persist:true
})