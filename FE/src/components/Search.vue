<template>
    <div class="relative">
      <input
        v-model="searchTerm"
        @input="handleInput"
        type="text"
        placeholder="Search..."
        class="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
      />
      <svg
        v-if="searchTerm"
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
    props: {
      initialSearchTerm: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        searchTerm: this.initialSearchTerm
      };
    },
    methods: {
      handleInput(event) {
        this.searchTerm = event.target.value;
        this.$emit('input', this.searchTerm); // Emitting search term to parent component
      },
      clearSearch() {
        this.searchTerm = '';
        this.$emit('input', ''); // Emit empty string to clear search term in parent component
      }
    }
  };
  </script>
  
  <style scoped>
  /* No custom styles needed, Tailwind CSS classes are used directly */
  </style>
  ./InputSearch.vue