const jwt =require("jsonwebtoken")


function verifyToken(req,res,next){
   
        const token=req.header("Authorization")
        if(!token){
            return res.status(400).send({msg:"access denied"})
        }
        try {
            const decoded=jwt.verify(token,"bhanu")
            req.userID=decoded.userID;
            
            next()
            
        } catch (error) {
            return res.status(500).send(error)
            
        }
        
    

}


module.exports={verifyToken}