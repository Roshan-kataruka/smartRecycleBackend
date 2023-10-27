
require("dotenv").config();

const express = require('express');

const app = express()

const port = 3000;

const userRouter = require("./api/user/user.router");

const ngoRouter = require("./api/ngo/ngo.router");

const imageRouter = require("./api/ImageRecognition/imageRecogRouter")

const Notification = require("./api/Notification/Notification.router")

app.use(express.json());

app.use("/api/users",userRouter);

app.use("/api/ngo",ngoRouter);

app.use("/image/api",imageRouter);

app.use("/send/sms",Notification);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })