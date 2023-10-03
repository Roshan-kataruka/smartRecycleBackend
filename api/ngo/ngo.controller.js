const {sign} = require("jsonwebtoken");

const {getNgoByNgoEmail,addVolunteer,viewVolunteer,checkRepeatAadharVounteer,checkRepeatEmailVounteer,checkRepeatMobileVounteer,updatevolunteerDetails,addNewReward,checkForRepeatRewardTag,checkForRepeatRewardDesc,checkForRepeatRewardMinPoint,getFeed} = require("./ngo.service");

module.exports = {
    login: (req,res)=>{
        const body = req.body;
        getNgoByNgoEmail(body,(err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            console.log(result);
            if(!result)
            {
                return res.json({
                    success:0,
                    data: "Invalid username or password"
                });
            }
            if(result.NgoEmail===body.NgoEmail && result.NgoPass===body.NgoPass)
            {
                result.NgoEmail=undefined;
                const jsontoken = sign({results: result},"qs45dex",
                {expiresIn: "1h" });
                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token: jsontoken
                })
            }
            else{
                return res.json({
                    success:0,
                    data: "Invalid username or password"
                });
            }
        })
    },
    addNewVolunteer : (req,res)=>{
        const body = req.body;
        checkRepeatEmailVounteer(body.Email,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    message : "Database Connection Error"
                });
            }
            else if(result.c>=1)
            {
                return res.status(500).json({
                    status : 0,
                    message : "Email Already Exists"
                });
            }
            else{
                checkRepeatAadharVounteer(body.AadharNo,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            message : "Database Connection Error"
                        });
                    }
                    else if(result.c>=1)
                    {
                        return res.status(500).json({
                            status : 0,
                            message : "Aadhar Already Exists"
                        });
                    }
                    else{
                        checkRepeatMobileVounteer(body.MobileNumber,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    message : "Database Connection Error"
                                });
                            }
                            else if(result.c>=1)
                            {
                                return res.status(500).json({
                                    status : 0,
                                    message : "Mobile Already Exists"
                                });
                            }
                            else{
                                addVolunteer(body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            message : "Database Connection Error"
                                        });
                                    }
                                    else{
                                        return res.status(200).json({
                                            status : 1,
                                            message : result
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    },
    listVolunteer : (req,res)=>{
        viewVolunteer((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    message : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result[0]
                });
            }
        });
    },
    updateExistingVolunteer:(req,res)=>{
        checkRepeatEmailVounteer(body.Email,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    message : "Database Connection Error"
                });
            }
            else if(result.c>1)
            {
                return res.status(500).json({
                    status : 0,
                    message : "Email Already Exists"
                });
            }
            else{
                checkRepeatAadharVounteer(body.AadharNo,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            message : "Database Connection Error"
                        });
                    }
                    else if(result.c>1)
                    {
                        return res.status(500).json({
                            status : 0,
                            message : "Aadhar Already Exists"
                        });
                    }
                    else{
                        checkRepeatMobileVounteer(body.MobileNumber,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    message : "Database Connection Error"
                                });
                            }
                            else if(result.c>1)
                            {
                                return res.status(500).json({
                                    status : 0,
                                    message : "Mobile Already Exists"
                                });
                            }
                            else{
                                updatevolunteerDetails(body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            message : "Database Connection Error"
                                        });
                                    }
                                    else{
                                        return res.status(200).json({
                                            status : 1,
                                            message : result
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    },
    addReward:(req,res)=>{
        let body = req.body;
        checkForRepeatRewardTag(body.RewardTag,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    message : "Database Connection Error"
                });
            }
            else if(result.c>=1)
            {
                return res.status(500).json({
                    status : 0,
                    message : "Tagline already Exists"
                });
            }
            else{
                checkForRepeatRewardDesc(body.Description,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            message : "Database Connection Error"
                        });
                    }
                    else if(result.c>=1)
                    {
                        return res.status(500).json({
                            status : 0,
                            message : "Description Already Exists"
                        });
                    }
                    else{
                        checkForRepeatRewardMinPoint(body.MinPoints,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    message : "Database Connection Error"
                                });
                            }
                            else if(result.c>=1)
                            {
                                return res.status(500).json({
                                    status : 0,
                                    message : "Minimum Point Already Exists"
                                });
                            }
                            else{
                                addNewReward(body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            message : "Database Connection Error"
                                        });
                                    }
                                    else{
                                        return res.status(200).json({
                                            status : 1,
                                            message : result
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
            
        });
    },
    getAllFeed:(req,res)=>{
        getFeed((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    message : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result
                });
            }
        })
    },
};