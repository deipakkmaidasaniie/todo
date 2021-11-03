const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv/config");
//middlewares
const mongo_uri=process.env.mongo_uri;
mongoose
    .connect(mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log(err);
    });


const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.listen(port, () => {
    console.log(`listening to ${port}`);
});

const userRouter = require("./routers/userRoutes");
app.use("/api",userRouter);
