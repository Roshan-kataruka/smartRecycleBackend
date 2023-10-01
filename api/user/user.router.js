const {createUser,getUser,login,updateUserDetails,totalNumberOfUser,assignVolunteer} = require("./user.controller");

const router = require("express").Router();

const {checktoken} = require("../../auth/token_validation");


router.post("/",createUser); //done

router.get("/",checktoken,getUser); //done

router.post("/login",login); //done

router.patch("/",checktoken,updateUserDetails);

router.get("/num/user",checktoken,totalNumberOfUser) // done

router.post("/request",checktoken,assignVolunteer); 

module.exports = router;