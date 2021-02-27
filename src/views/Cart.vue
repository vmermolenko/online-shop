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
//products.id products.count
// const CART_MODEL = {
//   '1': 3,
//   '2': 1
// }

export default {
  setup() {
    const store = useStore()

    const CART_MODEL = computed(() => store.getters['shop/CARD_MODEL'])

    // const cartproducts = reactive(
    //   [
    //     { "id": "1", "count": 13, "title": "Яблоко", "category": "fruit", "price": 99, "img": "https://images.grocery.yandex.net/2783132/a14b43cfbbac4898b5a89fd1e52c0029/300x300.png" },
    //     { "id": "2", "count": 15, "title": "Груша", "category": "fruit", "price":  159, "img": "https://images.grocery.yandex.net/2805921/631c3a283a994a80820c216ec51f139d/300x300.png" },
    //     { "id": "3", "count": 14, "title": "Апельсин", "category": "fruit", "price":  149, "img": "https://stockmeier-food.ru/wp-content/uploads/2019/07/apelsin.jpg" },
    //     { "id": "4", "count": 0, "title": "Нектарин", "category": "fruit", "price":  200, "img": "https://cdn-irec.r-99.com/sites/default/files/imagecache/300o/product-images/13250/1280575364_nectarin.jpg" },
    //     { "id": "5", "count": 15, "title": "Огурец", "category": "vegetable", "price":  79, "img": "https://images.grocery.yandex.net/2750890/33686ff02aa44c7cb4bcb551b42f851a/300x300.png" },
    //     { "id": "6", "count": 14, "title": "Помидоры", "category": "vegetable", "price":  129, "img": "https://images.grocery.yandex.net/2756334/e97aaa365384455c84dbfa3691c330f1/300x300.png" },
    //     { "id": "7", "count": 11, "title": "Свекла", "category": "vegetable", "price":  19, "img": "https://images.grocery.yandex.net/2756334/33a66b51989449f9918122a775885fbc/300x300.png" },
    //     { "id": "8", "count": 12, "title": "Баклажан", "category": "vegetable", "price":  189, "img": "https://images.grocery.yandex.net/2756334/cbb08819de08460a9131a86c627bed92/300x300.png" }
    //   ]
    // )
    
    const cartproducts = computed(() => store.getters['shop/products'])
    
    //const itemSumTotal = watch((item) => item.count * item.price )
    //const itemSumTotal = computed((item) => item.count * item.price)

    // const CART_MODEL = reactive({
    //   "1": 10,
    //   "3": 8,
    //   "5": 5
    // })

    //delete CART_MODEL["1"]
    //CART_MODEL["5"] = 10
    //console.log(Object.keys(CART_MODEL));
    //console.log(Object.entries(CART_MODEL));
    //console.log("CART_MODEL", JSON.stringify(CART_MODEL));

    // const results = cartproducts.filter((item) => {
    //   item.id === Object.keys(CART_MODEL)
    // });

    // const results = cartproducts
    //                 .filter(item => {
    //                   var keys = Object.keys(CART_MODEL);
    //                   for(var i=0; i<keys.length; i++){
    //                     var key = keys[i];
    //                     if (item.id == key){
    //                       return true
    //                     }
    //                   }
    //                   return false
    //                 })

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