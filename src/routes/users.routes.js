import { Router } from "express";
import { getUserMe } from "../controllers/users.controller.js";

const usersRoutes = Router();

usersRoutes.get('/users/me', getUserMe);

export default usersRoutes;