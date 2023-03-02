import { db } from "../database/database.connection.js";
import bcrypt from 'bcrypt';
import {v4 as uuidV4} from 'uuid'

export async function signUp(req, res) {
    const {name, email, password} = req.body;

    try {
        const emailExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(emailExists.rows[0]) return res.status(409).send();

        const hashPwd = bcrypt.hashSync(password, 10);

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hashPwd]);

        res.status(201).send();

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function signIn(req, res) {
    const {email, password} = req.body;
    
    try {

        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(!user.rows[0]) return res.status(401).send();
        
        const hashPwd = user.rows[0].password;
        const passwordIsValid = bcrypt.compareSync(password, hashPwd);
        if(!passwordIsValid) return res.status(400).send("authentication failed");

        const token = uuidV4();
        const userId = user.rows[0].id;
        await db.query(`INSERT INTO sessions ("userId", "token") VALUES ($1, $2)`, [userId, token]);
        res.status(201).send(token)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}