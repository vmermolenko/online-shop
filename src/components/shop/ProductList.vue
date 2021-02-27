<template>
  <div class="products-table">
    <product-list-item v-for="item in products" :key="item" 
      :productitem="item"
    ></product-list-item>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import ProductListItem from './ProductListItem'
import { useStore } from 'vuex'
  export default {
    props: ['products'],
    setup(props){
      const store = useStore()

      const products = computed(() => props.products)

      //store.dispatch("shop/actionSetProducts", products)
      return{
        products
      }
    },
    components : { ProductListItem }
  }
</script>

<style lang="scss" scoped>

</style>