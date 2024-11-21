<template>
  <div v-if="isLoggedIn">
    <div class="nha-xuat-ban-detail" v-if="nhaXuatBan">
      <h1>Chi Tiết Nhà Xuất Bản</h1>
    
      <!-- Hiển thị thông tin nhà xuất bản -->
      <div class="nxb-info">
        <p><strong>Mã Nhà Xuất Bản:</strong> {{ nhaXuatBan.MaNXB }}</p>
        <p><strong>Tên Nhà Xuất Bản:</strong> {{ nhaXuatBan.TenNXB }}</p>
        <p><strong>Địa Chỉ:</strong> {{ nhaXuatBan.DiaChi }}</p>
      </div>
    
      <!-- Nút quay lại danh sách nhà xuất bản -->
      <button @click="goBack" class="back-button">Quay lại danh sách</button>
      
      <!-- Nút xóa nhà xuất bản -->
      <button @click="deleteNhaXuatBan(nhaXuatBan.MaNXB)" class="delete-button">Xóa Nhà Xuất Bản</button>
      
      <router-link :to="`/addnxb`" class="add-button">Thêm Nhà Xuất Bản</router-link>
    </div>

    <!-- Hiển thị thông báo khi không có nhà xuất bản -->
    <div v-else>
      <p>Không tìm thấy nhà xuất bản với mã: {{ $route.params.MaNXB }}</p>
    </div>
  </div>

  <!-- Nếu chưa đăng nhập, yêu cầu đăng nhập -->
  <div v-else>
    <p>Vui lòng <router-link to="/login">đăng nhập</router-link> để xem thông tin nhà xuất bản.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nhaXuatBan: null, // Lưu thông tin nhà xuất bản
      isLoggedIn: false // Kiểm tra trạng thái đăng nhập
    };
  },
  mounted() {
    // Kiểm tra nếu người dùng đã đăng nhập
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true'; // Hoặc lấy thông tin từ session storage

    if (!this.isLoggedIn) {
      this.$router.push('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      return;
    }

    // Gọi API để lấy thông tin nhà xuất bản theo MaNXB
    this.fetchNhaXuatBanDetail(this.$route.params.MaNXB);
  },
  methods: {
    async fetchNhaXuatBanDetail(MaNXB) {
      try {
        const response = await fetch(`http://localhost:3000/api/nhaxuatban/${MaNXB}`);
        if (response.ok) {
          const data = await response.json();
          this.nhaXuatBan = data; // Gán dữ liệu nhà xuất bản
        } else {
          console.error('Không tìm thấy nhà xuất bản');
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết nhà xuất bản:', error);
      }
    },
    
    goBack() {
      // Quay lại trang danh sách nhà xuất bản
      this.$router.push('/nhaxuatban');
    },

    async deleteNhaXuatBan(MaNXB) {
      if (confirm('Bạn có chắc chắn muốn xóa nhà xuất bản này?')) {
        try {
          const response = await fetch(`http://localhost:3000/api/nhaxuatban/${MaNXB}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            alert('Xóa nhà xuất bản thành công!');
            this.$router.push('/nhaxuatban'); // Quay lại trang danh sách nhà xuất bản
          } else {
            const errorData = await response.json();
            console.error('Lỗi khi xóa nhà xuất bản:', errorData);
            alert(errorData.message || 'Không thể xóa nhà xuất bản');
          }
        } catch (error) {
          console.error('Lỗi khi xóa nhà xuất bản:', error);
          alert('Có lỗi xảy ra khi xóa nhà xuất bản');
        }
      }
    }
  },
};
</script>

<style scoped>
.nha-xuat-ban-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  font-size: 24px;
  color: #007bff;
  margin-bottom: 20px;
}

.nxb-info p {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.nxb-info strong {
  color: #555;
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

.add-button {
  margin-top: 20px;
  margin-left: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.add-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.delete-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.delete-button:hover {
  background-color: #c82333;
  transform: scale(1.05);
}
</style>
