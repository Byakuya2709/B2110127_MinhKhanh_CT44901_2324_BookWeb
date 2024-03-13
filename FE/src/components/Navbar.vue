<template>
  <nav class="bg-white dark:bg-black py-4 border-t-8 border-blue-500 dark:border-green-600">
    <div class="container flex justify-between items-center mx-auto">
      <div>
        <router-link to="/" class="font-bold text-gray-800 dark:text-white text-2xl tracking-widest mx-4">HOME</router-link>
      </div>
      <div>
        <ul class="flex items-center">
          <li class="p-2 mx-4 dark:text-white"><router-link to="/">Home</router-link></li>
          <li v-if="!$store.state.isAuthenticated" class="p-2 mx-4">
            <router-link to="/login" class="rounded-full bg-purple-600 border-purple-600 px-6 py-2 text-white">Login</router-link>
          </li>
          <li v-if="!$store.state.isAuthenticated" class="p-2 mx-4">
            <router-link to="/register" class="rounded-full bg-purple-600 border-purple-600 px-6 py-2 text-white">Register</router-link>
          </li>
          <li v-if="$store.state.isAuthenticated" class="p-2 mx-4">
            <button @click="logout" class="rounded-full bg-purple-600 border-purple-600 px-6 py-2 text-white">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style>
</style>
