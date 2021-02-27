<template>
  <the-admin-navbar />
  <the-sidebar />
  <div class="container with-nav">
    <app-message />
    <router-view></router-view>
  </div>
 
</template>

<script>
import TheAdminNavbar from '../components/TheAdminNavbar'
import TheSidebar from '../components/TheSidebar'
import AppMessage from '../components/ui/AppMessage'
export default {
  components : {TheAdminNavbar, AppMessage, TheSidebar}
}
</script>

<style lang="scss" scoped>

</style>