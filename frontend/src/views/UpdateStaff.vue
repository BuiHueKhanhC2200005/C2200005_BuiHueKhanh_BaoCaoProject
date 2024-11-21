<template>
  <div class="update-staff">
    <h1>Cập nhật thông tin nhân viên</h1>
    <form @submit.prevent="updateStaff">
      <div>
        <label for="MSNV">Mã số nhân viên:</label>
        <input id="MSNV" v-model="staff.MSNV" disabled />
      </div>
      <div>
        <label for="HoTenNV">Họ tên nhân viên:</label>
        <input id="HoTenNV" v-model="staff.HoTenNV" required />
      </div>
      <div>
        <label for="Password">Mật khẩu:</label>
        <input id="Password" type="password" v-model="staff.Password" required />
      </div>
      <div>
        <label for="Chucvu">Chức vụ:</label>
        <input id="Chucvu" v-model="staff.Chucvu" required />
      </div>
      <div>
        <label for="Diachi">Địa chỉ:</label>
        <input id="Diachi" v-model="staff.Diachi" required />
      </div>
      <div>
        <label for="SoDienThoai">Số điện thoại:</label>
        <input id="SoDienThoai" type="text" v-model="staff.SoDienThoai" required />
      </div>
      <button type="submit">Cập nhật nhân viên</button>
    </form>
    
    <!-- Hộp thoại thông báo cập nhật thành công -->
    <div v-if="showSuccessMessage" class="success-message">
      <p>Cập nhật thông tin nhân viên thành công!</p>
      <button @click="closeSuccessMessage">Đóng</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  data() {
    return {
      staff: {
        MSNV: '',
        HoTenNV: '',
        Password: '',
        Chucvu: '',
        Diachi: '',
        SoDienThoai: ''
      },
      showSuccessMessage: false // Trạng thái hiển thị thông báo thành công
    };
  },
  mounted() {
    // Lấy thông tin nhân viên từ API khi trang được tải
    this.fetchStaff();
  },
  methods: {
    // Lấy thông tin nhân viên từ API
    async fetchStaff() {
      const MSNV = this.$route.params.id; // Lấy MSNV từ URL
      try {
        const response = await fetch(`http://localhost:3000/api/nhanvien/${MSNV}`);
        if (!response.ok) {
          throw new Error('Không thể lấy thông tin nhân viên');
        }
        const data = await response.json();
        this.staff = data;
      } catch (error) {
        console.error('Lỗi khi lấy thông tin nhân viên:', error);
      }
    },

    // Cập nhật thông tin nhân viên
    async updateStaff() {
      try {
        const updatedData = {
          HoTenNV: this.staff.HoTenNV,
          Password: this.staff.Password,
          Chucvu: this.staff.Chucvu,
          Diachi: this.staff.Diachi,
          SoDienThoai: this.staff.SoDienThoai
        };

        // Gửi yêu cầu PUT với dữ liệu cần cập nhật
        const response = await fetch(`http://localhost:3000/api/nhanvien/${this.staff.MSNV}`, {
          method: 'PUT',  // Sử dụng phương thức PUT để cập nhật
          headers: {
            'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
          },
          body: JSON.stringify(updatedData),  // Dữ liệu cần cập nhật, chuyển sang chuỗi JSON
        });

        if (!response.ok) {
          throw new Error(`Lỗi khi cập nhật nhân viên: ${response.statusText}`);
        }

        const data = await response.json(); // Dữ liệu trả về từ server
        console.log('Cập nhật nhân viên thành công:', data);

        // Hiển thị thông báo thành công
        this.showSuccessMessage = true;
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        alert('Lỗi khi cập nhật nhân viên: ' + error.message);
      }
    },

    // Đóng thông báo thành công
    closeSuccessMessage() {
      this.showSuccessMessage = false;
      this.$router.push('/nhanvien');
    }
  }
};
</script>

<style scoped>
.update-staff {
  max-width: 500px;
  margin: 0 auto;
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

form {
  display: flex;
  flex-direction: column;
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
