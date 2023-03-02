import { Router } from "express";
import { urlShorter, getUrlId, deleteUrl, urlIncreaseView } from "../controllers/urls.controller.js";
import { urlSchema } from "../schemas/url.shema.js";
import validateSchema from "../middlewares/schemaValidation.js";
const urlRoutes = Router();

urlRoutes.post('/urls/shorten', validateSchema(urlSchema), urlShorter);
urlRoutes.get('/urls/:id', getUrlId);
urlRoutes.get('/urls/open/:shortUrl', urlIncreaseView);
urlRoutes.delete('/urls/:id', deleteUrl );

export default urlRoutes