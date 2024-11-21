<template>
  <div id="app">
    <Navbar />
    <router-view></router-view> <!-- Đây là nơi các component sẽ được hiển thị -->
    <Footer />
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',

  mounted() {
    if (!localStorage.getItem('staffLoggedIn')) {
      this.$router.push('/login');
    }
  },
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
/* Các kiểu CSS chung cho toàn bộ ứng dụng */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
