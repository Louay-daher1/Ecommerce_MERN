import express from "express";
import { GetActiveCartForUser } from "../services/cartService";
import validateJWT from "../middleware/validateJWT";

const router = express.Router();

router.get('/',validateJWT,async (req,res)=>{
    //getActiveCartUser
    //TODO:GET THE USERid FOM THE JWT AFTER VALIDATING FROM MIDDLWARE
    const userId=req.user._id
    const cart=await GetActiveCartForUser({userId})
    res.status(200).send(cart)
} )

export default router