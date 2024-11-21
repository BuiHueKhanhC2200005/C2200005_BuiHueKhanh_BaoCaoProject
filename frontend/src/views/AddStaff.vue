<template>
  <div class="add-staff">
    <h1>Thêm Nhân Viên Mới</h1>
    <form @submit.prevent="addStaff">
      <div>
        <label for="MSNV">Mã số nhân viên:</label>
        <input id="MSNV" v-model="newStaff.MSNV" required />
      </div>
      <div>
        <label for="HoTenNV">Họ tên nhân viên:</label>
        <input id="HoTenNV" v-model="newStaff.HoTenNV" required />
      </div>
      <div>
        <label for="Password">Mật khẩu:</label>
        <input id="Password" type="password" v-model="newStaff.Password" required />
      </div>
      <div>
        <label for="Chucvu">Chức vụ:</label>
        <input id="Chucvu" v-model="newStaff.Chucvu" required />
      </div>
      <div>
        <label for="Diachi">Địa chỉ:</label>
        <input id="Diachi" v-model="newStaff.Diachi" required />
      </div>
      <div>
        <label for="SoDienThoai">Số điện thoại:</label>
        <input id="SoDienThoai" type="text" v-model="newStaff.SoDienThoai" required />
      </div>
      <button type="submit">Thêm nhân viên</button>
    </form>
    
    <!-- Hộp thoại thông báo thêm nhân viên thành công -->
    <div v-if="showSuccessMessage" class="success-message">
      <p>Thêm nhân viên thành công!</p>
      <button @click="closeSuccessMessage">Đóng</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newStaff: {
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
  methods: {
    // Thêm nhân viên
    async addStaff() {
      try {
        const response = await fetch('http://localhost:3000/api/nhanvien', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newStaff)
        });

        if (!response.ok) {
          throw new Error('Lỗi khi thêm nhân viên: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Nhân viên đã được thêm:', result);

        this.showSuccessMessage = true; // Hiển thị thông báo thành công
        this.resetForm();
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    },
    // Làm mới form sau khi thêm
    resetForm() {
      this.newStaff = {
        MSNV: '',
        HoTenNV: '',
        Password: '',
        Chucvu: '',
        Diachi: '',
        SoDienThoai: ''
      };
    },
    // Đóng thông báo thành công và chuyển hướng đến trang danh sách nhân viên
    closeSuccessMessage() {
      this.showSuccessMessage = false; // Đóng thông báo
      this.$router.push('/nhanvien'); // Chuyển hướng đến trang danh sách nhân viên
    }
  }
};
</script>

<style scoped>
.add-staff {
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
