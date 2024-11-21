// models/TheoDoiMuonSach.js
const mongoose = require('mongoose');

const theoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: {
    type: String,
    required: true
  },
  MaSach: {
    type: String,
    required: true
  },
  NgayMuon: {
    type: Date,
    required: true,
    default: Date.now // Ngày mượn mặc định là thời gian hiện tại
  },
  NgayTra: {
    type: Date,
    default: null // Ngày trả sách mặc định là null nếu chưa trả
  }
}, { timestamps: true }); // Thêm các trường createdAt và updatedAt tự động

const TheoDoiMuonSach = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema);

module.exports = TheoDoiMuonSach;
