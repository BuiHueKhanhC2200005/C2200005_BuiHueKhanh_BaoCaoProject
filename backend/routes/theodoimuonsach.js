// routes/theodoimuonsach.js
const express = require('express');
const router = express.Router();
const theoDoiMuonSachController = require('../controllers/theodoimuonsachController');

// Route mượn sách
router.post('/muon-sach', theoDoiMuonSachController.muonSach);

// Route trả sách
router.post('/tra-sach', theoDoiMuonSachController.traSach);

// Route để lấy danh sách mượn sách
router.get('/danh-sach-muon', theoDoiMuonSachController.danhSachMuonSach);

// Route xóa bản ghi mượn sách
router.delete('/xoa-muon-sach/:id', theoDoiMuonSachController.xoaMuonSach);

module.exports = router;
