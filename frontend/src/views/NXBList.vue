<template>
  <div class="nxb-list">
    <h1>Danh Sách Nhà Xuất Bản</h1>
    <div class="nxb-cards">

      <!-- Danh sách nhà xuất bản -->
      <div v-for="nxb in nxbList" :key="nxb.MaNXB" class="nxb-card">
        <router-link :to="{ name: 'NhaXuatBanDetail', params: { MaNXB: nxb.MaNXB } }" class="nxb-link">
          <h2>{{ nxb.TenNXB }}</h2>
          <p>Mã Nhà Xuất Bản: {{ nxb.MaNXB }}</p>
          <p>Địa Chỉ: {{ nxb.DiaChi }}</p>
        </router-link>
        
        <div class="action-buttons">
          <!-- Xem chi tiết -->
          <router-link v-if="nxb.MaNXB" :to="{ name: 'NhaXuatBanDetail', params: { MaNXB: nxb.MaNXB } }" class="view-button">
            Xem chi tiết
          </router-link>

          <!-- Xóa nhà xuất bản -->
          <button @click="deleteNhaXuatBan(nxb.MaNXB)" class="delete-button">Xóa</button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nxbList: [] // Dữ liệu danh sách nhà xuất bản
    };
  },
  mounted() {
    this.fetchNhaXuatBanList();
  },
  methods: {
    // Fetch danh sách nhà xuất bản
    async fetchNhaXuatBanList() {
      try {
        const response = await fetch('http://localhost:3000/api/nhaxuatban');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu');
        }
        this.nxbList = await response.json();
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách nhà xuất bản:', error);
      }
    },

    // Xóa nhà xuất bản
    async deleteNhaXuatBan(id) {
      if (confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này không?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/nhaxuatban/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            alert('Xóa nhà xuất bản thành công!');
            this.fetchNhaXuatBanList(); // Làm mới danh sách sau khi xóa
          } else {
            console.error('Không thể xóa nhà xuất bản với MaNXB:', id);
          }
        } catch (error) {
          console.error('Lỗi khi xóa nhà xuất bản:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.nxb-list {
  padding: 20px;
  text-align: center;
}

.nxb-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.add-nxb-link {
  color: #007bff;
  text-decoration: none;
}

.nxb-card {
  border: 1px solid #ddd;
  padding: 20px;
  width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
}

.nxb-link {
  text-decoration: none;
  color: #333;
}

.nxb-card h2 {
  font-size: 18px;
  color: #007bff;
}

.nxb-card p {
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
