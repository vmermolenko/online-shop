<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться на главную</router-link>
  </div>
  <div class="breadcrumbs" v-if="adminback">
    <router-link to="/admin" class="text-white">Вернуться на главную</router-link>
  </div>
  <div class="card" :class="{center : center}">
    <h1 class="card-title">{{ title }}
      <slot name="header"/>
    </h1>
    <slot />
  </div>
</template>

<script>
  export default {
    props : {
      title : {
        type : String,
        required : true
      },
      back : {
        type : Boolean,
        default : false

      },
      adminback : {
        type : Boolean,
        default : false

      },
      center : {
        type : Boolean,
        default : false
      }
    },
    setup(props){
      document.title = `${props.title} | Интернет магазин`
    }
  }
</script>

<style lang="scss" scoped>

</style>