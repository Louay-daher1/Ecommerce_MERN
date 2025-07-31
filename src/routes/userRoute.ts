import express from 'express';
import { register, login } from '../services/userService';
import { UserModel } from '../models/userModel';
const router=express.Router();
 router.post('/register', async (req, res) => {
    const {firstName,lastName,email,password}=req.body;

    const {statusCode,data}=await register({firstName,lastName,email,password});
    res.status(statusCode).send(data);

 })
router.post('/login', async (req, res) => {
    const {email,password}=req.body;    
    const {statusCode,data}=await login({email,password});
    res.status(statusCode).send(data);
})
export default router;