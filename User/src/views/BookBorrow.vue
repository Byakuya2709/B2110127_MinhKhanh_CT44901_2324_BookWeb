<template>
  <div class="bg-white p-8 w-full">
    <Alert :show="alert.show" :type="alert.type" :message="alert.message" @close-alert="hideAlert" />
      <h1 class="text-gray-700 text-3xl text-center">Mượn Sách</h1>
      <form @submit.prevent="borrowBook">
          <div class="my-3">
              <label for="userID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Người Mượn:</label>
              <input
                  id="userIDUser"
                  required
                  type="text"
                  :value="user.fullname"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                  readonly
              />
          </div>
          <div class="my-3">
              <label for="bookID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sách Mượn:</label>
              <input
                  id="bookID"
                  required
                  type="text"
                  :value="book.title"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                  readonly
              />
            
                <!-- <img class="w-50 h-40 m-3 shadow-lg" :src="`../../public/Books/${book.title}.png`" alt="Book image" /> -->
              
          </div>
          <div class="my-3">
        <label for="userID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày Mượn:</label>
        <input
          id="userID"
          required
          type="text"
          :value="formatDate(new Date())"
          class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
          readonly
        />
       </div>
          <div class="my-3">
              <label for="returnDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày Trả:</label>
              <input
                  id="returnDate"
                  required
                  v-model="returnDate"
                  type="date"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
              />
              <p v-if="!isValidated" class="px-4 text-red-500 text-sm mt-1">Vui lòng chọn ngày trả.( Ngày trả phải lớn hơn ngày hiện tại.)</p>
          </div>
          <div class="my-3 flex justify-center items-center">
            <button type="submit" :disabled="!isValidated" class="rounded-full bg-blue-600 border-blue-600 px-8 py-2 text-white w-1/2 active:true:hover:bg-violet-600 disabled:opacity-25">
              Mượn Sách
          </button>
          </div>
         
      </form>
  </div>
</template>

<script>
import { api } from "../BookApp/Api";
import Alert from '../components/Alert.vue'
export default {
    components: {
    Alert
  },
  data() {
      return {
          book: {},
          user: {},
          returnDate: "",
          validated: false,
          alert: {
          show: false,
          type: '',
          message: '',
        },
      };
  },
  computed: {
      isValidated() {
          return this.validated;
      },
  },
  watch: {
      returnDate(value) {
          this.validate(value);
      }
  },
  methods: {
      async borrowBook() {
        const data ={
            userId: this.user._id,
            bookId :this.book._id,
            returnDate:this.returnDate,
        }
        console.log(data.bookId)
        try {
            const response = await api.post(`user/book/borrow`,data);
            if (response.status==201){
            this.showAlert('Success', `Mượn sách thành công.`);
             setTimeout(() => {
              this.hideAlert();
              }, 2000);
             
          }
          } catch (error) {
            console.log(error)
            this.showAlert('Error',error.response.data.message);
          }
      },
      async fetchBook() {
          try {
              const response = await api.get(`user/book/${this.$route.params.id}`);
              this.book = response.data;
          } catch (error) {
              console.error('Error fetching Book:', error);
          }
      },
      async fetchUser() {
          try {
              const response = await api.get('/user/profile');
              this.user = response.data;
          } catch (error) {
              console.error('Error fetching user:', error);
          }
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      validate(value) {
          // Check if returnDate is in the future
          this.validated = new Date(value) > new Date();
      },
      showAlert(type, message) {
      this.alert = {
        show: true,
        type: type,
        message: message,
      }
    },
    hideAlert(){
      this.alert.show=false;
    }
  },
  mounted() {
      this.fetchUser();
      this.fetchBook();
  }
};
</script>
