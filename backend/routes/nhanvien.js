// routes/nhanvien.js
const express = require("express");
const router = express.Router();
const nhanVienController = require("../controllers/nhanvienController");

// Lấy tất cả nhân viên
router.get("/", async (req, res) => {
    try {
        const result = await nhanVienController.getAllNhanVien(req.app.locals.db);
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách nhân viên', error: error.message });
    }
});

// Lấy nhân viên theo ID
router.get("/:id", async (req, res) => {
    try {
        const result = await nhanVienController.getNhanVienById(req.app.locals.db, req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Nhân viên không tìm thấy' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy nhân viên theo ID:", error);
        res.status(500).json({ message: 'Lỗi khi lấy nhân viên', error: error.message });
    }
});

// Thêm nhân viên mới
router.post("/", async (req, res) => {
    try {
        const result = await nhanVienController.createNhanVien(req.app.locals.db, req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error);
        res.status(500).json({ message: 'Lỗi khi thêm nhân viên', error: error.message });
    }
});

// cập nhật nhân viên
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Sử dụng req.app.locals.db để truy cập vào collection 'NhanVien'
        const result = await req.app.locals.db.collection('NhanVien').updateOne({ MSNV: id }, { $set: updateData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật nhân viên thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật nhân viên:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật nhân viên', error: error.message });
    }
});




// Xóa nhân viên
router.delete("/:id", async (req, res) => {
    try {
        const result = await nhanVienController.deleteNhanVien(req.app.locals.db, req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy nhân viên để xóa.' });
        }
        res.status(200).json({ message: 'Nhân viên đã được xóa thành công' });
    } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        res.status(500).json({ message: 'Lỗi khi xóa nhân viên', error: error.message });
    }
});

module.exports = router;
