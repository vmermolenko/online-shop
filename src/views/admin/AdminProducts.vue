<template>
  <app-page title="Инвентарь">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <div v-if="products">
      <product-table :products="products"></product-table>   
      <app-pagination 
      v-model="page"
      :size="PAGE_SIZE" 
      :count="allProducts.length"
    ></app-pagination>
    </div>

    <span v-else>Товаров нет</span>
     
    

  </app-page>

  <app-modal 
    v-if="modal"
    title="Новый товар"
    @close="modal = false"
  >
    <!-- <div class="form-control" >
      <label for="id">id товара</label>
      <input
          type="text"
          id="id"
          placeholder="id товара"
          v-model.number="item.id"
      >
    </div> -->
    <div class="form-control" >
      <label for="title">Название товара</label>
      <input
          type="text"
          id="title"
          placeholder="Название товара"
          v-model.trim="item.title"
      >
    </div>
    <div class="form-control" >
      <label for="img">Изображение</label>
      <input
          type="text"
          id="img"
          placeholder="Изображение"
          v-model.trim="item.img"
      >
      
    </div>
    <div class="form-control" >
      <label for="price">Цена</label>
      <input
          type="text"
          id="price"
          placeholder="Цена"
          v-model.trim="item.price"
      >
      
    </div>
    <div class="form-control" >
      <label for="count">Количество</label>
      <input
          type="text"
          id="count"
          placeholder="Количество"
          v-model.trim="item.count"
      >
      
    </div>

    
    <div class="form-control">
      <label for="category">Категория</label>
      <select id="category" v-model="item.category">
        <option :value="iter.type" v-for="iter in category" :key="iter">{{ iter.title }}</option>
      </select>
    </div>

    <button class="btn primary" @click="modal = false">Нет</button>
    <button class="btn danger" @click="addProduct">Да</button>
    
  </app-modal>
</template>

<script>
import AppPage from '../../components/ui/AppPage'
import AppModal from '../../components/ui/AppModal'
import AppConfirm from '../../components/ui/AppConfirm'
import ProductTable from '../../components/admin/ProductTable'
import AppPagination from '../../components/ui/AppPagination'
import { useStore } from 'vuex'
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import chunk from 'lodash.chunk'
export default {
   setup(){
      const PAGE_SIZE = 5
      const store = useStore()
      const router = useRouter()
      const route = useRoute()
      const page = ref(route.query.page ? route.query.page : 1)
      const modal = ref(false)
      const category = computed(() => store.getters['shop/category'])
      const item = ref({
        id : '',
        title : '',
        img : '',
        price : '',
        count : '',
        category : ''
      })


      const setPage = () => router.replace({ query : {page: page.value}})
      
      onMounted(() => setPage() )

      onMounted(async () => {
        await store.dispatch('shop/loadCategory')
        await store.dispatch('shop/loadProduct')
        //await store.dispatch('shop/loadAll')
      })


      watch(page, () => { setPage() })
      
      const allProducts = computed(() => store.getters['shop/products'])
      const products = computed(() => chunk(allProducts.value, PAGE_SIZE)[page.value -1])
      
      async function addProduct (){
     
        await store.dispatch('shop/actionAddProduct', {
          id : String(item.value.id),
          title : item.value.title,
          img : item.value.img,
          price : item.value.price,
          count : item.value.count,
          category : item.value.category
        })

        item.value.title = ''
        item.value.img = ''
        item.value.price = ''
        item.value.count = ''
        item.value.category = ''

        modal.value = false

        //console.log(allProducts.value);

      }
      
     return {
        allProducts,
        products,
        PAGE_SIZE,
        page,
        setPage,
        modal,
        item,
        category,
        addProduct
     }
   },
   components: {AppPage, ProductTable, AppPagination, AppModal, AppConfirm}
  }
</script>

<style lang="scss" scoped>

</style>