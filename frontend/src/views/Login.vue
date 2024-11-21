<template>
  <div class="login-container">
    <h1>Đăng Nhập Nhân Viên</h1>
    
    <!-- Form Đăng Nhập -->
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="MSNV">Mã Nhân Viên:</label>
        <input type="text" v-model="MSNV" id="MSNV" required autocomplete="username" />
      </div>
      <div class="input-group">
        <label for="password">Mật Khẩu:</label>
        <input type="password" v-model="password" id="password" required autocomplete="current-password" />
      </div>

      <!-- Nút đăng nhập -->
      <button type="submit">Đăng Nhập</button>
    </form>

    <!-- Thông báo lỗi -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MSNV: '',
      password: '',
      errorMessage: '',
      loading: false // Biến trạng thái khi đang tải
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true; // Bắt đầu quá trình đăng nhập

      try {
        // Gửi yêu cầu đến API để kiểm tra thông tin nhân viên
        const response = await fetch(`http://localhost:3000/api/nhanvien/${this.MSNV}`);
        const data = await response.json();

        if (response.ok && data) {
          // Kiểm tra mật khẩu
          if (data.Password === this.password) {
            // Lưu thông tin đăng nhập vào localStorage
            localStorage.setItem('staffLoggedIn', 'true');

            // Kiểm tra xem người dùng đến từ đâu (nếu có thông tin đường dẫn từ query params)
            const redirectTo = this.$route.query.redirectTo || '/sach'; // Nếu không có, redirect về trang sách

            // Chuyển hướng đến trang chi tiết nhân viên hoặc sách
            this.$router.push(redirectTo);
          } else {
            this.errorMessage = 'Mật khẩu không đúng!';
          }
        } else {
          this.errorMessage = 'Mã nhân viên không tồn tại!';
        }
      } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        this.errorMessage = 'Có lỗi xảy ra, vui lòng thử lại sau.';
      } finally {
        this.loading = false; // Kết thúc quá trình đăng nhập
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 20px;
}

.input-group {
  margin: 10px 0;
  text-align: left;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

.forgot-password-link {
  display: block;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-top: 15px;
  font-size: 14px;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
