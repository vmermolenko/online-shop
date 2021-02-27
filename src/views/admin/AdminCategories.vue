<template>
  <app-page title="Категория">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    
    
    <category-table :categories="categories"></category-table>
  </app-page> 


  <app-modal 
    v-if="modal"
    title="Новая категория"
    @close="modal = false"
  >
    <div class="form-control" >
      <label for="title">Название категории</label>
      <input
          type="text"
          id="title"
          placeholder="Название категории"
          v-model.trim="item.title"
      >
    </div>
     <div class="form-control" >
      <label for="type">Тип на английском</label>
      <input
          type="text"
          id="type"
          placeholder="Тип на английском"
          v-model.trim="item.type"
      >
      
    </div>

    <button class="btn primary" @click="modal = false">Нет</button>
    <button class="btn danger" @click="addCategory">Да</button>
    
  </app-modal>

</template>

<script>
import AppPage from '../../components/ui/AppPage'
import AppModal from '../../components/ui/AppModal'
import CategoryTable from '../../components/admin/CategoryTable'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

  export default {
   setup(){
    const store = useStore()

    onMounted( async () => {
      await store.dispatch('shop/loadCategory')
    })
    

    const categories = computed(() => store.getters['shop/category'])
    const modal = ref(false)
    const errors = ref()

    const item = ref({
      title : '',
      type : ''
    })

    async function addCategory (){
     
      await store.dispatch('shop/actionAddCategory', {
        title: item.value.title,
        type: item.value.type
      })

      item.value.title = ''
      item.value.type = ''
      modal.value = false

    }

    return {
      item, 
      errors,
      modal,
      categories,
      addCategory
     }
   },
   components: {AppPage, CategoryTable, AppModal}
  }
</script>

<style lang="scss" scoped>

</style>