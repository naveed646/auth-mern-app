const jwt=require('jsonwebtoken');
const ensureAuthentication=(req, res, next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message: "unauthrized, jwt token is required"});
    }
    try{
        const decode= jwt.verify(auth, process.env.JWT_SEC)
        req.user=decode;
         next()
    }
    catch{
         return res.status(403).json({message: "unauthrized, jwt token is wrong or expired"})
    }
   
}
module.exports={
    ensureAuthentication,
}