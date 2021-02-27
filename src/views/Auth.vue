<template>
  <div class="container">
    <form class="card" @submit.prevent="onSubmit">
      <h1>Войти в систему</h1>
      <h3>v@mail.ru 123456</h3>

      <div :class="['form-control',{ invalid : eError}]">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" @blur="eBlur">
        <small v-if="eError">{{ eError}}</small>
      </div>

      <div :class="['form-control',{ invalid : pError}]">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" @blur="pBlur">
        <small v-if="pError">{{ pError}}</small>
      </div>

      <button class="btn primary" type="submit" :disabled="isSubmitting || isToManyAttempts">Войти</button>
      <div>
        <span class="text-danger" v-if="isToManyAttempts">Вы слишком часто пытаетесь войти в систему. Попробуйте позже</span>
      </div>
    </form>
  </div>
 
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useLoginForm } from '../use/login-form'
import { error } from '../utils/error'

export default {
  setup(){
    const store = useStore()
    const route = useRoute()
    if (route.query.message){
      store.dispatch('setMessage', {
        value : error(route.query.message),
        type: 'warning'
      } )
    }
    return {...useLoginForm()}
  }
}
</script>

<style lang="scss" scoped>

</style>