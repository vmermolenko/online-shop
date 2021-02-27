<template>
  <app-page back title="Магазин">
    <div class="card">
      <product-filter v-model="filter"></product-filter>
      <product-list :products="products"></product-list>
    </div>
    
  </app-page>
  
</template>


<script>
import AppPage from '../components/ui/AppPage'
import ProductList from '../components/shop/ProductList'
import ProductFilter from '../components/shop/ProductFilter'
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup(){
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(async () => {
      await store.dispatch('shop/loadCategory')
      await store.dispatch('shop/loadProduct')
    })
    
    const filter = ref({...route.query})   


    // onMounted(() => {
    //   if (route.query.title || route.query.categories){
    //     filter.value.title = route.query.title
    //     filter.value.categories = route.query.categories
    //   }
    // })

    watch(filter, values => {
      router.replace({  query: { title: values.title, categories : values.categories } })
    })

    // const _setPage = () => router.replace({  query: { title: filter.value.title, categories : filter.value.categories } })
    // onMounted(() => _setPage())

    // watch(_setPage)
    


    const products = computed(() => store.getters['shop/products']
      .sort(function(obj1, obj2) {
        // Сортировка по убыванию
        return obj2.count-obj1.count;
      })
      .filter(product => {
        if (filter.value.title) {
          return product.title.toLowerCase().includes(filter.value.title.toLowerCase())
        }
        return product
      })
      .filter(product => {
        if (filter.value.categories) {
          return product.category === filter.value.categories
        }
        return product
      })
    )
    
    return {
      router,
      filter,
      products
    }
  },
  components: {AppPage, ProductList, ProductFilter}
}
</script>

<style scoped>
.card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>