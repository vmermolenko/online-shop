<template>
  <div class="products-filter">
    <div class="form-control">
      <input type="text" placeholder="Найти товар..." v-model="title">
      <span class="form-control-clear" v-if="isActive" @click="reset">&times;</span>
    </div>

    <ul class="list">
      <li class="list-item" @click="setCategory('')"  >Все</li>
      <li class="list-item" v-for="item in categoriesList" :key="item" @click="setCategory(item)">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
import {ref, watch, computed, onMounted} from 'vue'
import { useStore } from 'vuex'

  export default {
    emits: ['update:modelValue'],
    props: {
      modelValue : Object
    },
    setup({modelValue}, {emit}){

      const store = useStore()
      const categoriesList = computed(() => store.getters['shop/category'])

      const title = ref()
      const categories = ref()

      // const categories = reactive(
      //   [
      //     {"type": "fruit", "title": "Фрукты", "id": "1"},
      //     {"type": "vegetable", "title": "Овощи", "id": "2"},
      //     {"type": "meat", "title": "Мясо", "id": "3"},
      //     {"type": "fish", "title": "Рыба", "id": "4"},
      //     {"type": "greens", "title": "Зелень", "id": "5"},
      //     {"type": "berries", "title": "Ягоды", "id": "6"}
      //   ])
      onMounted(() => {
        if (modelValue){
          title.value = modelValue.title
          categories.value = modelValue.categories
        }
        
      })

      watch([title, categories], values => {
        emit('update:modelValue', {
          title: values[0]
          ,categories: values[1]
        })
      })

      const isActive = computed(() => title.value || categories.value)

      return {
        categoriesList,
        title,
        categories,
        isActive,
        reset: () => {
          title.value = ''
          categories.value = ''
        },
        setCategory: (item) => categories.value = item.type
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>