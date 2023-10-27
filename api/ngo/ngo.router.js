const router = require("express").Router();

const {login,addNewVolunteer,listVolunteer,updateExistingVolunteer,addReward,getAllFeed,userRequestPending, userRequestCompleted,completeUserRequest,showVolunteerGroups,newVolunteerGroup,updateExistingVolunteerGroup} = require("./ngo.controller");

const {checktoken} = require("../../auth/token_validation_NGO");
const { route } = require("./ngo.router");

router.post("/login",login);

router.post("/",checktoken,addNewVolunteer);

router.get("/",checktoken,listVolunteer);

router.patch("/",updateExistingVolunteer);

router.post("/reward",addReward);

router.get("/reuest/pending",checktoken,userRequestPending);

router.get("/request/completed",checktoken,userRequestCompleted);

router.patch("/request/update",checktoken,completeUserRequest)

router.get("/volunteergroup",checktoken,showVolunteerGroups)

router.post("/add/volunteergroup",checktoken,newVolunteerGroup)

router.patch("/update",checktoken,updateExistingVolunteerGroup)

//router.post("/feed",addFeed); //update feed 

router.get("/feed",getAllFeed);//view all Request
//Notification 
//getAll Notification


module.exports = router;