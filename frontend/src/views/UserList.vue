<template>
  <div class="user-list">
    <h1>Danh Sách Độc Giả</h1>
    <div class="user-cards">
      <!-- Danh sách người dùng -->
      <div v-for="user in userList" :key="user.MaDocGia" class="user-card">
        <!-- Kiểm tra nếu MaDocGia có giá trị -->
        <router-link v-if="user.MaDocGia" :to="{ name: 'UserDetail', params: { id: user.MaDocGia } }" class="user-link">
          <h2>{{ user.HoLot }} {{ user.Ten }}</h2>
          <p>Mã độc giả: {{ user.MaDocGia }}</p>
          <p>Ngày Sinh: {{ user.NgaySinh }}</p>
          <p>Địa Chỉ: {{ user.DiaCHi }}</p>
        </router-link>

        <div class="action-buttons">
          <!-- Xem chi tiết -->
          <router-link v-if="user.MaDocGia" :to="{ name: 'UserDetail', params: { id: user.MaDocGia } }" class="view-button">
            Xem chi tiết
          </router-link>

          <!-- Xóa người dùng -->
          <button v-if="user.MaDocGia" @click="deleteUser(user.MaDocGia)" class="delete-button">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [] // Dữ liệu danh sách người dùng
    };
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {
    // Fetch danh sách người dùng
    async fetchUserList() {
      try {
        const response = await fetch('http://localhost:3000/api/docgia');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu');
        }
        this.userList = await response.json();
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách người dùng:', error);
      }
    },

    // Xóa người dùng
    async deleteUser(id) {
      if (!id) {
        console.error("MaDocGia không hợp lệ");
        return;
      }

      if (confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/docgia/${id}`, {
            method: 'DELETE'
          });

          if (response.ok) {
            alert('Xóa người dùng thành công!');
            this.fetchUserList(); // Làm mới danh sách sau khi xóa
          } else {
            console.error('Không thể xóa người dùng với MaDocGia:', id);
          }
        } catch (error) {
          console.error('Lỗi khi xóa người dùng:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.user-list {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 28px;
  color: #007bff;
  margin-bottom: 20px;
  font-weight: bold;
}

.user-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.user-card {
  border: 1px solid #ddd;
  padding: 20px;
  width: 220px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.user-link {
  text-decoration: none;
  color: #333;
}

.user-card h2 {
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
}

.user-card p {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}

.view-button,
.delete-button {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.view-button {
  background-color: #28a745;
  color: white;
  text-decoration: none;
}

.view-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.delete-button {
  background-color: #ff1109;
  color: white;
  border: none;
}

.delete-button:hover {
  background-color: #c60b00;
  transform: scale(1.05);
}

.error-message {
  color: #d9534f;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .user-cards {
    flex-direction: column;
    align-items: center;
  }

  .user-card {
    width: 90%;
    margin-bottom: 15px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .view-button,
  .delete-button {
    width: 100%;
  }
}
</style>
