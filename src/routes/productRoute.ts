import express from "express";
import { gettAllProducts } from "../services/productService";
const router = express.Router();
router.get('/',async(req,res)=>{
    const products = await gettAllProducts();
    res.status(200).send(products);
});

export default router;