const db = require('../../config/database');


module.exports = {
    create : (data,callback)=>{
        db.beginTransaction();           
        db.query("INSERT INTO `User` (`FirstName`, `MiddleName`, `LastName`, `State`, `City`, `Pin`, `Landmark`, `AadharNo`,`MobileNumber`,`Gender`, `Dob`) VALUES (?,?,?,?,?,?,?,?,?,?,?);",
        [
            data.FirstName,
            data.MiddleName,
            data.LastName,
            data.State,
            data.City,
            data.Pin,
            data.Landmark,
            data.AadharNo,
            data.MobileNumber,
            data.Gender,
            data.Dob
        ],
        (error,results)=>{
            if(error)
            {
                db.rollback()
                return callback(error)
            }
            else
            {
                db.query("select UserID from User where UserID not in (select UserID from User_Login);",
                (error,results)=>{
                    let tempResult=results[0].UserID
                    if(error)
                    {
                        db.rollback();
                        return callback(error)
                    }
                    else{
                        db.query("INSERT INTO User_Login (UserID, LoginPass, LoginEmail) VALUES (?,?,?);",[
                            tempResult,
                            data.pass,
                            data.Email
                        ],
                        (error,results)=>
                        {
                            if(error)
                            {
                                db.rollback();
                                return callback(error)
                            }
                            else if(results)
                            {
                                db.query("INSERT INTO User_Credit (UserID) VALUES (?);",[
                                    tempResult
                                ],(error,results)=>{
                                    if(error)
                                    {
                                        db.rollback();
                                        return callback(error)
                                    }
                                    else{
                                        db.commit();
                                        return callback(null,results);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
        );
    },
    getUser : callback=>{
        db.query(`select * from User`,
        [],
        (error,result)=>{
            if(error)
            {
                return callback(error);
            }
            else{
                return callback(null,result);
            }
        }
        );
    },
    getUserByUserEmail:(Email,callback)=>{
        db.query(`select count(*) as c from User_Login where LoginEmail = ?`,
        [Email],
        (error,results)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,results[0]);
        }
        );
    },
    updateUserDetailsEmail:(data,callback)=>{
        db.query("UPDATE User_Login SET LoginEmail = ? WHERE UserID = ?;",[
            data.Email,
            data.UserID
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    updateUserAadhar:(data,callback)=>{
        db.query("UPDATE User SET AadharNo = ? WHERE UserID = ?;",[
            data.AadharNo,
            data.UserID
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    updateUserMobile:(data,callback)=>{
        db.query("UPDATE User SET MobileNumber = ? WHERE UserID = ?;",[
            data.MobileNumber,
            data.UserID
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    updateUser:(data,callback)=>{
        db.query("UPDATE User SET FirstName = ?, MiddleName = ?, LastName = ?, State = ?, City = ?, Pin = ?, Landmark = ?,Gender = ?, Dob = ? WHERE UserID = ?;",[
            data.FirstName,
            data.MiddleName,
            data.LastName,
            data.State,
            data.City,
            data.Pin,
            data.Landmark,
            data.Gender,
            data.Dob,
            data.UserID
        ],(error,results)=>
        {
            console.log(results);
            if(error)
            {
                callback(error);
            }
            else{
                    return callback(null,results);
                }
                })
    },
    checkUserRepeatMobile: (body,callback)=>{
        db.query("select count(*) as c from User where MobileNumber=?",
            [
                body.MobileNumber
            ],
            (error,results)=>
            {
                if(error)
                {
                    return callback(error)
                }
                else{
                    return callback(null,results[0]);
                }
            }
        );
    },
    checkUserRepeatAadhar: (body,callback)=>{
        db.query("select count(*) as c from User where AadharNo=?",
            [
                body
            ],
            (error,results)=>
            {
                if(error)
                {
                    return callback(error)
                }
                else{
                    return callback(null,results[0]);
                }
            }
        );
    },
    getNumberOfUser:(callback)=>{
        db.query("select count(*) as c from User",(error,result)=>{
            if(error)
                {
                    return callback(error)
                }
                else{
                    return callback(null,result);
                }
        })
    },
    getLatLon : (callback)=>{
        db.query("select Latitude, Longitude,AreaCovered,GID from Volunteer_Group",(error,result)=>{
            if(error)
                {
                    return callback(error)
                }
                else{
                    return callback(null,result);
                }
        })
    },
    checkUserEmailPass:(data,callback)=>{
        db.query("select count(*) as c,LoginEmail,LoginPass,UserID from User_Login where LoginEmail = ? and LoginPass= ?;",
        [data.LoginEmail,
        data.LoginPass
        ],
        (error,results)=>{
            //console.log(results);
            if(error)
            {
                callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getUserDetailsByID:(data,callback)=>{
        db.query(`select * from User where UserID=?`,
        [data],
        (error,results)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getUserDetailsOfEmailByID:(data,callback)=>{
        db.query(`select * from User_Login where UserID=?`,
        [data],
        (error,results)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,results);
        }
        );
    },
    assignRequest:(data,callback)=>{
        //console.log(data.VolunteerGroupID);
        data["Status"]="Assigned";
        db.query("INSERT INTO Request (ApproxWeight, TimeStamp, Status, VolunteerGroupID, Type, UserID, Latitude, Longitude, PickUpDate) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?);",[
            data.ApproxWeight,
            data.TimeStamp,
            data.Status,
            data.VolunteerGroupID,
            data.Type,
            data.UserID,
            data.Lat,
            data.Lon,
            data.PickUpDate
        ],(error,result)=>{
            //console.log(result);
            if(error)
            {
                console.log("hello 1234 ");
                callback(error);
            }
            return callback(null,result);
        })
    },
    getFeed:(callback)=>{
        db.query("select * from Feed where FeedEnable=1;",(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    getReward:(data,callback)=>{
        db.query("select CreditValue from User_Credit where UserID=?;",[
            data.UserID
        ],(error,result)=>{
            //console.log(result);
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    saveUserPic:(data,callback)=>{
        db.query("INSERT INTO User_Profile_Pic (UserID, UserPic) VALUES (?, ?);",[
            data.UserID,
            data.UserPic
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    getUserRewardPointTable:(data,callback)=>{
        db.query("select RewardTag, Description, RewardIcon from Reward where MinPoints<=? order by MinPoints desc limit 1;",[
            data.UserRewardPoint
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    updatePic:(data,callback)=>{
        db.query("UPDATE User_Profile_Pic SET UserPic = ? WHERE UserID = ?;",[
            data.UserPic,
            data.UserID
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    }
};