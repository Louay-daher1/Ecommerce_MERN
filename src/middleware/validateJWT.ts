import { NextFunction , Request,Response} from "express";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/userModel";
import { ExtendRequest } from "../types/ExtendRequest";


 

const validateJWT=(req:ExtendRequest,res:Response,next:NextFunction)=>{
const authorizationHeader=req.get('authorization');
        if(!authorizationHeader){
         res.status(403).send("Authorization header was not provide");
         return;
        }
        const token=authorizationHeader.split(" ")[1];
        if(!token){ //!token y3ne ya null ya undefind aw fadiye
            res.status(403).send("Brear token not found")
            return;
        }
  jwt.verify(token,'kI4VggDD18+ZCrkftymVBFlD0fwjs+hvHJkfKBVMsWFWWTBjuFmn2CMeR5glF/e',async(err,payload)=>{
    if(err){
        res.status(403).send("Invalid Token");
        return;
    }
    if(!payload){
        res.status(403).send("Invalid token payload")
        return;
    }
    const userPayload=payload as {email:string,firstName:string,lastName:string};
    //fetch user from database based on the payload
    const user=await UserModel.findOne({email:userPayload.email})
    req.user=user;
    next();
  })
}
export default validateJWT;