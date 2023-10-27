const router = require("express").Router();

const {sendMessage} = require('./Notification.controller');

router.post('', sendMessage);


module.exports = router;