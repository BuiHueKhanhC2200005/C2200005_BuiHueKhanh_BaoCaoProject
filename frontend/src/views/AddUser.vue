<template>
  <div class="add-user">
    <h1>Thêm Độc Giả Mới</h1>
    <form @submit.prevent="addUser">
      <div>
        <label for="MaDocGia">Mã độc giả:</label>
        <input
          id="MaDocGia"
          v-model="newUser.MaDocGia"
          placeholder="Vui lòng nhập số mã độc giả của bạn"
          required
          @blur="checkMaDocGia"
        />
        <p v-if="!isMaDocGiaValid" class="error-message">
          Mã độc giả phải bắt đầu bằng "Dg" và có 3 chữ số, ví dụ "Dg001".
        </p>
        <p v-if="maDocGiaExists" class="error-message">
          Mã độc giả đã tồn tại, vui lòng nhập mã khác.
        </p>
      </div>
      <div>
        <label for="HoLot">Họ lót:</label>
        <input id="HoLot" v-model="newUser.HoLot" required />
      </div>
      <div>
        <label for="Ten">Tên:</label>
        <input id="Ten" v-model="newUser.Ten" required />
      </div>
      <div>
        <label for="NgaySinh">Ngày sinh:</label>
        <input id="NgaySinh" type="date" v-model="newUser.NgaySinh" required />
      </div>
      <div>
        <label for="Phai">Phái:</label>
        <select id="Phai" v-model="newUser.Phai" required>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      <div>
        <label for="DiaChi">Địa chỉ:</label>
        <input id="DiaChi" v-model="newUser.DiaCHi" required />
      </div>
      <div>
        <label for="DienThoai">Số điện thoại:</label>
        <input id="DienThoai" type="text" v-model="newUser.DienThoai" required />
      </div>
      <p v-if="apiError" class="error-message">{{ apiError }}</p>
      <button type="submit" :disabled="maDocGiaExists || !isMaDocGiaValid">Thêm độc giả</button>
    </form>
    <div v-if="showSuccessMessage" class="success-message">
      <p>Thêm độc giả thành công!</p>
      <button @click="closeSuccessMessage">Đóng</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newUser: {
        MaDocGia: 'Dg', // Mặc định là "Dg"
        HoLot: '',
        Ten: '',
        NgaySinh: '',
        Phai: '',
        DiaCHi: '',
        DienThoai: '',
      },
      showSuccessMessage: false, // Trạng thái hiển thị thông báo thành công
      maDocGiaExists: false, // Kiểm tra mã độc giả tồn tại
      isMaDocGiaValid: true, // Kiểm tra định dạng mã độc giả
      apiError: '', // Lưu lỗi từ API
    };
  },
  methods: {
    checkMaDocGiaFormat() {
      const maDocGiaPattern = /^Dg\d{2,3}$/; // Định dạng "Dg" + 3 chữ số
      this.isMaDocGiaValid = maDocGiaPattern.test(this.newUser.MaDocGia);
    },
    async checkMaDocGia() {
      this.checkMaDocGiaFormat();
      if (!this.isMaDocGiaValid) return;

      try {
        const response = await fetch(`http://localhost:3000/api/docgia/${this.newUser.MaDocGia}`);
        this.maDocGiaExists = response.ok; // Tồn tại nếu response trả về 200
        this.apiError = '';
      } catch (error) {
        console.error('Lỗi khi kiểm tra mã độc giả:', error);
        this.apiError = 'Không thể kiểm tra mã độc giả. Vui lòng thử lại.';
      }
    },
    async addUser() {
      try {
        const response = await fetch('http://localhost:3000/api/docgia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newUser),
        });

        if (!response.ok) {
          throw new Error('Lỗi khi thêm độc giả');
        }

        const result = await response.json();
        console.log('Độc giả đã được thêm:', result);

        this.showSuccessMessage = true;
        this.apiError = '';
        this.resetForm();
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        this.apiError = 'Không thể thêm độc giả. Vui lòng thử lại.';
      }
    },
    resetForm() {
      this.newUser = {
        MaDocGia: 'Dg',
        HoLot: '',
        Ten: '',
        NgaySinh: '',
        Phai: '',
        DiaCHi: '',
        DienThoai: '',
      };
    },
    closeSuccessMessage() {
      this.showSuccessMessage = false;
      this.$router.push('/docgia'); // Chuyển hướng đến trang danh sách độc giả
    },
  },
};
</script>

<style scoped>
/* Giữ nguyên phần style như trước */
.add-user {
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
}

button:hover {
  background-color: #0056b3;
}

button:focus {
  outline: none;
}

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

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
