import express from "express";
import { addItemToCart, GetActiveCartForUser, updateItemInCart } from "../services/cartService";
import validateJWT from "../middleware/validateJWT";
import { ExtendRequest } from "../types/ExtendRequest";

const router = express.Router();

router.get('/',validateJWT,async (req:ExtendRequest,res)=>{
    //getActiveCartUser
    //TODO:GET THE USERid FOM THE JWT AFTER VALIDATING FROM MIDDLWARE
    const userId=req.user._id
    const cart=await GetActiveCartForUser({userId})
    res.status(200).send(cart)
} )
router.post('/items',validateJWT,async(req:ExtendRequest,res)=>{
     const userId=req.user._id;
     const {productId,quantity}=req.body;
     const response=await addItemToCart({userId,productId,quantity})
     res.status(response.statusCode ?? 500).send(response.data)
})
router.put('/items',validateJWT,async(req:ExtendRequest,res)=>{
     const userId=req.user._id;
     const {productId,quantity}=req.body;
     const response=await updateItemInCart({userId,productId,quantity})
     res.status(response.statusCode ?? 500).send(response.data)
})
export default router