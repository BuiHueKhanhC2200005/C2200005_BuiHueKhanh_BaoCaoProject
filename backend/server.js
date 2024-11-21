const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const connectToDatabase = require("./db/connect");

const docgiaRoutes = require('./routes/docgia');
const sachRoutes = require("./routes/sach");
const nhaxuatbanRoutes = require("./routes/nhaxuatban");
const theodoimuonsachRoutes = require('./routes/theodoimuonsach');
const nhanvienRoutes = require('./routes/nhanvien');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/docgia', docgiaRoutes);
app.use("/api/sach", sachRoutes);
app.use("/api/nhaxuatban", nhaxuatbanRoutes);
app.use('/api/theodoimuonsach', theodoimuonsachRoutes);
app.use('/api/nhanvien', nhanvienRoutes);
app.use('/api/auth', authRoutes);

const start = async () => {
    const db = await connectToDatabase();
    app.locals.db = db;
    app.listen(3000, () => console.log("Server is running on port 3000"));
};
start();
