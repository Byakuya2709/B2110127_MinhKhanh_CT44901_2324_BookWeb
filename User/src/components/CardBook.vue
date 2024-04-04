<template>



  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

    <div id="cardBook" class="flex flex-col items-center ">
     <slot></slot>
     <div class="">
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ book.title }}</h5>
      <p class="text-sm text-gray-500 dark:text-gray-400 p-1">Nhà xuất bản: {{ book.publisher }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400 p-1">Giá: {{ formatPrice(book.price) }}</p>
      <!-- <span class="text-sm text-gray-500 dark:text-gray-400">Ngày Phát hành: {{ formatDate(book.publicationDate)}}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">Số lượng: {{ book.available }}</span> -->
      <div class="flex mt-4 md:mt-6">
        <button @click="viewBook" id="buttonBook" class=" text-white px-4 py-2 bg-gray-800 hover:opacity-50 mr-2">Xem</button>
      </div>
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
    viewBook() {
      this.$emit('view-book', this.book);
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
#cardBook {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
#buttonBook{
  width: 80%;
}
</style>