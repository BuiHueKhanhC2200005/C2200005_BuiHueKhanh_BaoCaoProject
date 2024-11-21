const { ObjectId } = require('mongodb');

exports.getAllNhanVien = async (db) => {
    return await db.collection("NhanVien").find({}).toArray();
};

exports.getNhanVienById = async (db, id) => {
    return await db.collection("NhanVien").findOne({ MSNV: id });
};

exports.createNhanVien = async (db, data) => {
    return await db.collection("NhanVien").insertOne(data);
};

exports.updateNhanVien = async (db, id, data) => {
    try {
        console.log("Cập nhật nhân viên với MSNV:", id);
        console.log("Dữ liệu cập nhật ban đầu:", data);

        // Xóa trường `_id` nếu tồn tại trong dữ liệu cập nhật
        delete data._id;

        const result = await db.collection("NhanVien").updateOne(
            { MSNV: id },
            { $set: data }
        );

        console.log("Kết quả cập nhật:", result);

        if (result.matchedCount === 0) {
            throw new Error("Không tìm thấy nhân viên để cập nhật");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi cập nhật nhân viên:", error);
        throw new Error("Lỗi khi cập nhật nhân viên: " + error.message);
    }
};

exports.deleteNhanVien = async (db, id) => {
    try {
        const result = await db.collection("NhanVien").deleteOne({ MSNV: id });

        if (result.deletedCount === 0) {
            throw new Error("Không tìm thấy nhân viên để xóa");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
        throw new Error("Lỗi khi xóa nhân viên: " + error.message);
    }
};
