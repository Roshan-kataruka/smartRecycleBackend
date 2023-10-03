const {createUser,getUser,login,updateUserDetails,totalNumberOfUser,assignVolunteer,getAllFeed,getUserReward,saveUserProfilePic,updateProfilePic} = require("./user.controller");

const router = require("express").Router();

const {checktoken} = require("../../auth/token_validation");

router.post("/",createUser); //done

router.get("/",checktoken,getUser); //done

router.post("/login",login); //done

router.patch("/",checktoken,updateUserDetails);

router.get("/num/user",checktoken,totalNumberOfUser) // done

router.post("/request",checktoken,assignVolunteer); 

router.get("/feed",checktoken,getAllFeed);

router.get("/reward",checktoken,getUserReward);

router.post("/picture",checktoken,saveUserProfilePic)

router.patch("/picture",checktoken,updateProfilePic);

module.exports = router;