import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/urls.routes.js";
import rankingRoutes from "./routes/ranking.routes.js";

dotenv.config()

if(process.env.MODE === "dev"){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
console.log(process.env.MODE)
const app = express()

app.use(cors())
app.use(express.json())

app.use([authRoutes, urlRoutes, rankingRoutes, usersRoutes])

app.listen(process.env.PORT, () => console.log(`server is listening PORT ${process.env.PORT}` ))