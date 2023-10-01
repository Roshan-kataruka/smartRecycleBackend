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
                    success:0,
                    message: "Invalid Token"
                })
            }
            else{
                next();
            }
            })
        }
        else{
            res.json({
                success:0,
                message: "Access denied! unauthorized"
            });
        }
    }
};

