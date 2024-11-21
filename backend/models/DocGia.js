// models/Docgia.js

const DocgiaModel = {
    findAll: async (db) => {
        return await db.collection("Docgia").find({}).toArray();
    },

    findById: async (db, id) => {
        return await db.collection("Docgia").findOne({ MaDocGia: id });
    },

    create: async (db, data) => {
        return await db.collection("Docgia").insertOne(data);
    },

    update: async (db, id, data) => {
        return await db.collection("Docgia").updateOne({ MaDocGia: id }, { $set: data });
    },

    delete: async (db, id) => {
        return await db.collection("Docgia").deleteOne({ MaDocGia: id });
    }
};

module.exports = DocgiaModel;
