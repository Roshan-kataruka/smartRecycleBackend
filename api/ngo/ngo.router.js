const router = require("express").Router();

const {login,addNewVolunteer,listVolunteer,updateExistingVolunteer,addReward,getAllFeed,userRequestPending, userRequestCompleted,completeUserRequest,showVolunteerGroups,newVolunteerGroup,updateExistingVolunteerGroup,getVolunteerCount,getVolunteerGroupCount,pendingRequestCount,completedRequestCount,alterFeedDisplay,volunteerGroupNameWithId,listRewardsDetails,rewardDetailsRemoval,rewardDetailsUpdation,commandDeleteVolunteer,showCompleteVolunteerGroups,deleteVolunteerGroup} = require("./ngo.controller");

const {checktoken} = require("../../auth/token_validation_NGO");

router.post("/login",login);

router.post("/",checktoken,addNewVolunteer);

router.get("/",checktoken,listVolunteer);

router.patch("/",checktoken,updateExistingVolunteer);

router.post("/vol/del",checktoken,commandDeleteVolunteer)

router.post("/reward",checktoken,addReward);

router.patch("/reward/update",checktoken,rewardDetailsUpdation);

router.get("/reward/list",checktoken,listRewardsDetails);

router.post("/reward/delete",checktoken,rewardDetailsRemoval);

router.post("/request/pendingdetails",checktoken,userRequestPending);

router.get("/request/completeddetails",checktoken,userRequestCompleted);

router.patch("/request/update",checktoken,completeUserRequest)

router.get("/volunteergroup",checktoken,showVolunteerGroups)

router.get("/details/volunteergroup",checktoken,showCompleteVolunteerGroups)

router.post("/add/volunteergroup",checktoken,newVolunteerGroup)

router.delete("/delete/volunteergroup",checktoken,deleteVolunteerGroup)

router.patch("/update",checktoken,updateExistingVolunteerGroup)

router.get("/volunteer/count",checktoken,getVolunteerCount)

router.get("/volunteergroup/count",checktoken,getVolunteerGroupCount)

router.get("/request/pendingcount",checktoken,pendingRequestCount)

router.get("/request/completedcount",checktoken,completedRequestCount)

router.get("/groupname/id",checktoken,volunteerGroupNameWithId)

//router.post("/feed",addFeed); //update feed 

router.get("/feeddetails",checktoken,getAllFeed);

router.patch("/feed/update",checktoken,alterFeedDisplay);

module.exports = router;