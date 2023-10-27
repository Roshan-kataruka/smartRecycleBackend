const router = require("express").Router();

const {login,addNewVolunteer,listVolunteer,updateExistingVolunteer,addReward,getAllFeed,userRequestPending, userRequestCompleted,completeUserRequest,showVolunteerGroups,newVolunteerGroup,updateExistingVolunteerGroup,getVolunteerCount,getVolunteerGroupCount,pendingRequestCount,completedRequestCount,alterFeedDisplay} = require("./ngo.controller");

const {checktoken} = require("../../auth/token_validation_NGO");
const { route } = require("./ngo.router");

router.post("/login",login);

router.post("/",checktoken,addNewVolunteer);

router.get("/",checktoken,listVolunteer);

router.patch("/",checktoken,updateExistingVolunteer);

router.post("/reward",checktoken,addReward);

router.get("/request/pendingdetails",checktoken,userRequestPending);

router.get("/request/completeddetails",checktoken,userRequestCompleted);

router.patch("/request/update",checktoken,completeUserRequest)

router.get("/volunteergroup",checktoken,showVolunteerGroups)

router.post("/add/volunteergroup",checktoken,newVolunteerGroup)

router.patch("/update",checktoken,updateExistingVolunteerGroup)

router.get("/volunteer/count",checktoken,getVolunteerCount)

router.get("/volunteergroup/count",checktoken,getVolunteerGroupCount)

router.get("request/pendingcount",checktoken,pendingRequestCount)

router.get("request/completedcount",checktoken,completedRequestCount)


//router.post("/feed",addFeed); //update feed 

router.get("/feeddetails",checktoken,getAllFeed);

router.patch("/feed/update",checktoken,alterFeedDisplay);




module.exports = router;