// db/connect.js

const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectToDatabase = async () => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI, {
        });
        console.log("Connected to MongoDB successfully");
        return client.db();  // Trả về đối tượng `db` từ client
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);  // Thoát khỏi quy trình nếu không kết nối được
    }
};

module.exports = connectToDatabase;
