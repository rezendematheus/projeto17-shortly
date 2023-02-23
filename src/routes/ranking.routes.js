import { Router } from "express";
import { getRanking } from "../controllers/ranking.controller.js";

const rankingRoutes = Router();

rankingRoutes.get('/ranking', getRanking);

export default rankingRoutes;