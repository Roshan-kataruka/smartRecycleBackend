const db = require('../../config/database');


module.exports = {
    getNgoByNgoEmail:(data,callback)=>{
        db.query(`select *,Count(*) as c from Ngo_Login where NgoEmail = ? and NgoPass=?`,
        [data.NgoEmail,
        data.NgoPass
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
    addVolunteer : (data,callback)=>{
        db.query("INSERT INTO Volunteer (VName, Age, Gender, NgoID, State, City, Pin, MobileNo, Email, AadharNo,GroupID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",[
            data.VName,
            data.Age,
            data.Gender,
            data.NgoID,
            data.State,
            data.City,
            data.Pin,
            data.MobileNo,
            data.Email,
            data.AadharNo,
            data.GroupID
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,results[0]);
        });
    },
    viewVolunteer : (callback)=>{
        db.query("select VID,VName,Age,Gender,State,City,Pin,MobileNo,Email,AadharNo,GroupName from Volunteer inner join Volunteer_Group;",(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        });
    },
    updatevolunteerDetails : (data,callback)=>{
        db.query("UPDATE Volunteer SET VName = ?, Age = ?, Gender = ?, NgoID = ?, State = ?, City = ?, Pin = ?, MobileNo = ?, Email = ?, AadharNo= ?, GroupID = ? WHERE VID = ?;",[
            data.VName,
            data.Age,
            data.Gender,
            data.NgoID,
            data.State,
            data.City,
            data.Pin,
            data.MobileNo,
            data.Email,
            data.AadharNo,
            data.GroupID,
            data.VID
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            return callback(null,result);
        })
    },
    checkRepeatMobileVounteer : (data,callback)=>{
        db.query("select count(*) as c from Volunteer where MobileNo = ?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    checkRepeatEmailVounteer : (data,callback)=>{
        db.query("select count(*) as c from Volunteer where Email = ?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    checkRepeatAadharVounteer : (data,callback)=>{
        db.query("select count(*) as c from Volunteer where AadharNo = ?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    addGroup : (data,callback)=>{
        db.query("INSERT INTO Volunteer_Group (GroupName, NgoID, Latitude, Longitude, AreaCovered) VALUES (?, ?, ?, ?, ?);",[
            data.GroupName,
            data.NgoID,
            data.Latitude,
            data.Longitude,
            data.AreaCovered
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    checkForGroupName: (data,callback)=>{
        db.query("select count(*) as c from Volunteer_Group where GroupName=?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    checkForGroupLatLon: (data,callback)=>{
        db.query("select count(*) as c from Volunteer_Group where Latitude = ? and Longitude = ? ",[
            data.Latitude,
            data.Longitude
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    listAllGroupName : (callback)=>{
        db.query("select GroupName from Volunteer_Group;",(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        })
    },
    updateVolunteerGroup: (data,callback)=>{
        db.query("UPDATE Volunteer_Group SET GroupName = ?, NgoID = ?, Latitude = ?, Longitude = ?, AreaCovered = ? WHERE GID = ?;",[
            data.GroupName,
            data.NgoID,
            data.Latitude,
            data.Longitude,
            data.AreaCovered,
            data.GID
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        })
    },
    addNewReward:(data,callback)=>{
        db.query("INSERT INTO `Reward` (RewardTag, Description, RewardIcon, MinPoints, NgoID) VALUES (?, ?, ?, ?, ?)",[
            data.RewardTag,
            data.Description,
            data.RewardIcon,
            data.MinPoints,
            data.NgoID
        ],(error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    checkForRepeatRewardTag:(data,callback)=>{
        db.query("select count(*) as c from Reward where RewardTag=?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    checkForRepeatRewardDesc:(data,callback)=>{
        db.query("select count(*) as c from Reward where Description=?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    checkForRepeatRewardMinPoint:(data,callback)=>{
        db.query("select count(*) as c from Reward where MinPoints=?",[
            data
        ],(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        });
    },
    getVolunteerGroupLatLon : (callback)=>{
        db.query("select Latitude,Longitude from Volunteer_Group;",(error,results)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,results);
            }
        })
    },
    getFeed:(callback)=>{
        db.query("select * from Feed;",(error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    getAllUserRequestPending:(callback)=>{
        db.query("select * from Request where Status=?;",
        ["Assigned"],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    getAllUserRequestCompleted:(callback)=>{
        db.query("select * from Request where Status=?;",[
        "Completed"],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    setCompleteUserRequest:(data,callback)=>{
        db.query("update Request set Status = ?, ActualWeight=? where RequestID=?;",
        [
            "Completed",
            data.actualWeight,
            data.RequestID
        ],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    setUserRewardPoints:(data,callback)=>{
        db.query("update User_Credit set CreditValue = ? where UserID=?;",
        [
           data.reward,
           data.UserID
        ],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    listVolunteerGroup:(callback)=>{
        db.query("select GID,GroupName from Volunteer_Group;",
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    addVolunteerGroup:(data,callback)=>{
        db.query("INSERT INTO `Volunteer_Group` (`GroupName`, `NgoID`, `Latitude`, `Longitude`, `AreaCovered`) VALUES (%s, %s, %s, %s, %s);",
        [
           data.GroupName,
           data.NgoID,
           data.Latitude,
           data.Longitude,
           data.AreaCovered
        ],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    uniqueGroupName:(data,callback)=>{
        db.query("select count(*) as 'c' from Volunteer_Group where GroupName=? ;",
        [
           data.GroupName,
        ],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    getDetailsByVolunteerGroupId:(data,callback)=>{
        db.query("select GroupName,Latitude,Longitude,AreaCovered from Volunteer_Group  where GID=? ;",
        [
           data.GID,
        ],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    },
    updateVolunteerGroupDetails:(data,callback)=>{
        db.query("update Volunteer_Group set GroupName=? ,Latitude=? ,Longitude=? ,AreaCovered=? where GID=? ;",
        [
           data.GroupName,
           data.Latitude,
           data.Longitude,
           data.AreaCovered,
           data.GID
        ],
        (error,result)=>{
            if(error)
            {
                callback(error);
            }
            else{
                return callback(null,result);
            }
        })
    }
};