<template>
  <div class="staff-list">
    <h1>Danh Sách Nhân Viên</h1>
    <div class="staff-cards">

      <!-- Danh sách nhân viên -->
      <div v-for="staff in staffList" :key="staff.MSNV" class="staff-card">
        <router-link :to="{ name: 'StaffDetail', params: { id: staff.MSNV } }" class="staff-link">
          <h2>{{ staff.HoTenNV }}</h2>
          <p>Chức Vụ: {{ staff.Chucvu }}</p>
          <p>Địa Chỉ: {{ staff.Diachi }}</p>
        </router-link>
        <div class="action-buttons">
          <!-- Xem chi tiết -->
          <router-link v-if="staff.MSNV" :to="{ name: 'StaffDetail', params: { id: staff.MSNV } }" class="view-button">
            Xem chi tiết
          </router-link>

          <!-- Xóa nhân viên -->
          <button @click="deleteStaff(staff.MSNV)" class="delete-button">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffList: [] // Dữ liệu danh sách nhân viên
    };
  },
  mounted() {
    this.fetchStaffList();
  },
  methods: {
    // Fetch danh sách nhân viên
    async fetchStaffList() {
      try {
        const response = await fetch('http://localhost:3000/api/nhanvien');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu');
        }
        this.staffList = await response.json();
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách nhân viên:', error);
      }
    },
    
    // Xóa nhân viên
    async deleteStaff(id) {
      if (confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/nhanvien/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            alert('Xóa nhân viên thành công!');
            this.fetchStaffList(); // Làm mới danh sách sau khi xóa
          } else {
            console.error('Không thể xóa nhân viên với MSNV:', id);
          }
        } catch (error) {
          console.error('Lỗi khi xóa nhân viên:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.staff-list {
  padding: 20px;
  text-align: center;
}

.staff-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}


.add-staff-link {
  color: #007bff;
  text-decoration: none;
}

.staff-card {
  border: 1px solid #ddd;
  padding: 20px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

.staff-link {
  text-decoration: none;
  color: #333;
}

.staff-card h2 {
  font-size: 18px;
  color: #007bff;
}

.staff-card p {
  font-size: 14px;
  color: #555;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.view-button {
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  text-decoration: none;
}

.view-button:hover {
  background-color: #218838;
}

.delete-button {
  padding: 8px 12px;
  background-color: #ff1109;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c60b00;
}
</style>
