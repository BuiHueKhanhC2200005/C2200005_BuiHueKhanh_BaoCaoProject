<template>
  <div class="book-detail" v-if="isLoggedIn">
    <h1 v-if="book">{{ book.TenSach }}</h1>

    <!-- Kiểm tra nếu book có dữ liệu -->
    <div v-if="book">
      <div class="book-info">
        <p><strong>Mã sách:</strong> {{ book.MaSach }}</p>
        <p><strong>Đơn giá:</strong> {{ book.DonGia }} VND</p>
        <p><strong>Số quyển:</strong> {{ book.SoQuyen }}</p>
        <p><strong>Năm xuất bản:</strong> {{ book.NamXuatBan }}</p>
        <p><strong>Mã NXB:</strong> {{ book.MaNXB }}</p>
        <p><strong>Nguồn gốc:</strong> {{ book.NguonGoc }}</p>
      </div>
      <div class="button-group">
        <button class="delete-button" @click="confirmDeleteBook">Xóa sách</button>
        <router-link :to="`/sach/update/${book.MaSach}`" class="update-button">Cập nhật sách</router-link>
        <router-link :to="`/addbook`" class="add-button">Thêm sách</router-link>
        <!-- Nút đăng xuất -->
        <button class="logout-button" @click="logout">Đăng Xuất</button>
      </div>
      <button @click="goBack" class="back-button">Quay lại danh sách</button>
    </div>

    <!-- Hiển thị thông báo khi không có dữ liệu -->
    <div v-else>
      <p>Không tìm thấy sách với mã: {{ $route.params.id }}</p>
    </div>
  </div>

  <div v-else>
    <p class="error-message">Vui lòng đăng nhập để xem thông tin sách và thực hiện các thao tác.</p>
    <router-link to="/login">Đăng nhập</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: null, // Dữ liệu sách sẽ được lấy từ API
      isLoggedIn: false // Kiểm tra đăng nhập
    };
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true'; // Kiểm tra nếu người dùng đã đăng nhập
    if (!this.isLoggedIn) {
      this.$router.push('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    } else {
      const bookId = this.$route.params.id;

      // Kiểm tra nếu bookId không có trong URL thì chuyển hướng về danh sách sách
      if (!bookId) {
        this.$router.push('/sach');
        return;
      }

      // Gọi API để lấy chi tiết sách
      this.fetchBook(bookId);
    }
  },
  methods: {
    async fetchBook(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/sach/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            this.book = data; // Nếu có dữ liệu, gán cho book
          } else {
            console.error('Không tìm thấy sách với mã:', id);
            this.book = null; // Nếu không tìm thấy sách, gán null
          }
        } else {
          console.error('Lỗi từ server khi lấy thông tin sách:', response.status);
          this.book = null; // Nếu lỗi từ server
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết sách:', error);
        this.book = null; // Đảm bảo book là null nếu có lỗi
      }
    },
    confirmDeleteBook() {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sách này?");
      if (confirmDelete) {
        this.deleteBook();
      }
    },
    async deleteBook() {
      const bookId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/sach/${bookId}`, {
          method: "DELETE"
        });
        if (!response.ok) throw new Error("Lỗi khi xóa sách");
        alert("Sách đã được xóa thành công");
        this.$router.push("/sach"); // Chuyển hướng về trang danh sách sách sau khi xóa
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
        alert(error.message); // Thông báo lỗi cho người dùng
      }
    },
    logout() {
      // Xóa thông tin đăng nhập và chuyển hướng về trang đăng nhập
      localStorage.removeItem('staffLoggedIn');
      this.$router.push('/login');
    },
    goBack() {
      // Quay lại trang danh sách nhà xuất bản
      this.$router.push('/sach');
    }
  }
};
</script>


<style scoped>
.book-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  font-size: 26px;
  color: #007bff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.book-info {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.book-info p {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.book-info strong {
  color: #007bff;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

button,
a {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
}

button {
  border: none;
}

.add-button {
  background-color: #28a745;
  color: white;
  text-decoration: none;
}

.add-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.update-button {
  background-color: #17a2b8;
  color: white;
  text-decoration: none;
}

.update-button:hover {
  background-color: #138496;
  transform: scale(1.05);
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}

.logout-button {
  background-color: #d9534f;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c9302c;
  transform: scale(1.05);
}

.error-message {
  color: #d9534f;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .book-detail {
    padding: 15px;
    font-size: 14px;
  }

  .book-info {
    padding: 10px;
  }

  .button-group {
    flex-direction: column;
    gap: 15px;
  }

  button,
  a {
    width: 100%;
    font-size: 14px;
  }
}

.back-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>
