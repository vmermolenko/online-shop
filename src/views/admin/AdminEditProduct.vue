<template>
  <app-page adminback title="Товар">
    <div v-if="item[0]">
      <img :src="item[0].img" />
      <div class="form-control" :class="{invalid: errors.name}">
        <label for="title">Название</label>
        <input
            type="text"
            id="title"
            placeholder="Название"
            v-model.trim="item[0].title"
        >
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="form-control" :class="{invalid: errors.name}">
        <label for="img">Изображение</label>
        <input
            type="text"
            id="img"
            placeholder="Изображение"
            v-model.trim="item[0].img"
        >
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="form-control" :class="{invalid: errors.name}">
        <label for="price">Цена</label>
        <input
            type="text"
            id="price"
            placeholder="Цена"
            v-model.trim="item[0].price"
        >
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="form-control" :class="{invalid: errors.name}">
        <label for="category">Категория</label>
        <select id="category" v-model="item[0].category">
          <option :value="iter.type" v-for="iter in category" :key="iter">{{ iter.title }}</option>
        </select>
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>
      <div class="form-control" :class="{invalid: errors.name}">
        <label for="count">Количество</label>
        <input
            type="text"
            id="count"
            placeholder="Количество"
            v-model.trim="item[0].count"
        >
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>
      <button v-if="!isChange" class="btn danger" @click="modal = true">Удалить</button>
      <div v-else>
        <button  class="btn warning" @click="cancel">Отменить изменения</button>
        <button  class="btn primary" @click="updateProduct(item[0])">Обновить</button>
      </div>      
    </div>
    <div v-else>
      <span>Товар не найден</span>
    </div>
  </app-page>


  <app-modal 
    v-if="modal"
    title="Вы хотите удалить товар?"
    @close="modal = false"
  >

  <app-confirm :title="item[0].title" @appconfirm="appconfirm">

  </app-confirm>
  
  </app-modal>
</template>

<script>
import { computed, ref, watch } from 'vue'
import AppPage from '../../components/ui/AppPage'
import AppModal from '../../components/ui/AppModal'
import AppConfirm from '../../components/ui/AppConfirm'
import AppPagination from '../../components/ui/AppPagination'
import { useStore } from 'vuex'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'

  export default {
    setup(){
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const showDel = ref(true)

    const item = computed(() => store.getters['shop/products']
      .filter(product => {
        if (route.params.id) {
          return product.id === route.params.id
        }
        return product
      })
    )

    const itemOld = ref({
      title : !!item.value[0] ? item.value[0].title : '',
      img : !!item.value[0] ? item.value[0].img : '',
      price :  !!item.value[0] ? item.value[0].price : '',
      count : !!item.value[0] ? item.value[0].count : '',
      category : !!item.value[0] ? item.value[0].category : '',
    })
    
    
    const isChange = computed(() => 
      {
        if ( (!!itemOld.value !== false) && (!!item.value[0] !== false)) {
          return  itemOld.value.title !== item.value[0].title || 
                  itemOld.value.img !== item.value[0].img ||
                  itemOld.value.price !== item.value[0].price ||
                  itemOld.value.count !== item.value[0].count || 
                  itemOld.value.category !== item.value[0].category
        }
        return false
      }
    )
    const errors = ref({ name: ''})

    const category = computed(() => store.getters['shop/category'])

    const modal = ref(false)

    onBeforeRouteLeave(() => {
      if (isChange.value) {
        return false
      }
      return true
    })

    return {
        isChange,
        showDel,
        item,
        category,
        errors,       
        modal,
        appconfirm : async (yes) => {
          if (yes) {
            await store.dispatch("shop/actionDelProducts", item.value[0])
            router.push('/admin/products')
          }
          modal.value = false
        },
        updateProduct : async (i) => {
          await store.dispatch("shop/actionUpdateProducts", i)
          itemOld.value = {
            title : item.value[0].title,
            img : item.value[0].img,
            price : item.value[0].price,
            count : item.value[0].count,
            category : item.value[0].category
          }
        },
        cancel : () => {
          item.value[0].title =  itemOld.value.title
          item.value[0].img =  itemOld.value.img
          item.value[0].price =  itemOld.value.price
          item.value[0].count =  itemOld.value.count
          item.value[0].category =  itemOld.value.category
        }
     }
   },
   components: {AppPage, AppPagination, AppModal, AppConfirm}
  }
</script>

<style lang="css" scoped>

</style>