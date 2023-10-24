const router = require("express").Router();

const {login,addNewVolunteer,listVolunteer,updateExistingVolunteer,addReward,getAllFeed,userRequestPending, userRequestCompleted,completeUserRequest} = require("./ngo.controller");

const {checktoken} = require("../../auth/token_validation");
const { route } = require("./ngo.router");

router.post("/login",login);

router.post("/",checktoken,addNewVolunteer);

router.get("/",checktoken,listVolunteer);

router.patch("/",checktoken,updateExistingVolunteer);

router.post("/reward",addReward);

router.get("/reuest/pending",checktoken,userRequestPending);

router.get("/request/completed",checktoken,userRequestCompleted);

router.patch("/request/update",checktoken,completeUserRequest)

//router.post("/feed",addFeed); //update feed 

router.get("/feed",getAllFeed);//view all Request
//Notification 
//getAll Notification


module.exports = router;