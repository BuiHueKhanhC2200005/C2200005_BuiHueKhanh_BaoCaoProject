const { ObjectId } = require('mongodb');

// Lấy tất cả Nhà Xuất Bản
exports.getAllNhaXuatBan = async (db) => {
    try {
        return await db.collection("NhaXuatBan").find({}).toArray();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
        throw new Error("Lỗi khi lấy danh sách nhà xuất bản: " + error.message);
    }
};

// Lấy Nhà Xuất Bản theo Mã (MaNXB)
exports.getNhaXuatBanByMaNXB = async (db, id) => {
    try {
        return await db.collection("NhaXuatBan").findOne({ MaNXB: id });
    } catch (error) {
        console.error("Lỗi khi lấy nhà xuất bản:", error);
        throw new Error("Lỗi khi lấy nhà xuất bản: " + error.message);
    }
};

// Tạo mới Nhà Xuất Bản
exports.createNhaXuatBan = async (db, data) => {
    try {
        return await db.collection("NhaXuatBan").insertOne(data);
    } catch (error) {
        console.error("Lỗi khi tạo nhà xuất bản:", error);
        throw new Error("Lỗi khi tạo nhà xuất bản: " + error.message);
    }
};

// Cập nhật thông tin Nhà Xuất Bản
exports.updateNhaXuatBan = async (db, id, data) => {
    try {
        console.log("Cập nhật nhà xuất bản với MaNXB:", id);
        console.log("Dữ liệu cập nhật ban đầu:", data);

        // Xóa trường `_id` nếu tồn tại trong dữ liệu cập nhật
        delete data._id;

        const result = await db.collection("NhaXuatBan").updateOne(
            { MaNXB: id },
            { $set: data }
        );

        console.log("Kết quả cập nhật:", result);

        if (result.matchedCount === 0) {
            throw new Error("Không tìm thấy nhà xuất bản để cập nhật");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi cập nhật nhà xuất bản:", error);
        throw new Error("Lỗi khi cập nhật nhà xuất bản: " + error.message);
    }
};

// Xóa Nhà Xuất Bản
exports.deleteNhaXuatBan = async (db, id) => {
    try {
        const result = await db.collection("NhaXuatBan").deleteOne({ MaNXB: id });

        if (result.deletedCount === 0) {
            throw new Error("Không tìm thấy nhà xuất bản để xóa");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi xóa nhà xuất bản:", error);
        throw new Error("Lỗi khi xóa nhà xuất bản: " + error.message);
    }
};
