import { cartModel } from "../models/cardModel";
import { productModel } from "../models/productModel";

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
interface ClearCart{
    userId:string;
}
export const clearCart=async({userId}:ClearCart)=>{
    const cart= await GetActiveCartForUser({userId});
    cart.items=[];
    cart.totalAmount=0;
    const updatedCart=await cart.save();
    return{data:updatedCart,statusCode:200}

}
interface AddItemToCart{
productId:any;
quantity:number;
userId:string
}
export const addItemToCart=async({productId,quantity,userId}:AddItemToCart)=>{
    const cart= await GetActiveCartForUser({userId});
    const existingproduct=cart.items.find((p)=>p.product.toString()===productId);
    if(existingproduct){
        return{data:"item Already exist in cart!",status:400};
    }
    const product=await productModel.findById(productId);
    if(!product){
        return{data:"Product Not found!!",statuscode:400}
    }
    if(product.stock<quantity){
        return{data:"Low stock quantity",statusCode:400}
    }
    cart.items.push({product:productId,unitPrice:product.price,quantity});
    cart.totalAmount+=product.price*quantity;
    const updatedCart=await cart.save()
    return {data:updatedCart,statusCode:200}


}

interface updateItemToCart{
productId:any;
quantity:number;
userId:string
}
export const updateItemInCart=async ({productId,quantity,userId}:updateItemToCart)=>{
    const cart= await GetActiveCartForUser({userId})
    const existsIncart=cart.items.find((p)=>p.product.toString()===productId);
    if(!existsIncart){
        return {data:"Item does not exist in cart",statusCode:200};
    }
     const product=await productModel.findById(productId);
        if(!product){
        return{data:"Product Not found!!",statuscode:400}
        }
      if(product.stock<quantity){
        return{data:"Low stock quantity",statusCode:400}
    }
    existsIncart.quantity=quantity
    const othercarttotalItems=cart.items.filter((p)=>p.product.toString()!==productId);
    let total=othercarttotalItems.reduce((sum,product)=>{
        sum+=product.quantity*product.unitPrice;
        return sum;
    },0)
    total+=existsIncart.quantity*existsIncart.unitPrice;
    cart.totalAmount=total;
    const updatedCart=await cart.save();
    return{data:updatedCart,statusCode:200}
}
interface DeleteItemInCart{
    productId:any;
    userId:string;
}
export const deleteItemInCart=async({productId,userId}:DeleteItemInCart)=>{
    const cart= await GetActiveCartForUser({userId})
 const existsIncart=cart.items.find((p)=>p.product.toString()===productId);
    if(!existsIncart){
        return {data:"Item does not exist in cart",statusCode:200};
    }
    const othercarttotalItems=cart.items.filter((p)=>p.product.toString()!==productId);
    const total=othercarttotalItems.reduce((sum,product)=>{
        sum+=product.quantity*product.unitPrice;
        return sum;
    },0)
    cart.items=othercarttotalItems;
    cart.totalAmount=total;
        const updatedCart=await cart.save();
    return{data:updatedCart,statusCode:200}
}