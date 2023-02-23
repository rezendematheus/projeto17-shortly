import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post('/signup', signUp);
authRoutes.post('/signin', signIn);

export default authRoutes;