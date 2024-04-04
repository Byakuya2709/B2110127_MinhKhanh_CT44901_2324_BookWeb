<template>
    <div id="bookView" class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div id="cardBook" class="flex flex-col items-center">

        <div id="bookTitle" class="flex">
          <h5 class="mb-6 text-5xl  font-bold text-gray-900 dark:text-white">{{ book.title }}</h5>
          
          <p class="text-xl mb-3 italic text-gray-500 dark:text-gray-400 p-1">Nhà xuất bản: {{ book.publisher }}</p>
          <p class="text-xl mb-3 italic text-gray-500 dark:text-gray-400 p-1">Giá: {{ formatPrice(book.price) }}</p>
          <p class="text-xl mb-3 italic text-gray-500 dark:text-gray-400">Ngày Phát hành: {{ formatDate(book.publicationDate)}}</p>
          <p class="text-xl mb-3 italic text-gray-500 dark:text-gray-400">Số lượng: {{ book.available }}</p>
          <div class="flex mt-4 md:mt-6">
            <button @click="borrowBook" id="buttonBook" class="text-white px-4 py-2 bg-gray-800 hover:opacity-50 mr-2">Mượn Sách</button>
          </div>
        </div>
        <div>
            <img id="image" class="w-80 h-50 m-10 shadow-lg" :src="`../../public/Books/${book.title}.png`" alt="Book image" />

        </div>
      </div>
    </div>
  </template>
  
  <script>
  import {api} from "../BookApp/Api"
  export default {
    data() {
      return {
        book: {
          title: '',
          publisher: '',
          price: 0,
          publicationDate: '',
          available: 0
        }
      };
    },
    mounted() {
      this.retrieve();
    },
    methods: {
      async retrieve() {
        try {
          const response = await api.get(`/user/book/${this.$route.params.id}`);
          console.log(response);
          this.book = response.data; // Assign retrieved book data to the 'book' data property
  
        } catch (error) {
          console.error('Error fetching Books:', error);
        }
      },
      borrowBook() {
        // Implement the functionality to handle borrowing the book.
        console.log("Borrow book clicked");
        // You can add your logic here to handle borrowing the book, such as calling an API to update the book's status.
      },
      formatPrice(price) {
        if (!price) return '';
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      }
    }
  };
  </script>
  
  <style>
  #cardBook {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #buttonBook {
    width: 80%;
  }
  #bookView{
    height: 90%;
  }
  #bookTitle{
    flex-direction: column;
    margin: auto;
  }

  </style>
  