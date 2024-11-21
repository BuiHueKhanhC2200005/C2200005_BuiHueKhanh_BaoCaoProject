const { ObjectId } = require('mongodb');

exports.getAllSach = async (db) => {
    return await db.collection("Sach").find({}).toArray();
};

exports.getSachById = async (db, id) => {
    return await db.collection("Sach").findOne({ MaSach: id });
};

exports.createSach = async (db, data) => {
    return await db.collection("Sach").insertOne(data);
};

exports.updateSach = async (db, id, data) => {
    try {
        console.log("Cập nhật sách với MaSach:", id);
        console.log("Dữ liệu cập nhật ban đầu:", data);

        // Xóa trường `_id` nếu tồn tại trong dữ liệu cập nhật
        delete data._id;

        const result = await db.collection("Sach").updateOne(
            { MaSach: id },
            { $set: data }
        );

        console.log("Kết quả cập nhật:", result);

        if (result.matchedCount === 0) {
            throw new Error("Không tìm thấy sách để cập nhật");
        }

        return result;
    } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
        throw new Error("Lỗi khi cập nhật sách: " + error.message);
    }
};


exports.deleteSach = async (db, id) => {
    try {
        const result = await db.collection("Sach").deleteOne({ MaSach: id });
        
        if (result.deletedCount === 0) {
            throw new Error("Không tìm thấy sách để xóa");
        }

        return result;
    } catch (error) {
        throw new Error("Lỗi khi xóa sách: " + error.message);
    }
};
