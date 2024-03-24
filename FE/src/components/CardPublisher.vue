<template>

  <div id="cardNXB" class=" max-w flex flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <div class="flex felx-row">
      <slot></slot>
      <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ publisher.publisherName }}</h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Địa chỉ :{{ publisher.address }}</p>
      </div>
    </div>

    <div class="mt-4">
      <button @click="editPublisher" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Edit</button>
      <button @click="deletePublisher" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
    </div>
  </div>
 
  </template>
  
  <script>
  export default {
    props: {
      publisher: {
        type: Object,
        required: true
      }
    },
    methods: {
      editPublisher() {
        // Emit an event to notify the parent component that the edit button is clicked
        this.$emit('edit-publisher', this.publisher);
      },
      deletePublisher() {
        // Emit an event to notify the parent component that the delete button is clicked
        this.$emit('delete-publisher', this.publisher);
      }
    }
  };
  </script>
  
  <style>
  #cardNXB {
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  }
  </style>
  