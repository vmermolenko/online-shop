<template>
  <nav class="navbar">
    <h3>Админка</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/admin/products">Инвентарь</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категория</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
    
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
  export default {
    setup(){
      const router = useRouter()
      const store = useStore()

      const countCARD_MODEL = computed(() => store.getters['shop/getCountCARD_MODEL'])
      return {
        logout: () => {
          store.commit('auth/logout')
          router.push('/shop')
        },
        open : () => store.commit('openSidebar'),
        countCARD_MODEL
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>