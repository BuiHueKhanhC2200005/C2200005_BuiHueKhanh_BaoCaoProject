// models/NhanVien.js

const NhanVienModel = {
    findAll: async (db) => {
        return await db.collection("NhanVien").find({}).toArray();
    },

    findById: async (db, id) => {
        return await db.collection("NhanVien").findOne({ MSNV: id });
    },

    create: async (db, data) => {
        return await db.collection("NhanVien").insertOne(data);
    },

    update: async (db, id, data) => {
        return await db.collection("NhanVien").updateOne({ MSNV: id }, { $set: data });
    },

    delete: async (db, id) => {
        return await db.collection("NhanVien").deleteOne({ MSNV: id });
    }
};

module.exports = NhanVienModel;
