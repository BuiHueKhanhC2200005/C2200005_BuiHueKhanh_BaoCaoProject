// models/Sach.js

const SachModel = {
    findAll: async (db) => {
        return await db.collection("Sach").find({}).toArray();
    },

    findById: async (db, id) => {
        return await db.collection("Sach").findOne({ MaSach: id });
    },

    create: async (db, data) => {
        return await db.collection("Sach").insertOne(data);
    },

    update: async (db, id, data) => {
        return await db.collection("Sach").updateOne({ MaSach: id }, { $set: data });
    },

    delete: async (db, id) => {
        return await db.collection("Sach").deleteOne({ MaSach: id });
    }
};

module.exports = SachModel;
