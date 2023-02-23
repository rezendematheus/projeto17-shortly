import { Router } from "express";
import { urlShorter, getUrlId, deleteUrl, urlIncreaseView } from "../controllers/urls.controller.js";

const urlRoutes = Router();

urlRoutes.post('/urls/shorten', urlShorter);
urlRoutes.get('/urls/:id', getUrlId);
urlRoutes.get('/urls/open/:shortUrl', deleteUrl);
urlRoutes.delete('/urls/:id', urlIncreaseView);

export default urlRoutes