const router = require("express").Router();

const {login,addNewVolunteer,listVolunteer,updateExistingVolunteer,addReward} = require("./ngo.controller");

const {checktoken} = require("../../auth/token_validation");

router.post("/login",login);

router.post("/",checktoken,addNewVolunteer);

router.get("/",checktoken,listVolunteer);

router.patch("/",checktoken,updateExistingVolunteer)

router.post("/reward",addReward);

//router.post("/feed",addFeed);

module.exports = router;