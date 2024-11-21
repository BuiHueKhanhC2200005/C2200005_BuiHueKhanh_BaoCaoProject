// models/NhaXuatBan.js
const mongoose = require('mongoose');

const NhaXuatBanSchema = new mongoose.Schema({
  MaNXB: {
    type: String,
    required: true,
    unique: true,  // Đảm bảo Mã Nhà Xuất Bản là duy nhất
  },
  TenNXB: {
    type: String,
    required: true,
  },
  DiaChi: {
    type: String,
    required: true,
  },
});

const NhaXuatBan = mongoose.model('NhaXuatBan', NhaXuatBanSchema);
module.exports = NhaXuatBan;
