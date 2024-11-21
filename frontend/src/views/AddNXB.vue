<template>
  <div class="add-nxb">
    <h1>Thêm Nhà Xuất Bản Mới</h1>

    <!-- Kiểm tra nếu chưa đăng nhập, hiển thị thông báo và không cho phép thêm nhà xuất bản -->
    <div v-if="!isLoggedIn" class="login-warning">
      <p>Vui lòng đăng nhập để có quyền thêm nhà xuất bản.</p>
    </div>

    <!-- Form thêm nhà xuất bản chỉ hiển thị khi đã đăng nhập -->
    <form v-if="isLoggedIn" @submit.prevent="addNhaXuatBan">
      <div>
        <label for="MaNXB">Mã Nhà Xuất Bản:</label>
        <input id="MaNXB" v-model="newNhaXuatBan.MaNXB" required />
      </div>
      <div>
        <label for="TenNXB">Tên Nhà Xuất Bản:</label>
        <input id="TenNXB" v-model="newNhaXuatBan.TenNXB" required />
      </div>
      <div>
        <label for="DiaChi">Địa Chỉ:</label>
        <input id="DiaChi" v-model="newNhaXuatBan.DiaChi" required />
      </div>
      <button type="submit">Thêm Nhà Xuất Bản</button>
    </form>

    <!-- Hộp thoại thông báo thêm thành công -->
    <div v-if="showSuccessMessage" class="success-message">
      <p>Thêm nhà xuất bản thành công!</p>
      <button @click="closeSuccessMessage">Đóng</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNhaXuatBan: {
        MaNXB: '',
        TenNXB: '',
        DiaChi: ''
      },
      showSuccessMessage: false, // Trạng thái hiển thị thông báo thành công
      isLoggedIn: false // Kiểm tra trạng thái đăng nhập
    };
  },
  mounted() {
    // Kiểm tra nếu người dùng đã đăng nhập
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true';
  },
  methods: {
    async addNhaXuatBan() {
      try {
        const response = await fetch('http://localhost:3000/api/nhaxuatban', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newNhaXuatBan)
        });

        if (!response.ok) {
          throw new Error('Lỗi khi thêm nhà xuất bản: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Nhà xuất bản đã được thêm:', result);

        this.showSuccessMessage = true; // Hiển thị thông báo thành công
        this.resetForm();
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    },
    resetForm() {
      this.newNhaXuatBan = {
        MaNXB: '',
        TenNXB: '',
        DiaChi: ''
      };
    },
    closeSuccessMessage() {
      this.showSuccessMessage = false; // Đóng thông báo
      this.$router.push('/nhaxuatban'); // Chuyển hướng đến trang danh sách nhà xuất bản
    }
  }
};
</script>

<style scoped>
.add-nxb {
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

input {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
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
