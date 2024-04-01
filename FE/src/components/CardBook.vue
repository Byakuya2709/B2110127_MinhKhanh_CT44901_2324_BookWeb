<template>



  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <div class="flex flex-col items-center pb-5">
     <slot></slot>
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ book.title }}</h5>
      <span class="text-sm text-gray-500 dark:text-gray-400">Nhà xuất bản: {{ book.publisher }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">Giá: {{ formatPrice(book.price) }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">Ngày Phát hành: {{ formatDate(book.publicationDate)
        }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">Số lượng: {{ book.available }}</span>
      <div class="flex mt-4 md:mt-6">
        <button @click="editBook" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Chỉnh sửa</button>
        <button @click="deleteBook" class="bg-red-500 text-white px-4 py-2 rounded-md">Delete</button>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    editBook() {

      this.$emit('edit-book', this.book);
    },
    deleteBook() {
      // Emit an event to notify the parent component that the delete button is clicked
      this.$emit('delete-book', this.book);
    },
    formatPrice(price) {
      if (!price) return '';
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  },

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