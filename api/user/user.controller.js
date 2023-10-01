const { JsonWebTokenError } = require("jsonwebtoken");

const {convertToLonLatFormat} = require("../../function/formatterFunction")

const {getRoutingData} = require("../../function/geoApifyFunction")

const {create,getUser,getUserByUserEmail,updateUser,checkUserRepeatAadhar,checkUserRepeatMobile,getNumberOfUser,getLatLon,checkUserEmailPass,getUserDetailsByEmail} = require("./user.service");

const {sign} = require("jsonwebtoken");

module.exports = {
    createUser : (req,res) =>{
        const body = req.body;
        getUserByUserEmail(body.Email,(error,result)=>{
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
                checkUserRepeatAadhar(body.AadharNo,(error,result)=>{
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
                        checkUserRepeatMobile(body.MobileNumber,(error,result)=>{
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
                                create(body,(error,result)=>{
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

    getUser : (req,res)=>{
        getUserDetailsByEmail(req.body.UserID,(error,result)=>{
            if(error)
            {
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
        });
    },
    login: (req,res)=>{
        const body = req.body;
        checkUserEmailPass(body,(err,result)=>
        {
            if(err)
            {
                console.log(err);
            }
            console.log(result);
            if(result[0].c==0)
            {
                return res.json({
                    success:0,
                    data: "Invalid username or password"
                });
            }
            if(result[0].c==1)
            {
                result.LoginPass=undefined;
                const jsontoken = sign({results: result},"qs45dex",
                {expiresIn: "1h"

                });
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
    updateUserDetails : (req,res) =>{
        const body = req.body;
        getUserByUserEmail(body.Email,(error,result)=>{
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
                checkUserRepeatAadhar(body.AadharNo,(error,result)=>{
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
                        checkUserRepeatMobile(body.MobileNumber,(error,result)=>{
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
                                updateUser(body,(error,result)=>{
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
    totalNumberOfUser : (req,res)=>{
        getNumberOfUser((error,result)=>{
            if(error)
            {
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
        });
    },
    assignVolunteer :(req,res)=>{
        const body = req.body;
        const userLat = body.Lat;
        const userLon = body.Lon;
        let minDistance = 9007199254740;
        let tempGID = null;
        getLatLon((error,results)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    status : 0,
                    message : "Database Connection Error"
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
                  
                      try {
                        const result = await getRoutingData(formattedDistance);
                  
                        //console.log('API Result:', result);
                  
                        let temp = result / 1000;
                        
                  
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
                        return res.status(200).json({
                            status : 1,
                            groupId : response.tempGID
                        });
                      } else {
                        return res.status(500).json({
                            status : 0,
                            message : "No eligible group found."
                        });
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                    });
            }
        })
    },
};