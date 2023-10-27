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
                    LogoutResponse: "Invalid Token"
                })
            }
            else{
                let data = decode.results[0].NgoID;
                req.body["NgoID"]=data
                console.log(data);
                next();
            }
            })
        }
        else{
            res.json({
                status :0,
                unauthResponse: "Access denied! unauthorized"
            });
        }
    }
};

