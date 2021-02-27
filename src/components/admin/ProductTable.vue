<template>
  
  <h4 v-if="products.length === 0" class="text-center">Продуктов нет</h4>
  <table v-else class="table" >
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Изображение</th>
        <th>Цена</th>
        <th>Категория</th>
        <th>Количество</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in products" :key="item.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ item.title }}</td>
      <td><img :src="item.img" class="product-table-img"></td>
      <td>{{ currency(item.price) }}</td>
      <td>{{ itemCategory(item) }}</td>
      <td>{{ item.count }}</td>
      <td>
        <router-link v-slot="{navigate}" custom :to="{name: 'EditProduct', params: {id: item.id}}">
          <button class="btn" @click="navigate">Открыть</button>
        </router-link>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from 'vue'
import { currency } from '../../utils/currency'
import { useStore } from 'vuex'
  export default {
    props: ['products'],
    setup(props){
      const products = computed(() => props.products)
      const store = useStore()
      const category = computed((item) => store.getters['shop/category'])

      function itemCategory (item) {
          if (item) {
            return category.value.find( el => el.type === item.category).title
          }
      }



      return {
        itemCategory,
        products,
        category,
        currency
      }
    }

  }
</script>

<style lang="scss" scoped>

</style>