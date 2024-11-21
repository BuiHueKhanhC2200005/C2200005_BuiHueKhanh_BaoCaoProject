<template>
  <div class="update-user">
    <h1>Cập nhật thông tin độc giả</h1>
    <form @submit.prevent="updateUser">
      <div>
        <label for="MaDocGia">Mã độc giả:</label>
        <input id="MaDocGia" v-model="user.MaDocGia" disabled />
      </div>
      <div>
        <label for="HoLot">Họ lót:</label>
        <input id="HoLot" v-model="user.HoLot" required />
      </div>
      <div>
        <label for="Ten">Tên:</label>
        <input id="Ten" v-model="user.Ten" required />
      </div>
      <div>
        <label for="NgaySinh">Ngày sinh:</label>
        <input id="NgaySinh" type="date" v-model="user.NgaySinh" required />
      </div>
      <div>
        <label for="Phai">Phái:</label>
        <select id="Phai" v-model="user.Phai" required>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>
      <div>
        <label for="DiaChi">Địa chỉ:</label>
        <input id="DiaChi" v-model="user.DiaChi" required />
      </div>
      <div>
        <label for="DienThoai">Điện thoại:</label>
        <input id="DienThoai" type="text" v-model="user.DienThoai" required />
      </div>
      <button type="submit">Cập nhật độc giả</button>
    </form>

    <!-- Hộp thoại thông báo cập nhật thành công -->
    <div v-if="showSuccessMessage" class="success-message">
      <p>Cập nhật thông tin độc giả thành công!</p>
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
      user: {
        MaDocGia: '',
        HoLot: '',
        Ten: '',
        NgaySinh: '',
        Phai: '',
        DiaChi: '',
        DienThoai: ''
      },
      showSuccessMessage: false
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const MaDocGia = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/docgia/${MaDocGia}`);
        if (!response.ok) {
          throw new Error('Không thể lấy thông tin độc giả');
        }
        const data = await response.json();
        this.user = data;
      } catch (error) {
        console.error('Lỗi khi lấy thông tin độc giả:', error);
      }
    },

    async updateUser() {
      try {
        const updatedData = {
          HoLot: this.user.HoLot,
          Ten: this.user.Ten,
          NgaySinh: this.user.NgaySinh,
          Phai: this.user.Phai,
          DiaChi: this.user.DiaChi,
          DienThoai: this.user.DienThoai
        };

        const response = await fetch(`http://localhost:3000/api/docgia/${this.user.MaDocGia}`, {
            
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error(`Lỗi khi cập nhật độc giả: ${response.statusText}`);
        }

        this.showSuccessMessage = true;
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        alert('Lỗi khi cập nhật độc giả: ' + error.message);
      }
    },

    closeSuccessMessage() {
      this.showSuccessMessage = false;
      this.$router.push('/docgia');
    }
  }
};
</script>

<style scoped>
.update-user {
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

input, select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus, select:focus {
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
</style>
