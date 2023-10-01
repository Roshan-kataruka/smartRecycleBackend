const db = require('../../config/database');


module.exports = {
    create : (data,callback)=>{
        db.beginTransaction();           
        db.query("INSERT INTO `User` (`FirstName`, `MiddleName`, `LastName`, `State`, `City`, `Pin`, `Landmark`, `AadharNo`,`MobileNumber`, `LoginID`, `RewardID`,`Gender`, `Dob`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);",
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
            data.LoginID,
            data.RewardID,
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
    updateUser:(data,callback)=>{
       db.beginTransaction()
        db.query("UPDATE User SET FirstName = ?, MiddleName = ?, LastName = ?, State = ?, City = ?, Pin = ?, Landmark = ?, AadharNo = ?, MobileNumber = ?,Gender = ?, Dob = ? WHERE UserID = ?;",[
            data.FirstName,
            data.MiddleName,
            data.LastName,
            data.State,
            data.City,
            data.Pin,
            data.Landmark,
            data.Landmark,
            data.AadharNo,
            data.MobileNumber,
            data.Gender,
            data.Dob,
            data.ID
        ],(error,results)=>
        {
            if(error)
            {
                db.rollback();
                callback(error);
            }
            else{
                db.query("UPDATE User_Login SET LoginPass = ?, LoginEmail = ? WHERE UserID = ?;",[
                    data.Email,
                    data.Pass,
                    data.ID
                ],(error,results)=>{
                    if(error)
                    {
                        db.rollback();
                        callback(error);
                    }
                    else{
                        db.commit();
                        return callback(null,results[0]);
                    }
                })
            }
        })
    },
    checkUserRepeatMobile: (body,callback)=>{
        db.query("select count(*) as c from User where MobileNumber=?",
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
        db.query(`select count(*) as c,LoginEmail,LoginPass from User_Login where LoginEmail = ? and LoginPass= ?`,
        [data.LoginEmail,
        data.LoginPass
        ],
        (error,results)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,results);
        }
        );
    },
    getUserDetailsByEmail:(data,callback)=>{
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
};