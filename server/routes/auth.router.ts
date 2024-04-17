import express from "express"

import{
  login, register, getUsersController
} from "../controllers/auth.controller";

import {requireSuperAdmin} from "../middlewares/middleware"


const authRouter=express.Router();


authRouter.post('/signin', login);
authRouter.get('/users', getUsersController);
authRouter.post('/register', requireSuperAdmin,register)

export {authRouter}