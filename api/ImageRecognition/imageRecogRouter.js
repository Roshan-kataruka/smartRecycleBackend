// routes/clarifaiRoutes.js

const express = require('express');
const clarifaiController = require("../ImageRecognition/imageController");
const router = express.Router();

router.post('/clarifai', clarifaiController.analyzeImage);

router.post("/",(req,res)=>{
    res.send("Hello");
})

module.exports = router;
