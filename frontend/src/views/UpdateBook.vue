<template>
  <div class="edit-book">
    <h1>Cập Nhật Sách</h1>
    <form @submit.prevent="updateBook">
      <div class="form-group">
        <label for="MaSach">Mã sách:</label>
        <input id="MaSach" v-model="updatedBook.MaSach" disabled class="form-input" />
      </div>
      <div class="form-group">
        <label for="TenSach">Tên sách:</label>
        <input id="TenSach" v-model="updatedBook.TenSach" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="DonGia">Đơn giá:</label>
        <input id="DonGia" type="number" v-model="updatedBook.DonGia" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="SoQuyen">Số quyển:</label>
        <input id="SoQuyen" type="number" v-model="updatedBook.SoQuyen" required class="form-input" />
      </div>
      <div class="form-group">
        <label for="NamXuatBan">Năm xuất bản:</label>
        <input id="NamXuatBan" type="number" v-model="updatedBook.NamXuatBan" required class="form-input" />
      </div>

      <!-- Thay vì nhập MaNXB, chọn từ danh sách Nhà Xuất Bản -->
      <div class="form-group">
        <label for="MaNXB">Mã NXB:</label>
        <select id="MaNXB" v-model="updatedBook.MaNXB" required class="form-input">
          <option v-for="nxb in nhaXuatBanList" :key="nxb.MaNXB" :value="nxb.MaNXB">
            {{ nxb.MaNXB }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="NguonGoc">Nguồn gốc:</label>
        <input id="NguonGoc" v-model="updatedBook.NguonGoc" required class="form-input" />
      </div>

      <button type="submit" class="submit-btn">Cập nhật sách</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const updatedBook = ref({
      MaSach: '',
      TenSach: '',
      DonGia: '',
      SoQuyen: '',
      NamXuatBan: '',
      MaNXB: '',
      NguonGoc: ''
    });

    const nhaXuatBanList = ref([]); // Danh sách nhà xuất bản

    // Lấy thông tin sách và danh sách nhà xuất bản khi component mounted
    onMounted(async () => {
      const maSach = route.params.id;
      try {
        const bookResponse = await fetch(`http://localhost:3000/api/sach/${maSach}`);
        if (!bookResponse.ok) {
          throw new Error('Không tìm thấy sách');
        }
        const bookData = await bookResponse.json();
        Object.assign(updatedBook.value, bookData);

        // Lấy danh sách nhà xuất bản
        const nxbResponse = await fetch('http://localhost:3000/api/nhaxuatban');
        if (!nxbResponse.ok) {
          throw new Error('Không thể lấy danh sách nhà xuất bản');
        }
        const nxbData = await nxbResponse.json();
        nhaXuatBanList.value = nxbData;
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
      }
    });

    const updateBook = async () => {
      try {
        const bookData = { ...updatedBook.value };
        delete bookData._id; // Nếu có, xóa _id để không gửi lên API

        const response = await fetch(`http://localhost:3000/api/sach/${bookData.MaSach}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookData)
        });

        if (!response.ok) {
          throw new Error('Lỗi khi cập nhật sách: ' + response.statusText);
        }

        const result = await response.json();
        console.log('Sách đã được cập nhật:', result);

        // Điều hướng về trang danh sách sách sau khi cập nhật thành công
        router.push({ name: 'BookList' });
      } catch (error) {
        console.error('Có lỗi xảy ra:', error);
        alert("Lỗi khi cập nhật sách: " + error.message);
      }
    };

    return {
      updatedBook,
      nhaXuatBanList,
      updateBook
    };
  }
};
</script>

<style scoped>
.edit-book {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8em;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: #555;
}

.form-input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  color: #333;
}

.form-input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

button.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.submit-btn:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
