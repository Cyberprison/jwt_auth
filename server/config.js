require("dotenv").config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || "mongodb://root:example@127.0.0.1:27017/";

module.exports = {
    PORT,
    DB_URL
};