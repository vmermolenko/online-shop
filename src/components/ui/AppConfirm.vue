<template>
  <div>
    <h1>{{ title }}</h1>
    <button class="btn danger" @click="$emit('appconfirm', true)">Да</button>
    <button class="btn primary" @click="$emit('appconfirm', false)">Нет</button>
  </div>
</template>

<script>

  export default {
    props : {
      title : {
        type : String,
        required : true
      }
    },
    emits:['appconfirm']
  }
</script>

<style lang="scss" scoped>

</style>