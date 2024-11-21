const express = require("express");
const router = express.Router();
const docgiaController = require("../controllers/docgiaController");

// Lấy tất cả độc giả
router.get("/", async (req, res) => {
    try {
        const result = await docgiaController.getAllDocGia(req.app.locals.db);
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy danh sách độc giả:", error);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách độc giả', error: error.message });
    }
});

// Lấy thông tin độc giả theo ID
router.get("/:id", async (req, res) => {
    try {
        const result = await docgiaController.getDocGiaById(req.app.locals.db, req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy độc giả' });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi khi lấy độc giả theo ID:", error);
        res.status(500).json({ message: 'Lỗi khi lấy độc giả', error: error.message });
    }
});

// Thêm độc giả mới
router.post("/", async (req, res) => {
    try {
        const result = await docgiaController.createDocGia(req.app.locals.db, req.body);
        res.status(201).json({ message: 'Thêm độc giả thành công', data: result });
    } catch (error) {
        console.error("Lỗi khi thêm độc giả:", error);
        res.status(500).json({ message: 'Lỗi khi thêm độc giả', error: error.message });
    }
});

// Cập nhật thông tin độc giả
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Sử dụng req.app.locals.db để truy cập vào collection 'Docgia'
        const result = await req.app.locals.db.collection('Docgia').updateOne({ MaDocGia: id }, { $set: updateData });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy độc giả để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật độc giả thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật độc giả:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật độc giả', error: error.message });
    }
});

module.exports = router;


// Xóa độc giả
router.delete("/:id", async (req, res) => {
    try {
        const result = await docgiaController.deleteDocGia(req.app.locals.db, req.params.id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy độc giả để xóa.' });
        }
        res.status(200).json({ message: 'Độc giả đã được xóa thành công' });
    } catch (error) {
        console.error("Lỗi khi xóa độc giả:", error);
        res.status(500).json({ message: 'Lỗi khi xóa độc giả', error: error.message });
    }
});

module.exports = router;
