<template>
  
  <h4 v-if="categories.length === 0" class="text-center">Категорий нет</h4>
  
  <table v-else class="table" >
    <thead>
       <!-- {"type": "fruit", "title": "Фрукты", "id": "1"}, -->
      <tr>
        <th>id</th>
        <th>Название</th>
        <th>Тип (на английском)</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in categories" :key="item.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.type }}</td>
        <td><button class="btn danger" @click="showModalCategory(item)">Удалить</button></td>

        
      </tr>
    </tbody>
  </table>

  <app-modal 
    v-if="modal"
    title="Вы хотите удалить категорию?"
    @close="modal = false"
  >
    
    <button class="btn primary" @click="modal = false">Нет</button>
    <button class="btn danger" @click="deleteCategory(itemDelete)">Да</button>
  </app-modal>
</template>

<script>
import { ref,computed } from 'vue'
import { currency } from '../../utils/currency'
import { useStore } from 'vuex'
import AppModal from '../../components/ui/AppModal'

  export default {
    props: ['categories'],
    setup(props){
      
      const store = useStore()
      const categories = computed(() => props.categories)
      const modal = ref(false)
      const itemDelete = ref()

      async function deleteCategory (i){
        await store.dispatch('shop/actionDelCategory', i)
        modal.value = false
      }

      function showModalCategory(item) {
        modal.value = true
        itemDelete.value = item
      }
      return {
        itemDelete,
        modal,
        categories,
        currency,
        deleteCategory,
        showModalCategory
      }
    },
    components : {AppModal}
  }
</script>

<style lang="scss" scoped>

</style>