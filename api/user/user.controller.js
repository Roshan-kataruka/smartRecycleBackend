const { JsonWebTokenError } = require("jsonwebtoken");

const {convertToLonLatFormat} = require("../../function/formatterFunction")

const {getRoutingData} = require("../../function/geoApifyFunction")

const {create,getUserByUserEmail,updateUser,checkUserRepeatAadhar,checkUserRepeatMobile,getNumberOfUser,getLatLon,checkUserEmailPass,getUserDetailsByID,assignRequest,getFeed,getReward,saveUserPic,updatePic,getUserDetailsOfEmailByID,updateUserDetailsEmail,updateUserMobile,getUserRewardPointTable} = require("./user.service");

const {sign} = require("jsonwebtoken");

module.exports = {
    createUser : (req,res) =>{
        const body = req.body;
        getUserByUserEmail(body.Email,(error,result)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer: "Database Connection Error"
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
                checkUserRepeatAadhar(body.AadharNo,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer: "Database Connection Error"
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
                        checkUserRepeatMobile(body.MobileNumber,(error,result)=>{
                            if(error){
                                console.log(error);
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponseServer: "Database Connection Error"
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
                                create(body,(error,result)=>{
                                    if(error){
                                        console.log(error);
                                        return res.status(500).json({
                                            status : 0,
                                            invalidResponseServer: "Database Connection Error"
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
    getUser : (req,res)=>{
        getUserDetailsByID(req.body.UserID,(error,response)=>{
            if(error)
            {
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                    getUserDetailsOfEmailByID(req.body.UserID,(error,result)=>{
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
                                message : result,
                                message1 : response
                            });
                        }
                    })
                }
        });
    },
    login: (req,res)=>{
        const body = req.body;
        checkUserEmailPass(body,(err,result)=>
        {
            if(err)
            {
                console.log(err);
                return res.json({
                    success:0,
                    invalidResponseServer: "Database Connection Error"
                });
            }
            console.log(result);
            if(result[0].c==0)
            {
                return res.json({
                    success:0,
                    invalidResponse: "Invalid username or password"
                });
            }
            if(result[0].c==1)
            {
                result[0].LoginPass=undefined;
                const jsontoken = sign({results: result},"qs45dex",
                {expiresIn: "30d"

                });
                return res.json({
                    success:1,
                    message:"Login Successfully",
                    token: jsontoken,
                    UserID: result[0].UserID
                })
            }
            else{
                return res.json({
                    success:0,
                    invalidResponseServer: "Database Connection Error"
                });
            }
        })
    },
    updateUserDetailsBasic : (req,res) =>{
        const body = req.body;
        updateUser(body,(error,result)=>{
            if(error){
                //console.log(error);
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
    updateUserMobileNo:(req,res)=>{
        const body = req.body;
        checkUserRepeatMobile(body,(error,result)=>{
            if(error)
            {
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result.c==1)
            {
                return res.status(409).json({
                    status : 0,
                    invalidResponse : "Mobile Number Already Exists"
                });
            }
            else{
                updateUserMobile(body,(error,result)=>{
                    if(error)
                    {
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
    },
    updateUserEmail:(req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.Email,(error,result)=>{
            //console.log(result)
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else if(result.c==1)
            {
                return res.status(409).json({
                    status : 0,
                    invalidResponse : "Email Already Exists"
                });
            }
            else{
                updateUserDetailsEmail(body,(error,result)=>{
                    if(error)
                    {
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
                        });
                    }
                    else{
                        console.log(result.affectedRows);
                        return res.status(200).json({
                            status : 1,
                            message : result.affectedRows
                        });
                    }
                })
            }
        })
    },
    totalNumberOfUser : (req,res)=>{
        getNumberOfUser((error,result)=>{
            if(error)
            {
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
    assignVolunteer :(req,res)=>{
        let body = req.body;
        let userLat = body.Lat;
        let userLon = body.Lon;
        let minDistance = 9007199254740;
        let tempGID = null;
        getLatLon((error,results)=>{
            if(error){
                //console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                let noOfGroup = results.length;
                async function findNearestGroup() {
                  
                    for (let i = 0; i < noOfGroup; i++) {
                      const volLat = results[i].Latitude;
                      const volLon = results[i].Longitude;
                      const volAreaCovered = results[i].AreaCovered;
                      const groupID = results[i].GID;
                  
                      const formattedDistance = convertToLonLatFormat(userLat, userLon, volLat, volLon);
                        //console.log(formattedDistance);
                      try {
                        const result = await getRoutingData(formattedDistance);
                  
                        //console.log('API Result:', result);
                  
                        let temp = result / 1000;

                        //console.log(temp);
                        
                  
                        if (temp <= volAreaCovered && temp < minDistance) {
                          
                          minDistance = temp;
                          tempGID = groupID;
                          
                        }
                      } catch (error) {
                        console.error('Database Connection Error');
                        return;
                      }
                    }
                  
                    return {
                      minDistance,
                      tempGID,
                    };
                  }
                  findNearestGroup()
                    .then((response) => {
                      if (response.minDistance !== 9007199254740) {
                            //console.log("Hello "+ response.tempGID);
                            body["VolunteerGroupID"] = response.tempGID;
                            //console.log(body.VolunteerGroupID);
                            assignRequest(body,(error,result)=>{
                                if(error){
                                    //console.log(error);
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
                            } else {
                                return res.status(500).json({
                                    status : 0,
                                    invalidResponse : "No eligible group found."
                                });
                            }
                            })
                            .catch((error) => {
                            console.error(error);
                            });
            }
        })
    },
    getAllFeed:(req,res)=>{
        getFeed((error,results)=>{
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
                    message : results
                });
            }
        })
    },
    getUserReward:(req,res)=>{
        getReward(req.body,(error,results)=>{
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
                    message : results
                });
            }
        })
    },
    saveUserProfilePic:(req,res)=>{
        saveUserPic(req.body,(error,result)=>{
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
    updateProfilePic:(req,res)=>{
        updatePic(req.body,(error,result)=>{
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
    getUserRewardIcon:(req,res)=>{
        let body=req.body;
        getReward(body,(error,result)=>{
            if(error)
            {
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    invalidResponseServer : "Database Connection Error"
                });
            }
            else{
                let reward1 = result[0].CreditValue;
                body["UserRewardPoint"] = reward1;
                getUserRewardPointTable(body,(error,result)=>{
                    if(error){
                        console.log(error);
                        return res.status(500).json({
                            status : 0,
                            invalidResponseServer : "Database Connection Error"
                        });
                    }
                    else{
                        if(result[0]==undefined)
                        {
                            return res.status(200).json({
                                status : 1,
                                invalidResponse : "Not Eligible For Icon"
                            });
                        }
                        else{
                            return res.status(200).json({
                                status : 1,
                                message : result
                            });
                        }
                    }
                })
            }
            /*return res.status(200).json({
                status : 1,
                message : result
            });*/
        })
    },
};