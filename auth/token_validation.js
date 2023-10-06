const {verify} = require("jsonwebtoken");

module.exports = {
    checktoken : (req,res,next) =>{
        let token = req.get("authorization");
        if(token)
        {
            token = token.slice(7);
            verify(token,"qs45dex",(err,decode)=>{
            if(err)
            {
                res.json({
                    status :0,
                    message: "Invalid Token"
                })
            }
            else{
                let data = decode.results[0].UserID;
                req.body["UserID"]=data
                //console.log(req.body.UserID);
                next();
            }
            })
        }
        else{
            res.json({
                status :0,
                message: "Access denied! unauthorized"
            });
        }
    }
};

