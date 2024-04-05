<template>
  <div class="bg-white p-8 w-full">
    <h2 class=" text-center mt-6 mb-6  font-bold tracking-tight text-gray-900 dark:text-white text-4xl">Các Giao Dịch Mượn Sách</h2>
    <ul v-if="transactions.length > 0" class="grid grid-cols-3 gap-5">
      <li v-for="(transaction, index) in transactions" :key="index" class="">
        <div class="border-4 border-gray-200 rounded-lg p-5">
          <label for="userID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Người Mượn:</label>
          <input
                  id="userID"
                  required
                  type="text"
                  :value="user.fullname"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                  readonly
              />
            <label for="bookID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sách Mượn:</label>
              <input
                  id="bookID"
                  required
                  type="text"
                  :value="getBookTitle(transaction.bookId)"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                  readonly
              />
              <label for="borrowDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày Mượn:</label>
              <input
                  id="borrowDate"
                  required
                  type="text"
                  :value="formatDate(transaction.borrowDate)"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                  readonly
              />
              <label for="returnDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày Trả:</label>
              <input
                  id="returnDate"
                  required
                  type="text"
                  :value="formatDate(transaction.returnDate)"
                  class="border border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
                  readonly
              />
              <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trạng Thái:</label>
              <input
                  id="status"
                  required
                  type="text"
                  :value="transaction.status"
                  class="border font-bold text-bold border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline "
                  :class="{'text-red-500' : transaction.status ==`Đang Chờ Xác Nhận` ,
                    'text-green-500' : transaction.status ==`Đang Mượn`
                  }"
                  readonly
              />

          <!-- <p>Đã Trả: {{ transaction.returned ? 'Đã trả' : 'Chưa trả' }}</p> -->
        
          <button @click="deleteTransaction(transaction._id, transaction.bookId)" id="returnBtn" class=" text-white px-4 py-2 bg-red-800 hover:opacity-50 mr-2 mx-10 mt-5 text-center">Trả Sách</button>
        </div>
      </li>
    </ul>
    <p v-else>Không có giao dịch mượn sách nào.</p>
  </div>
</template>

<script>
import { api } from "../BookApp/Api";

export default {
  name: "BorrowManager",
  data() {
    return {
      transactions: [],
      books: {}, // Object để lưu trữ thông tin sách
      user: {}
    };
  },
  mounted() {
    this.fetchTransactions(); 
    this.fetchUser();
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await api.get(`user/book/borrow/manager/${this.$route.params.id}`);
        this.transactions = response.data; 
        await Promise.all(this.transactions.map(async transaction => {
          this.fetchBook(transaction.bookId);
        }));
      } catch (error) {
        console.error('Lỗi khi lấy các giao dịch:', error);
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
    async fetchBook(bookId) {
      try {
        const response = await api.get(`user/book/${bookId}`);
        this.books[bookId] = response.data.title;
      } catch (error) {
        console.error('Error fetching Book:', error);
      }
    },
    getBookTitle(bookId) {
      return this.books[bookId] || ''; 
    },
    async deleteTransaction(transactionId, bookId) {
      const confirmDelete = confirm('Bạn có chắc chắn muốn trả sách này?');
      if (!confirmDelete) return;
      try {
        const response = await api.delete(`user/book/borrow/${transactionId}`);
        this.fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
  }
};
</script>
  
<style scoped>
#returnBtn{
  width:70%;
}
</style>
