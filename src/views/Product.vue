<template>
  <div v-if="item.length === 1">
    <app-page back center :title="item[0].title" >
      <img :src="item[0].img"/>
      <p>Категория: <strong>{{ category[0].title }}</strong></p>

      <div class="product-controls in-card">
        <span v-if="item[0].count === 0">Нет в наличии</span>
        <button class="btn" v-else-if="open" @click="addCart(item[0])">{{ currency(item[0].price) }}</button>
        <div class="product-controls" v-else>
          <button class="btn danger"  @click="decrementCart(item[0])">-</button>
          <strong>{{ count }}</strong>
          <button class="btn primary"  @click="incrementCart(item[0])">+</button>
        </div>
      </div>
    </app-page>
  </div>
  
  <h3 class="text-center text-white" v-else>
    Товара не найден.
  </h3>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { currency } from '../utils/currency'
import AppPage from '../components/ui/AppPage'
export default {
  setup(){
    const route = useRoute()
    const store = useStore()
    const CART_MODEL = computed(() => store.getters['shop/CARD_MODEL'])

    const open = computed(() => !CART_MODEL.value[item.value[0].id] )
 
    const item = computed(() => store.getters['shop/products']
      .filter(product => {
        if (route.params.id) {
          return product.id === route.params.id
        }
        return product
      })
    )
    

    const category = computed(() => store.getters['shop/category']
      .filter(category => {
        if (item.value[0].category) {
          return category.type === item.value[0].category
        }
        return category
      })
    )
  
    const addCart = async (itemAdd) => {
      if (itemAdd.count !== 0){
        CART_MODEL.value[itemAdd.id] = 1
        //open.value = false 
      }
      await store.dispatch("shop/actionSetCARD_MODEL", CART_MODEL.value)
    }

    const incrementCart = async (itemInc) => {
      if (CART_MODEL.value[itemInc.id] < itemInc.count){
        CART_MODEL.value[itemInc.id]++
      }
      await store.dispatch("shop/actionSetCARD_MODEL", CART_MODEL.value)
    }

    const decrementCart = async (itemDec) =>{   
      
      if (CART_MODEL.value[itemDec.id] > 0){
        CART_MODEL.value[itemDec.id]-- 
      }
      
      if (CART_MODEL.value[itemDec.id] === 0){
        delete CART_MODEL.value[itemDec.id]

      }

      await store.dispatch("shop/actionSetCARD_MODEL", CART_MODEL.value)
    }
       
    const count = computed(() => CART_MODEL.value[item.value[0].id] ) 

    return {
      category,
      CART_MODEL,
      addCart,
      incrementCart,
      decrementCart,
      currency,
      count,
      open,
      item
    }
  },
  components: {AppPage}
}
</script>

<style scoped>

</style>