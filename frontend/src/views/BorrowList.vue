<template>
  <div class="borrowed-books" v-if="isLoggedIn">
    <h1>Danh sách mượn sách</h1>

    <!-- Kiểm tra nếu có dữ liệu mượn sách -->
    <div v-if="borrowedBooks.length">
      <table>
        <thead>
          <tr>
            <th>Mã Độc Giả</th>
            <th>Mã Sách</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th> <!-- Cột Ngày Trả -->
            <th>Trạng Thái</th> <!-- Cột Trạng Thái -->
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in borrowedBooks" :key="record._id">
            <td>{{ record.MaDocGia }}</td>
            <td>{{ record.MaSach }}</td>
            <td>{{ new Date(record.NgayMuon).toLocaleDateString() }}</td>

            <td>
              <!-- Hiển thị Ngày Trả nếu có -->
              <span v-if="record.NgayTra">
                {{ new Date(record.NgayTra).toLocaleDateString() }}
              </span>
              <span v-else>Chưa trả</span>
            </td>

            <!-- Cột Trạng Thái -->
            <td>
              <!-- Trạng thái trả sách đúng hạn -->
              <span v-if="record.NgayTra">
                {{ isReturnedOnTime(record.NgayMuon, record.NgayTra) ? "Đã trả đúng hạn" : "Quá hạn" }}
              </span>
              <span v-else>Chưa trả</span>
            </td>

            <td><button @click="deleteBorrowRecord(record._id)">Xóa</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>Không có bản ghi nào.</p>

    <!-- Nút đăng xuất -->
    <button class="logout-button" @click="logout">Đăng Xuất</button>
  </div>

  <div v-else>
    <p class="error-message">Vui lòng đăng nhập để xem danh sách mượn sách.</p>
    <router-link to="/login">Đăng nhập</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borrowedBooks: [],
      isLoggedIn: false, // Kiểm tra đăng nhập
    };
  },
  async mounted() {
    // Kiểm tra trạng thái đăng nhập
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true';

    if (!this.isLoggedIn) {
      this.$router.push('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      return;
    }

    await this.fetchBorrowedBooks(); // Nếu đã đăng nhập, tải danh sách mượn sách
  },
  methods: {
    async fetchBorrowedBooks() {
      try {
        const response = await fetch('http://localhost:3000/api/theodoimuonsach/danh-sach-muon');
        if (response.ok) {
          this.borrowedBooks = await response.json();
        } else {
          console.error('Lỗi khi lấy danh sách mượn sách:', response.status);
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách mượn sách:', error);
      }
    },

    // Hàm tính toán xem sách trả đúng hạn hay không
    isReturnedOnTime(ngayMuon, ngayTra) {
      const maxReturnDate = new Date(ngayMuon);
      maxReturnDate.setDate(maxReturnDate.getDate() + 30); // Ngày trả tối đa là 30 ngày sau ngày mượn

      const returnDate = new Date(ngayTra);
      return returnDate <= maxReturnDate; // Kiểm tra nếu ngày trả <= ngày tối đa
    },

    async deleteBorrowRecord(id) {
      if (!confirm("Bạn có chắc chắn muốn xóa bản ghi này?")) return;

      try {
        const response = await fetch(`http://localhost:3000/api/theodoimuonsach/xoa-muon-sach/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          console.error('HTTP Error:', response.status);
          const text = await response.text();
          console.error('Response Text:', text);
          alert('Không thể xóa bản ghi. Kiểm tra lại URL API.');
          return;
        }

        const data = await response.json();
        alert('Xóa bản ghi thành công');
        this.borrowedBooks = this.borrowedBooks.filter(record => record._id !== id);
      } catch (error) {
        console.error('Lỗi khi xóa bản ghi mượn sách:', error);
        alert('Lỗi khi xóa bản ghi mượn sách');
      }
    },

    logout() {
      // Xóa thông tin đăng nhập và chuyển hướng về trang đăng nhập
      localStorage.removeItem('staffLoggedIn');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.borrowed-books {
  padding: 20px;
}

h1 {
  font-size: 24px;
  color: #007bff;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 5px 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #c9302c;
}

.logout-button {
  background-color: #d9534f;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.logout-button:hover {
  background-color: #c9302c;
}
</style>
