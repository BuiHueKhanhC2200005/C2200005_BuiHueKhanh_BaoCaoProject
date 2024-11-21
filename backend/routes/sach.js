const express = require("express");
const router = express.Router();
const sachController = require("../controllers/sachController");

// Lấy tất cả sách
router.get("/", async (req, res) => {
    try {
        const result = await sachController.getAllSach(req.app.locals.db);
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sách', error: error.message });
    }
});

// Lấy sách theo ID
router.get("/:id", async (req, res) => {
    try {
        const result = await sachController.getSachById(req.app.locals.db, req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Sách không tìm thấy' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy sách theo ID:", error);
        res.status(500).json({ message: 'Lỗi khi lấy sách', error: error.message });
    }
});

// Thêm sách mới
router.post("/", async (req, res) => {
    try {
        const result = await sachController.createSach(req.app.locals.db, req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
        res.status(500).json({ message: 'Lỗi khi thêm sách', error: error.message });
    }
});

// Cập nhật thông tin sách
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Sử dụng req.app.locals.db để lấy truy cập vào cơ sở dữ liệu
        const result = await req.app.locals.db.collection('Sach').updateOne({ MaSach: id }, { $set: updateData });
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật sách thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật sách:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật sách', error: error.message });
    }
});

// Xóa sách
router.delete("/:id", async (req, res) => {
    try {
        const result = await sachController.deleteSach(req.app.locals.db, req.params.id);
        res.status(200).json({ message: 'Sách đã được xóa thành công' });
    } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
        res.status(500).json({ message: 'Lỗi khi xóa sách', error: error.message });
    }
});

module.exports = router;
