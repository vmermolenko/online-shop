<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center" v-if="results.length === 0">В корзине пока ничего нет</h3>
    <div v-else>
      <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in results" :key="item.id">
        <td>{{ item.title }}</td>
        <td>
          <button class="btn primary" @click="incrementCart(item)">+</button> 
          {{ CART_MODEL[item.id] }} шт.
          <button class="btn danger" @click="decrementCart(item)">-</button>
        </td>
        <td>{{ itemSum(item) }} руб.</td>
      </tr>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{ itemSumTotal }} руб.</strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
    </div>
    
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    const CART_MODEL = computed(() => store.getters['shop/CARD_MODEL'])
    
    const cartproducts = computed(() => store.getters['shop/products'])

    const results = computed(() => {
      return  cartproducts.value
              .filter(item => {
                var keys = Object.keys(CART_MODEL.value);
                for(var i=0; i<keys.length; i++){
                  var key = keys[i];
                  if (item.id == key){
                    return true
                  }
                }
                return false
              })
      }
    )

    const itemSumTotal = computed(() =>  {
        let sumTotal = 0;
        results.value.forEach(item => {
          sumTotal += CART_MODEL.value[item.id] * item.price
        })

        return sumTotal
      }
    )

    //console.log(JSON.stringify(results));

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

    return {
      cartproducts,
      itemSumTotal,
      itemSum : (item) => CART_MODEL.value[item.id] * item.price ,
      results,
      incrementCart,
      decrementCart,
      CART_MODEL
    }
  }
}
</script>

<style scoped>

</style>