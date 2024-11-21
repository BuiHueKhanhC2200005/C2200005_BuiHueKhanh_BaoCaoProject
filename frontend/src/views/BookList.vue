<template>
  <div class="book-list">
    <h1>Danh sách Sách</h1>
    <div class="book-cards">

      <div v-for="book in books" :key="book.MaSach" class="book-card">
        <router-link :to="{ name: 'BookDetail', params: { id: book.MaSach } }" class="book-link">
          <h2>{{ book.TenSach }}</h2>
            <p><strong>Mã sách:</strong> {{ book.MaSach }}</p>
            <p><strong>Đơn giá:</strong> {{ book.DonGia }} VND</p>
            <p><strong>Số quyển:</strong> {{ book.SoQuyen }}</p>
            <p><strong>Năm xuất bản:</strong> {{ book.NamXuatBan }}</p>
            <p><strong>Mã NXB:</strong> {{ book.MaNXB }}</p>
            <p><strong>Nguồn gốc:</strong> {{ book.NguonGoc }}</p>
            <p class="book-price">{{ book.DonGia }} VND</p>
        </router-link>
        <button @click="borrowBook(book)" class="borrow-button">Mượn sách</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [] // Dữ liệu sách sẽ được lấy từ API
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await fetch('http://localhost:3000/api/sach');
        this.books = await response.json();
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách sách:', error);
      }
    },
    borrowBook(book) {
      // Chuyển đến trang Mượn Sách và truyền thông tin sách cần mượn
      this.$router.push({ name: 'BorrowBook', query: { bookId: book.MaSach } });
    }
  }
};
</script>

<style scoped>
.book-list {
  padding: 20px;
  text-align: center;
}

.book-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}


.add-book-link {
  color: #007bff;
  text-decoration: none;
}

.book-card {
  border: 1px solid #ddd;
  padding: 20px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

.book-link {
  text-decoration: none;
  color: #333;
}

.book-card h2 {
  font-size: 18px;
  color: #007bff;
}

.book-price {
  font-weight: bold;
  color: #e91e63;
  font-size: 16px;
  margin-bottom: 15px;
}

.borrow-button {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.borrow-button:hover {
  background-color: #218838;
}
</style>
