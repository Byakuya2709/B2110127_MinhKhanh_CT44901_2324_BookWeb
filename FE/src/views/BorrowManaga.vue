<template>
  <div class="bg-white p-8 w-full">
    <h2 class="text-center mt-6 mb-6 font-bold tracking-tight text-gray-900 dark:text-white text-4xl">Các Giao Dịch Mượn Sách</h2>
    <ul v-if="transactions.length > 0" class="grid grid-cols-3 gap-5">
      <li v-for="(transaction, index) in transactions" :key="index" class="">
        <div class="border-4 border-gray-200 rounded-lg p-5">
          <label for="userID" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Người Mượn:</label>
          <input
            id="userID"
            required
            type="text"
            :value="getUserFullName(transaction.userId)"
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
            class="border font-bold border-gray-300 rounded w-full py-2 px-4 focus:shadow-outline"
            :class="{
              'text-red-500': transaction.status === 'Đang Chờ Xác Nhận',
              'text-green-500': transaction.status === 'Đang Mượn'
            }"
            readonly
          />

          <div>
            <button @click="updateTransaction(transaction._id)" class="text-white px-4 py-2 bg-blue-800 hover:opacity-50 mr-2 mx-10 mt-5 text-center">Xác Nhận</button>
            <button @click="deleteTransaction(transaction._id, transaction.bookId)" class="text-white px-4 py-2 bg-red-800 hover:opacity-50 mr-2 mx-10 mt-5 text-center">Từ Chối</button>
          </div>
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
      users: {}
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const response = await api.get(`/manager/borrow`);
        this.transactions = response.data;
        await Promise.all(this.transactions.map(async transaction => {
          await this.fetchUserData(transaction.userId);
          await this.fetchBookData(transaction.bookId);
        }));
      } catch (error) {
        console.error('Lỗi khi lấy các giao dịch:', error);
      }
    },
    async fetchUserData(userId) {
      try {
        const response = await api.get(`/manager/user/${userId}`);
        this.users[userId] = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async fetchBookData(bookId) {
      try {
        const response = await api.get(`manager/book/${bookId}`);
        this.books[bookId] = response.data.title;
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    },
    getBookTitle(bookId) {
      return this.books[bookId] || ''; 
    },
    getUserFullName(userId) {
      const user = this.users[userId];
      return user ? user.fullname : ''; 
    },
    async deleteTransaction(transactionId, bookId) {
      const confirmDelete = confirm('Bạn có chắc chắn muốn từ chối yêu cầu mượn sách này?');
      if (!confirmDelete) return;
      try {
        const response = await api.delete(`user/book/borrow/${transactionId}`);
        this.fetchTransactions();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    },
    async updateTransaction(transactionId) {
      const confirmUpdate = confirm('Bạn có muốn xác nhận yêu cầu mượn sách này?');
      if (!confirmUpdate) return;
      try {
        const response = await api.patch(`manager/borrow/update/${transactionId}`, { status: "Đang Mượn" });
        this.fetchTransactions();
      } catch (error) {
        console.error('Error updating transaction:', error);
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

</style>
