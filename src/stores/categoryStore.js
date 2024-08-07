import { getCategoryAPI } from '@/apis/layout';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])
    const getCategory = async() => {
        const res =await getCategoryAPI()
        categoryList.value = res.result
      }
      return {
        categoryList,
        getCategory
        
    }
})


