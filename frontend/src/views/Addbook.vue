<template>
  <div class="add-book">
    <h1>Thêm Sách Mới</h1>
    
    <!-- Kiểm tra nếu chưa đăng nhập, hiển thị thông báo và không cho phép thêm sách -->
    <div v-if="!isLoggedIn" class="login-warning">
      <p>Vui lòng đăng nhập để có quyền thêm sách.</p>
    </div>

    <!-- Form thêm sách chỉ hiển thị khi đã đăng nhập -->
    <form v-if="isLoggedIn" @submit.prevent="addBook">
      <div>
        <label for="MaSach">Mã sách:</label>
        <input id="MaSach" v-model="newBook.MaSach" required />
      </div>
      <div>
        <label for="TenSach">Tên sách:</label>
        <input id="TenSach" v-model="newBook.TenSach" required />
      </div>
      <div>
        <label for="DonGia">Đơn giá:</label>
        <input id="DonGia" type="number" v-model="newBook.DonGia" required />
      </div>
      <div>
        <label for="SoQuyen">Số quyển:</label>
        <input id="SoQuyen" type="number" v-model="newBook.SoQuyen" required />
      </div>
      <div>
        <label for="NamXuatBan">Năm xuất bản:</label>
        <input id="NamXuatBan" type="number" v-model="newBook.NamXuatBan" required />
      </div>

      <!-- Thay vì nhập Mã NXB, chọn từ danh sách nhà xuất bản -->
      <div>
        <label for="MaNXB">Mã NXB:</label>
        <select id="MaNXB" v-model="newBook.MaNXB" required>
          <option v-for="nxb in nhaXuatBanList" :key="nxb.MaNXB" :value="nxb.MaNXB">
            {{ nxb.MaNXB }}
          </option>
        </select>
      </div>
      <div>
        <label for="NguonGoc">Nguồn gốc:</label>
        <input id="NguonGoc" v-model="newBook.NguonGoc" required />
      </div>
      <button type="submit">Thêm sách</button>
    </form>
    
    <!-- Hộp thoại thông báo thêm sách thành công -->
    <div v-if="showSuccessMessage" class="success-message">
      <p>Thêm sách thành công!</p>
      <button @click="closeSuccessMessage">Đóng</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newBook: {
        MaSach: '',
        TenSach: '',
        DonGia: '',
        SoQuyen: '',
        NamXuatBan: '',
        MaNXB: '',
        NguonGoc: ''
      },
      nhaXuatBanList: [], // Lưu danh sách nhà xuất bản
      showSuccessMessage: false, // Trạng thái hiển thị thông báo thành công
      isLoggedIn: false // Kiểm tra trạng thái đăng nhập
    };
  },
  mounted() {
    // Kiểm tra nếu người dùng đã đăng nhập
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true';

    // Nếu người dùng đã đăng nhập, tải danh sách nhà xuất bản
    if (this.isLoggedIn) {
      this.fetchNhaXuatBanList();
    }
  },
  methods: {
    // Gọi API để lấy danh sách nhà xuất bản
    async fetchNhaXuatBanList() {
      try {
        const response = await fetch('http://localhost:3000/api/nhaxuatban');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu nhà xuất bản');
        }
        this.nhaXuatBanList = await response.json(); // Cập nhật danh sách nhà xuất bản
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà xuất bản:', error);
      }
    },
    // Thêm sách mới
    async addBook() {
      try {
        const response = await fetch('http://localhost:3000/api/sach', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newBook)
        });

        if (!response.ok) {
          throw new Error('Lỗi khi thêm sách: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Sách đã được thêm:', result);

        this.showSuccessMessage = true; // Hiển thị thông báo thành công
        this.resetForm();
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    },
    // Reset form sau khi thêm sách
    resetForm() {
      this.newBook = {
        MaSach: '',
        TenSach: '',
        DonGia: '',
        SoQuyen: '',
        NamXuatBan: '',
        MaNXB: '',
        NguonGoc: ''
      };
    },
    // Đóng thông báo thành công và chuyển hướng
    closeSuccessMessage() {
      this.showSuccessMessage = false; // Đóng thông báo
      this.$router.push('/sach'); // Chuyển hướng đến trang danh sách sách
    }
  }
};
</script>

<style scoped>
.add-book {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

/* Kiểm tra trạng thái đăng nhập và hiển thị thông báo */
.login-warning {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input,
select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus,
select:focus {
  border-color: #007bff;
}

button {
  background-color: #007bff;
  color: white;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
}

/* Hộp thoại thông báo thành công */
.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  text-align: center;
}

.success-message button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #155724;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.success-message button:hover {
  background-color: #0c3d14;
}
</style>
