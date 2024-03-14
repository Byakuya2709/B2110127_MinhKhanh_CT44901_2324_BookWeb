<template>
  <div class="font-body bg-gray-200 dark:bg-black">
  
   
    <InputSearch :initialSearchTerm="initialSearchTerm" @input="search" />  
    <router-view />
   
  </div>

</template>

<script>
import InputSearch  from "../components/Search.vue";
import Navbar from "../components/Navbar.vue"


export default {
  name: "App",
  components: {
    Navbar,
    InputSearch
  },
  data() {
    return {
      initialSearchTerm: 'Initial value from database'
    };
  },
  methods: {
    search(term) {
     
    }
  }
};
</script>

<style>
/* Add your styles here if needed */
</style>../components/Search.vue
