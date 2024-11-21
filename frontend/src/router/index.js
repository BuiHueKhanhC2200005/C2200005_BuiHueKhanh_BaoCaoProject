import { createRouter, createWebHistory } from 'vue-router';
import BookList from '../views/BookList.vue';
import UserList from '../views/UserList.vue';
import UserDetail from '../views/UserDetail.vue';
import AddUser from '../views/AddUser.vue';
import UpdateUser from '../views/UpdateUser.vue';
import BorrowList from '../views/BorrowList.vue';
import Login from '../views/Login.vue'; // Import trang đăng nhập
import Addbook from '../views/Addbook.vue'; // Import trang thêm sách
import BookDetail from '../views/BookDetail.vue';
import BorrowBook from '../views/BorrowBook.vue';
import UpdateBook from '../views/UpdateBook.vue';
import AddStaff from '../views/AddStaff.vue';
import StaffDetail from '../views/StaffDetail.vue';
import StaffList from '../views/StaffList.vue';
import UpdateStaff from '../views/UpdateStaff.vue';
import AddNXB from '../views/AddNXB.vue';
import NhaXuatBanDetail from '../views/NhaXuatBanDetail.vue';
import NXBList from '../views/NXBList.vue';


const routes = [
  {
    path: '/sach',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/docgia',
    name: 'UserList',
    component: UserList
  },
  {
    path: '/adduser',
    name: 'AddUser',
    component: AddUser
  },
  {
    path: '/docgia/:id', 
    name: 'UserDetail',
    component: UserDetail
  },
  {
    path: '/docgia/update/:id',
    name: 'UpdateUser',
    component: UpdateUser
  },
  {
    path: '/theodoimuonsach/danh-sach-muon',
    name: 'BorrowList',
    component: BorrowList
  },
  {
    path: '/nhanvien',
    name: 'StaffList',
    component: StaffList
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/addbook',
    name: 'Addbook',
    component: Addbook
  },
  {
    path: '/sach/update/:id',
    name: 'UpdateBook',
    component: UpdateBook
  },
  {
    path: '/sach/:id', // Route cho chi tiết sách
    name: 'BookDetail',
    component: BookDetail
  },
  {
  path: '/theodoimuonsach/muon-sach',
  name: 'BorrowBook',
  component: BorrowBook
  },
  {
  path: '/addstaff',
    name: 'AddStaff',
    component: AddStaff
  },
  {
    path: '/nhanvien/:id',
    name: 'StaffDetail',
    component: StaffDetail,
    props: true
  },
  {
    path: '/nhanvien/update/:id',
    name: 'UpdateStaff',
    component: UpdateStaff
  },
  {
    path: '/addnxb',
    name: 'AddNXB',
    component: AddNXB
  },
  {
    path: '/nhaxuatban/:MaNXB',
    name: 'NhaXuatBanDetail',
    component: NhaXuatBanDetail
  },
  {
    path: '/nhaxuatban',
    name: 'NXBList',
    component: NXBList
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Sử dụng import.meta.env.BASE_URL
  routes
});

export default router;
