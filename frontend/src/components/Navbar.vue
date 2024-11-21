<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/sach">Trang chủ</router-link></li>
      <li><router-link to="/docgia">Độc giả</router-link></li>
      <li><router-link to="/nhanvien">Nhân viên</router-link></li>
      <li><router-link to="/nhaxuatban">Nhà Xuất Bản</router-link></li>
      <li><router-link to="/theodoimuonsach/danh-sach-muon">Theo Dõi Mượn Sách</router-link></li>
      <li><router-link to="/adduser">Đăng ký độc giả</router-link></li>
      <li><router-link to="/login">Đăng nhập nhân viên</router-link></li>
      
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  background-color: #007bff; /* Màu nền xanh dương */
  padding: 15px 30px; /* Thêm không gian giữa các phần tử */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Đổ bóng nhẹ cho navbar */
}

.navbar ul {
  list-style-type: none;
  margin: 0; /* Xóa khoảng cách mặc định */
  padding: 0; /* Xóa padding mặc định */
  display: flex; /* Sử dụng flexbox để căn chỉnh các phần tử ngang */
}

.navbar li {
  margin-right: 20px; /* Khoảng cách giữa các mục */
}

.navbar a {
  color: #ffffff; /* Màu chữ trắng */
  text-decoration: none; /* Bỏ gạch chân cho liên kết */
  font-weight: bold; /* Đậm chữ */
  transition: color 0.3s; /* Hiệu ứng chuyển màu mượt mà */
}

.navbar a:hover {
  color: #ffc107; /* Màu chữ khi hover */
  text-decoration: underline; /* Gạch chân chữ khi hover */
}

.navbar a.active {
  color: #ffc107; /* Màu chữ cho mục đang được chọn */
  font-weight: bold; /* Làm đậm cho mục đang được chọn */
}
</style>
