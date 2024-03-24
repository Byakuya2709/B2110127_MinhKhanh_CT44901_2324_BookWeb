<template>
    <div class="container mx-auto mt-8">
      <!-- Alert component to show messages -->
      <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
      
      <!-- Search component -->
      <Search @search="handleSearch" @clearSearch="clearSearchInput"/>
      <div class="flex justify-center">
      <p class=" mt-6 mb-6  font-bold tracking-tight text-gray-900 dark:text-white text-4xl">Sách</p>
    </div>
      <div>
        <div v-if="filteredBook.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Displaying books -->
          <BookCard v-for="(book, index) in filteredBook" :key="index" :book="book" @edit-book="editBook" @delete-book="deleteBook">
            <img class="w-50 h-40 mb-3 shadow-lg" :src="`../../public/Books/book${index}.jpg`" alt="Book image" />
        </BookCard>
        </div>
        <div v-else>
          <p>No Books found.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BookCard from "../../components/CardBook.vue";
  import { api } from '../../BookApp/Api';
  import Search from '../../components/Search.vue';
  import Alert from '../../components/Alert.vue';
  
  export default {
    components: {
      BookCard,
      Search,
      Alert
    },
    data() {
      return {
        searchTerm: '', 
        books: [],
        alert: {
          show: false,
          type: '',
          message: '',
        },
      };
    },
    async created() {
      await this.fetchBook(); // Fetch books when the component is created
    },
    computed: {
      // Filter books based on search term
      filteredBook() {
        if (!this.searchTerm) {
          return this.books;
        }
        return this.books.filter(book => {
          return book.title.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase());
        });
      },
    },
    methods: {
      // Fetch books from the API
      async fetchBook() {
        try {
          const response = await api.get('/manager/book');
          this.books = response.data;
        } catch (error) {
          console.error('Error fetching book:', error);
        }
      },
      // Handle editing a book
      editBook(book) {
        try {
        
        this.$router.push({ name: 'EditBook', params: { id: book._id } });
      } catch (error) {
        console.error('Error editing book:', error);
      }
      },

      async deleteBook(book) {
        try {
          const confirmDelete = confirm('Bạn có chắc chắn muốn xóa sách này?');
          if (!confirmDelete) return;
          
          const response = await api.delete(`/manager/book/${book._id}`);
          if (response.status === 201) {
            this.showAlert('Success', 'Xóa thành công');
            setTimeout(() => {
              this.hideAlert();
            }, 2000);
            this.books = this.books.filter(p => p._id !== book._id);
          }
        } catch (error) {
          this.showAlert('Error', error.response.data.message);
        }
      },
      // Handle search term input
      handleSearch(searchTerm) {
        this.searchTerm = searchTerm;
      },
      // Clear search input
      clearSearchInput() {
        this.searchTerm = '';
      },
      // Show alert message
      showAlert(type, message) {
        this.alert = {
          show: true,
          type: type,
          message: message,
        }
      },
      // Hide alert message
      hideAlert() {
        this.alert.show = false;
      }
    },
  };
  </script>
  
  <style>
  /* Add your custom styles here */
  </style>
  