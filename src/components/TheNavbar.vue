<template>
  <nav class="navbar">
    <h3>Магазин</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/shop">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина <small class="badge warning filled" v-if="countCARD_MODEL">{{ countCARD_MODEL }}</small></router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Войти</a>
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
          router.push('/auth')
        },
        open : () => store.commit('openSidebar'),
        countCARD_MODEL
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>