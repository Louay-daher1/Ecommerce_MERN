import { cartModel } from "../models/cardModel";

interface CreateCartForUser{
    userId:string;
}
const createCartForUser= async ({userId}:CreateCartForUser)=>{
    const cart=await cartModel.create({userId,totalAmount:0})
    await cart.save();
    return cart;
}
interface GetActiveCartForUser{
    userId:string;
}
export const GetActiveCartForUser =async ({userId}:GetActiveCartForUser)=>{
    let cart = await cartModel.findOne({userId,status:"active"});
    if(!cart){
        cart=await createCartForUser({userId})
    }
    return cart;
}