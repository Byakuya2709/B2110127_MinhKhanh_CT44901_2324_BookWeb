<template>
    <div class="card bg-white shadow-md rounded-md p-6 mb-4">
      <h2 class="text-xl font-semibold">{{ publisher.publisherName }}</h2>
      <p class="text-gray-600">Address: {{ publisher.address }}</p>
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
  .card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
  }
  </style>
  