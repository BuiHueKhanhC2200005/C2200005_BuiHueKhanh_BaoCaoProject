<template>
  <div class="staff-detail" v-if="isLoggedIn">
    <h1>Chi Tiết Nhân Viên</h1>

    <!-- Hiển thị chi tiết nhân viên chỉ khi staff đã được tải thành công -->
    <div v-if="staff">
      <p><strong>Mã Nhân Viên:</strong> {{ staff.MSNV }}</p>
      <p><strong>Họ Tên:</strong> {{ staff.HoTenNV }}</p>
      <p><strong>Mật khẩu:</strong> {{ staff.Password }}</p>
      <p><strong>Chức Vụ:</strong> {{ staff.Chucvu }}</p>
      <p><strong>Địa Chỉ:</strong> {{ staff.Diachi }}</p>
      <p><strong>Điện Thoại:</strong> {{ staff.SoDienThoai }}</p>

      <!-- Button đóng và quay lại danh sách -->
      <div class="success-message">
        <button @click="close">Đóng</button>
      </div>
    </div>

    <!-- Hiển thị thông báo khi không có dữ liệu nhân viên -->
    <div v-else>
      <p>Không tìm thấy nhân viên với MSNV: {{ $route.params.id }}</p>
    </div>

    <!-- Chỉ hiển thị link chỉnh sửa khi nhân viên đã được tải -->
    <RouterLink v-if="staff" :to="{ name: 'UpdateStaff', params: { id: staff.MSNV } }" class="edit-link">
      Chỉnh sửa nhân viên
    </RouterLink>

    <router-link to="/addstaff" class="add-staff-link">Thêm nhân viên mới</router-link>

    <!-- Nút đăng xuất -->
    <button class="logout-button" @click="logout">Đăng Xuất</button>
  </div>

  <div v-else>
    <p class="error-message">Vui lòng đăng nhập để xem chi tiết nhân viên.</p>
    <router-link to="/login">Đăng nhập</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staff: null, // Dữ liệu nhân viên sẽ được lấy từ API
      isLoggedIn: false // Kiểm tra đăng nhập
    };
  },
  async mounted() {
    this.isLoggedIn = localStorage.getItem('staffLoggedIn') === 'true'; // Kiểm tra nếu người dùng đã đăng nhập
    if (!this.isLoggedIn) {
      this.$router.push('/login'); // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    } else {
      const staffId = this.$route.params.id;

      // Kiểm tra nếu MSNV không có trong URL thì chuyển hướng về danh sách nhân viên
      if (!staffId) {
        this.$router.push('/nhanvien');
        return;
      }

      // Gọi API để lấy chi tiết nhân viên
      await this.fetchStaffDetail(staffId);
    }
  },
  methods: {
    async fetchStaffDetail(id) {
      try {
        const response = await fetch(`http://localhost:3000/api/nhanvien/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            this.staff = data; // Nếu có dữ liệu, gán cho staff
          } else {
            console.error('Không tìm thấy nhân viên với MSNV:', id);
            this.staff = null; // Nếu không tìm thấy nhân viên, gán null
          }
        } else {
          console.error('Lỗi từ server khi lấy thông tin nhân viên:', response.status);
          this.staff = null; // Nếu lỗi từ server
        }
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết nhân viên:', error);
        this.staff = null; // Đảm bảo staff là null nếu có lỗi
      }
    },
    close() {
      // Quay lại trang danh sách nhân viên
      this.$router.push({ name: 'StaffList' });
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
.staff-detail {
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

.staff-info {
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.staff-info p {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.staff-detail p strong {
  color: #007bff;
}

.staff-info strong {
  color: #007bff;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

button,
a {
  display: inline-block;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s, transform 0.3s;
}

button {
  border: none;
}

.edit-link {
  background-color: #007bff;
  color: white;
  text-decoration: none;
}

.edit-link:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.add-staff-link {
  background-color: #28a745;
  color: white;
  text-decoration: none;
}

.add-staff-link:hover {
  background-color: #218838;
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

.success-message button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #155724;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.success-message button:hover {
  background-color: #0c3d14;
  transform: scale(1.05);
}

.error-message {
  color: #d9534f;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .staff-detail {
    padding: 15px;
    font-size: 14px;
  }

  .staff-info {
    padding: 10px;
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


