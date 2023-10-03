const {createUser,getUser,login,updateUserDetails,totalNumberOfUser,assignVolunteer,getAllFeed,getUserReward,saveUserProfilePic,updateProfilePic} = require("./user.controller");

const router = require("express").Router();

const {checktoken} = require("../../auth/token_validation");

router.post("/",createUser); //done Complete

router.get("/",checktoken,getUser); //done Complete

router.post("/login",login); //done Complete

router.patch("/",checktoken,updateUserDetails); // Complete

router.get("/num/user",checktoken,totalNumberOfUser) // done Complete

router.post("/request",checktoken,assignVolunteer);  // COMPLETE

router.get("/feed",checktoken,getAllFeed);  //Complete

router.get("/reward",checktoken,getUserReward); // Complete

router.post("/picture",checktoken,saveUserProfilePic) 

router.patch("/picture",checktoken,updateProfilePic);

module.exports = router;