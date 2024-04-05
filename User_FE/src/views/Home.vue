<template>
  <div class="font-body bg-gray-200 dark:bg-black">
     
     <router-view />
   
  </div>

</template>

<script>
import Navbar from "../components/Navbar.vue"


export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>

<style>
/* Add your styles here if needed */
</style>
