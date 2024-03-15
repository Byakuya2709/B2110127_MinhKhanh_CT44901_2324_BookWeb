<template>
  <div class="relative">
    <input
      @input="handleInput"
      v-model="searchInput"
      type="text"
      placeholder="Search..."
      class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
    />
    <svg
      v-if="searchInput"
      @click="clearSearch"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
</template>

<script>
export default {
 
  data() {
    return {
      searchInput:''
    };
  },
  methods: {
    handleInput(event) {
      this.searchInput = event.target.value;
      this.$emit('search', event.target.value);
    },
    clearSearch() {
      this.searchInput = '';
      this.$emit('search','');
    }
  }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
