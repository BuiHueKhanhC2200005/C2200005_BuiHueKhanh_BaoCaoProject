// controllers/docgiaController.js

const { ObjectId } = require('mongodb');

// Lấy tất cả độc giả
exports.getAllDocGia = async (db) => {
    try {
        return await db.collection("Docgia").find({}).toArray();
    } catch (error) {
        console.error("Lỗi khi lấy tất cả độc giả:", error);
        throw new Error("Lỗi khi lấy tất cả độc giả: " + error.message);
    }
};

// Lấy thông tin một độc giả theo mã số độc giả (MaDocGia)
exports.getDocGiaById = async (db, id) => {
    try {
        return await db.collection("Docgia").findOne({ MaDocGia: id });
    } catch (error) {
        console.error("Lỗi khi lấy thông tin độc giả:", error);
        throw new Error("Lỗi khi lấy thông tin độc giả: " + error.message);
    }
};

// Thêm mới một độc giả
exports.createDocGia = async (db, data) => {
    try {
        return await db.collection("Docgia").insertOne(data);
    } catch (error) {
        console.error("Lỗi khi thêm độc giả:", error);
        throw new Error("Lỗi khi thêm độc giả: " + error.message);
    }
};

// Cập nhật thông tin độc giả
exports.updateDocGia = async (db, id, data) => {
    try {
        console.log("Cập nhật độc giả với MaDocGia:", id);
        console.log("Dữ liệu cập nhật ban đầu:", data);

        // Xóa trường `_id` nếu tồn tại trong dữ liệu cập nhật
        delete data._id;

        const result = await db.collection("Docgia").updateOne(
            { MaDocGia: id },
            { $set: data }
        );

        console.log("Kết quả cập nhật:", result);

        if (result.matchedCount === 0) {
            throw new Error("Không tìm thấy độc giả để cập nhật");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi cập nhật độc giả:", error);
        throw new Error("Lỗi khi cập nhật độc giả: " + error.message);
    }
};

// Xóa một độc giả
exports.deleteDocGia = async (db, id) => {
    try {
        const result = await db.collection("Docgia").deleteOne({ MaDocGia: id });

        if (result.deletedCount === 0) {
            throw new Error("Không tìm thấy độc giả để xóa");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi xóa độc giả:", error);
        throw new Error("Lỗi khi xóa độc giả: " + error.message);
    }
};
