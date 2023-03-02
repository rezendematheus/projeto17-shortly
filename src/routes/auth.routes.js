import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/schemaValidation.js";
import { signUpSchema, signInSchema } from "../schemas/auth.schema.js";


const authRoutes = Router();

authRoutes.post('/signup', validateSchema(signUpSchema), signUp);
authRoutes.post('/signin', validateSchema(signInSchema), signIn);

export default authRoutes;