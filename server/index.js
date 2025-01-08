const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT, DB_URL } = require("./config");
const mongoose = require("mongoose");
const router = require("./router/index");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
    try{
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server start on http://localhost:${PORT}/`);
        });
    }
    catch(e) {
        console.log(e);
    }
};

start();