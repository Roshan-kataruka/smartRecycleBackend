const {sign} = require("jsonwebtoken");

const {getNgoByNgoEmail,addVolunteer,viewVolunteer,checkRepeatAadharVounteer,checkRepeatEmailVounteer,checkRepeatMobileVounteer,updatevolunteerDetails,addNewReward,checkForRepeatRewardTag,checkForRepeatRewardDesc,checkForRepeatRewardMinPoint,getFeed,getAllUserRequestPending,getAllUserRequestCompleted,setCompleteUserRequest,setUserRewardPoints,listVolunteerGroup,addVolunteerGroup,uniqueGroupName,updateVolunteerGroupDetails,getTotalVolunteersCount,getTotalVolunteersGroupCount,getPendingRequestCount,getCompletedRequestCount,updateFeedDisplay,getVolunteerGroupNameWithId} = require("./ngo.service");

module.exports = {
    login: (req,res)=>{
        const body = req.body;
        getNgoByNgoEmail(body,(err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.json({
                    success:0,
                    invalidResponseServer: "Database Connection Error"
                });
            }
            //console.log(result);
            if(result[0].c==0)
            {
                return res.json({
                    success:0,
                    invalidResponse: "Invalid username or password"
                });
            }
            if(result[0].NgoEmail===body.NgoEmail && result[0].NgoPass===body.NgoPass)
            {
                result.NgoEmail=undefined;
                const jsontoken = sign({results: result},"qs45dex",
                {expiresIn: "30d" });
                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token: jsontoken,
                    NgoID: result[0].NgoID
                })
            }
            else{
                return res.json({
                    success:0,
                    invalidResponse: "Invalid username or password"
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
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result.c>=1)
            {
                return res.status(500).json({
                    status : 0,
                    invalidResponse : "Email Already Exists"
                });
            }
            else{
                checkRepeatAadharVounteer(body.AadharNo,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
                        });
                    }
                    else if(result.c>=1)
                    {
                        return res.status(500).json({
                            status : 0,
                            invalidResponse : "Aadhar Already Exists"
                        });
                    }
                    else{
                        checkRepeatMobileVounteer(body.MobileNumber,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponseServer : "Database Connection Error"
                                });
                            }
                            else if(result.c>=1)
                            {
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponse : "Mobile Already Exists"
                                });
                            }
                            else{
                                addVolunteer(body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            invalidResponseServer : "Database Connection Error"
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
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result
                });
            }
        });
    },
    updateExistingVolunteer:(req,res)=>{
        checkRepeatEmailVounteer(req.body.Email,(error,result)=>{
            //console.log(result)
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result[0].c>1)
            {
                return res.status(500).json({
                    status : 0,
                    invalidResponse : "Email Already Exists"
                });
            }
            else{
                checkRepeatAadharVounteer(req.body.AadharNo,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
                        });
                    }
                    else if(result[0].c>1)
                    {
                        return res.status(500).json({
                            status : 0,
                            invalidResponse : "Aadhar Already Exists"
                        });
                    }
                    else{
                        checkRepeatMobileVounteer(req.body.MobileNo,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponseServer : "Database Connection Error"
                                });
                            }
                            else if(result[0].c>1)
                            {
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponse : "Mobile Already Exists"
                                });
                            }
                            else{
                                updatevolunteerDetails(req.body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            invalidResponseServer : "Database Connection Error"
                                        });
                                    }
                                    else{
                                        return res.status(200).json({
                                            status : 1,
                                            message : result.affectedRows
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
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result.c>=1)
            {
                return res.status(500).json({
                    status : 0,
                    invalidResponse : "Tagline already Exists"
                });
            }
            else{
                checkForRepeatRewardDesc(body.Description,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
                        });
                    }
                    else if(result.c>=1)
                    {
                        return res.status(500).json({
                            status : 0,
                            invalidResponse : "Description Already Exists"
                        });
                    }
                    else{
                        checkForRepeatRewardMinPoint(body.MinPoints,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponseServer : "Database Connection Error"
                                });
                            }
                            else if(result.c>=1)
                            {
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponse : "Minimum Point Already Exists"
                                });
                            }
                            else{
                                addNewReward(body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            invalidResponseServer : "Database Connection Error"
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
                    invalidResponseServer : "Database Connection Error"
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
    userRequestPending:(req,res)=>{
        getAllUserRequestPending(req.body,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
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
    userRequestCompleted:(req,res)=>{
        getAllUserRequestCompleted((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
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
    completeUserRequest:(req,res)=>{
        let reward = req.body.actualWeight*50
        req.body['reward']=reward
        setCompleteUserRequest(req.body,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                setUserRewardPoints(req.body,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
                        });
                    }
                    else{
                        return res.status(200).json({
                            status : 1,
                            message : "Done"
                        });
                    }
                })
            }
        })
    },
    showVolunteerGroups:(req,res)=>{
        listVolunteerGroup((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
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
    newVolunteerGroup:(req,res)=>{
        uniqueGroupName(req.body,(error,result)=>{
            if(error)
            {
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result.c>0)
            {
                return res.status(500).json({
                    status : 0,
                    invalidResponse : "Group Name Already Exists"
                });
            }
            else{
                addVolunteerGroup(req.body,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
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
    },
    updateExistingVolunteerGroup:(req,res)=>{
        uniqueGroupName(req.body,(error,result)=>{
            if(error)
            {
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result.c>0)
            {
                return res.status(500).json({
                    status : 0,
                    invalidResponse : "Group Name Already Exists"
                });
            }
            else{
                updateVolunteerGroupDetails(req.body,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
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
    },
    getVolunteerCount:(req,res)=>{
        getTotalVolunteersCount((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result[0].c
                });
            }
        })
    },
    getVolunteerGroupCount:(req,res)=>{
        getTotalVolunteersGroupCount((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result[0].c
                });
            }
        })
    },
    pendingRequestCount:(req,res)=>{
        getPendingRequestCount((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result[0].c
                });
            }
        })
    },
    completedRequestCount:(req,res)=>{
        getCompletedRequestCount((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result[0].c
                });
            }
        })
    },
    alterFeedDisplay:(req,res)=>{
        updateFeedDisplay(req.body,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                return res.status(200).json({
                    status : 1,
                    message : result.affectedRows
                });
            }
        })
    },
    volunteerGroupNameWithId:(req,res)=>{
        getVolunteerGroupNameWithId((error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
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