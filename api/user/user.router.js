const {createUser,getUser,login,updateUserDetailsBasic,totalNumberOfUser,assignVolunteer,getAllFeed,getUserReward,saveUserProfilePic,updateProfilePic,updateUserEmail,updateUserMobileNo,getUserRewardIcon} = require("./user.controller");

const router = require("express").Router();

const {checktoken} = require("../../auth/token_validation");

router.post("/",createUser); //done Complete

router.post("/userdetails",checktoken,getUser); //done Complete

router.post("/login",login); //done Complete

router.patch("/",checktoken,updateUserDetailsBasic); // Complete 

router.patch("/email",checktoken,updateUserEmail); // Complete

router.patch("/mobno",checktoken,updateUserMobileNo); // Complete

router.get("/num/user",checktoken,totalNumberOfUser) // done Complete

router.post("/request",checktoken,assignVolunteer);  // COMPLETE

router.get("/feed",checktoken,getAllFeed);  //Complete

router.get("/reward",checktoken,getUserReward); // Complete

router.post("/picture",checktoken,saveUserProfilePic);

router.patch("/picture",checktoken,updateProfilePic);

router.get("/reward/icon",checktoken,getUserRewardIcon); //Complete

module.exports = router;