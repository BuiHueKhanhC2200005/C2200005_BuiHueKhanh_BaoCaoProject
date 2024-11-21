<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Quanlymuonsach. Tất cả các quyền được bảo lưu.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #e0e0e0;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer-links {
  list-style-type: none;
  padding: 0;
}

.footer-links li {
  display: inline;
  margin-right: 15px;
}
</style>
