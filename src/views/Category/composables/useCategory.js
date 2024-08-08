//分装分类数据业务相关代码
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getCategoryAPI } from'@/apis/category'
import { onBeforeRouteUpdate } from 'vue-router';

export function useCategory () {
    //获取分类数据
    const route = useRoute()
    const categoryData = ref({})
    const getCategory = async (id = route.params.id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
    }
    onMounted(() =>getCategory())
    //目标路由发生变化的时候，可以把分类数据重新发送(精细化控制)
    onBeforeRouteUpdate((to) => {
        console.log('路由变化了');
        //存在问题：使用最新的路由参数请求最新的分类数据
        console.log(to);
        getCategory(to.params.id)
        
    })
    //watch也能行,感觉跟视频中的一样有优解
    // watch (route, () => {
    //   getCategory()
    // })
    return {
        categoryData
    }
}