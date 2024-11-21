// routes/nhaxuatban.js
const express = require("express");
const router = express.Router();
const nhaxuatbanController = require("../controllers/nhaxuatbanController");

// Lấy tất cả Nhà Xuất Bản
router.get("/", async (req, res) => {
    try {
        const result = await nhaxuatbanController.getAllNhaXuatBan(req.app.locals.db);
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách nhà xuất bản', error: error.message });
    }
});

// Lấy Nhà Xuất Bản theo MaNXB
router.get("/:MaNXB", async (req, res) => {
    try {
        const result = await nhaxuatbanController.getNhaXuatBanByMaNXB(req.app.locals.db, req.params.MaNXB);
        if (!result) {
            return res.status(404).json({ message: 'Nhà xuất bản không tìm thấy' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy nhà xuất bản theo MaNXB:", error);
        res.status(500).json({ message: 'Lỗi khi lấy nhà xuất bản', error: error.message });
    }
});

// Thêm Nhà Xuất Bản mới
router.post("/", async (req, res) => {
    try {
        const result = await nhaxuatbanController.createNhaXuatBan(req.app.locals.db, req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Lỗi khi thêm nhà xuất bản:", error);
        res.status(500).json({ message: 'Lỗi khi thêm nhà xuất bản', error: error.message });
    }
});

// Cập nhật Nhà Xuất Bản
router.put("/:MaNXB", async (req, res) => {
    try {
        const { MaNXB } = req.params;
        const updateData = req.body;

        // Sử dụng req.app.locals.db để truy cập vào collection 'NhaXuatBan'
        const result = await req.app.locals.db.collection('NhaXuatBan').updateOne({ MaNXB }, { $set: updateData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật nhà xuất bản thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật nhà xuất bản:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật nhà xuất bản', error: error.message });
    }
});

// Xóa Nhà Xuất Bản
router.delete("/:MaNXB", async (req, res) => {
    try {
        const result = await nhaxuatbanController.deleteNhaXuatBan(req.app.locals.db, req.params.MaNXB);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhà xuất bản để xóa.' });
        }
        res.status(200).json({ message: 'Nhà xuất bản đã được xóa thành công' });
    } catch (error) {
        console.error("Lỗi khi xóa nhà xuất bản:", error);
        res.status(500).json({ message: 'Lỗi khi xóa nhà xuất bản', error: error.message });
    }
});

module.exports = router;
