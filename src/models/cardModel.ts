import mongoose, { ObjectId, Schema } from "mongoose";
import { Document } from "mongoose";
import { IProduct } from "./productModel";
const CartStatusEnum=['active','completed']
export interface IcartItem  {
    product:IProduct;
    unitPrice:number;
    quantity:number;

}
export interface ICart extends Document{
userId:ObjectId | string;
items:IcartItem[]
totalAmount:number;
status:"active"|"completed"
}
const cartItemSchema=new Schema<IcartItem>({
    product:{type:Schema.Types.ObjectId,ref:'product',required:true,},
    quantity:{type:Number,required:true,default:1},
    unitPrice:{type:Number,required:true}

        
})
const cartSchema=new Schema<ICart>({
userId:{type:Schema.Types.ObjectId,ref:"User",required:true},
items:[cartItemSchema],
totalAmount:{type:Number,required:true},
status:{type:String,enum:CartStatusEnum,default:"active"}


})
export const cartModel=mongoose.model<ICart>("Cart",cartSchema)