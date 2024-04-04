<template>
  <div class="bg-white p-8 w-full">
    <h2 class="text-gray-700 text-3xl text-center">Các Giao Dịch Mượn Sách</h2>
    <ul v-if="transactions.length > 0">
      <li v-for="(transaction, index) in transactions" :key="index">
        <div>
          <p>ID Người Dùng: {{ user.fullname }}</p>
          <p>ID Sách: {{ getBookTitle(transaction.bookId) }}</p>
          <p>Ngày Mượn: {{ formatDate(transaction.borrowDate) }}</p>
          <p>Ngày Trả: {{ formatDate(transaction.returnDate) }}</p>
          <p>Đã Trả: {{ transaction.returned ? 'Đã trả' : 'Chưa trả' }}</p>
          <p>Trạng Thái: {{ transaction.status }}</p>
          <button @click="deleteTransaction(transaction._id, transaction.bookId)">Xóa</button>
        </div>
        <hr>
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
      const confirmDelete = confirm('Bạn có chắc chắn muốn xóa giao dịch mượn sách này?');
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
/* Add custom styles here if needed */
</style>
