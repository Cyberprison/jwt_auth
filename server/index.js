const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { PORT, DB_URL } = require("./config");
const mongoose = require("mongoose");
const router = require("./router/index");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const errorMiddleware = require("./middlewares/error-middleware.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router
    /* 
    #swagger.tags = ['UserController']

    #swagger.security = [{
        "apiKeyAuth": []
    }] 
    */
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

const start = async () => {
    try{
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => {
            console.log(`Server start on http://localhost:${PORT}/`);
            console.log(`swagger open api docs on http://localhost:${PORT}/api-docs/`);
        });
    }
    catch(e) {
        console.log(e);
    }
};

start();