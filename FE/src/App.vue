<template>
  <div class="font-body bg-gray-200 dark:bg-black">
      <Navbar />
      <router-view /> 
   
  </div>
</template>

<script>
import Landing from './components/Landing.vue';
import Navbar from './components//Navbar.vue';
export default {
  name: "App",
  components: {
    Landing,
    Navbar
  
  }
};
</script>

<style>

</style>