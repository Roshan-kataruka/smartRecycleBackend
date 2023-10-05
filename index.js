
require("dotenv").config();

const express = require('express');

const app = express()

const port = 3000;

const userRouter = require("./api/user/user.router");

const ngoRouter = require("./api/ngo/ngo.router");

const imageRouter = require("./api/ImageRecognition/imageRecogRouter")

app.use(express.json());

app.use("/api/users",userRouter);

app.use("/api/ngo",ngoRouter);

app.use("/image/api",imageRouter);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })