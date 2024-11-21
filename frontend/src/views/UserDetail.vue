<template>
  <div class="user-detail" v-if="isLoggedIn">
    <h1>Chi Tiết Người Dùng</h1>

    <!-- Hiển thị chi tiết người dùng chỉ khi user đã được tải thành công -->
    <div v-if="user">
      <p><strong>Mã Người Dùng:</strong> {{ user.MaDocGia }}</p>
      <p><strong>Họ Tên:</strong> {{ user.HoLot }} {{ user.Ten }}</p>
      <p><strong>Ngày Sinh:</strong> {{ user.NgaySinh }}</p>
      <p><strong>Phái:</strong> {{ user.Phai }}</p>
      <p><strong>Địa Chỉ:</strong> {{ user.DiaCHi }}</p>
      <p><strong>Điện Thoại:</strong> {{ user.DienThoai }}</p>

      <!-- Button đóng và quay lại danh sách -->
      <div class="success-message">
        <button @click="close">Đóng</button>
      </div>
    </div>

    <!-- Hiển thị thông báo khi không có dữ liệu người dùng -->
    <div v-else>
      <p>Không tìm thấy người dùng với MaDocGia: {{ $route.params.id }}</p>
    </div>

    <!-- Chỉ hiển thị link chỉnh sửa khi người dùng đã được tải -->
    <RouterLink v-if="user" :to="{ name: 'UpdateUser', params: { id: user.MaDocGia } }" class="edit-link">
      Chỉnh sửa người dùng
    </RouterLink>

    <router-link to="/adduser" class="add-user-link">Thêm Độc Giả Mới</router-link>

    <!-- Nút đăng xuất -->
    <button class="logout-button" @click="logout">Đăng Xuất</button>
  </div>

  <div v-else>
    <p class="error-message">Vui lòng đăng nhập để xem chi tiết người dùng.</p>
    <router-link to="/login">Đăng nhập</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null, // Dữ liệu người dùng sẽ được lấy từ API
      isLoggedIn: false // Kiểm tra trạng thái đăng nhập
    };
  },
  async mounted() {
    // Kiểm tra trạng thái đăng nhập
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true';
    
    if (!this.isLoggedIn) {
      this.$router.push('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      return;
    }

    const userId = this.$route.params.id;

    // Kiểm tra nếu MaDocGia không có trong URL thì chuyển hướng về danh sách người dùng
    if (!userId) {
      this.$router.push('/docgia');
      return;
    }

    // Gọi API để lấy chi tiết người dùng
    await this.fetchUserDetail(userId);
  },
  methods: {
    async fetchUserDetail(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/docgia/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            this.user = data; // Nếu có dữ liệu, gán cho user
          } else {
            console.error('Không tìm thấy người dùng với MaDocGia:', id);
            this.user = null; // Nếu không tìm thấy người dùng, gán null
          }
        } else {
          console.error('Lỗi từ server khi lấy thông tin người dùng:', response.status);
          this.user = null; // Nếu lỗi từ server
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết người dùng:', error);
        this.user = null; // Đảm bảo user là null nếu có lỗi
      }
    },
    close() {
      // Quay lại trang danh sách người dùng
      this.$router.push({ name: 'UserList' });
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
.user-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  font-size: 26px;
  color: #007bff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.user-detail p {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  margin: 10px 0;
}

.user-detail p strong {
  color: #007bff;
}

.edit-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.edit-link:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.add-user-link {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #28a745;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
}

.add-user-link:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.success-message button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #155724;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.success-message button:hover {
  background-color: #0c3d14;
  transform: scale(1.05);
}

.logout-button {
  background-color: #d9534f;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
}

.logout-button:hover {
  background-color: #c9302c;
  transform: scale(1.05);
}

.error-message {
  color: #d9534f;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .user-detail {
    padding: 15px;
    font-size: 14px;
  }

  .user-detail p {
    font-size: 14px;
  }

  .button-group {
    flex-direction: column;
    gap: 15px;
  }

  button,
  a {
    width: 100%;
    font-size: 14px;
  }
}
</style>
