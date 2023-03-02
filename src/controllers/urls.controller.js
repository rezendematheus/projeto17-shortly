import { nanoid } from "nanoid";
import { db } from "../database/database.connection.js";

export async function urlShorter(req, res) {
    try {
        const { authorization } = req.headers;
        const { url } = req.body;

        const token = authorization.replace("Bearer ", "");
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        if (!session.rows[0]) res.status(401).send();

        const shortUrl = nanoid(8);
        await db.query(`INSERT INTO "shortUrls" ("userId", url, "shortUrl", visits) VALUES ($1, $2, $3, 0)`, [session.rows[0].userId, url, shortUrl]);

        const response = await db.query(`SELECT * FROM "shortUrls" WHERE "shortUrl" = $1`, [shortUrl]);
        res.status(201).send({ id: response.rows[0].id, shortUrl });
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function getUrlId(req, res) {
    try {
        const { id } = req.params

        const shortUrl = await db.query(`SELECT * FROM "shortUrls" WHERE id = $1`, [id])

        if (!shortUrl.rows[0]) return res.status(404).send()

        const responseObj = { id: shortUrl.rows[0].id, shortUrl: shortUrl.rows[0].shortUrl, url: shortUrl.rows[0].url}
        res.send(shortUrl.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function urlIncreaseView(req, res) {
    try {
        const { shortUrl } = req.params;

        const uri = await db.query(`
            SELECT url, id 
            FROM "shortUrls" 
            WHERE "shortUrl" = $1
        `, [shortUrl])

        if (!uri.rows[0]) return res.status(404).send()

        await db.query(`
            UPDATE "shortUrls" 
            SET visits = visits + 1
            WHERE id=$1
        `, [uri.rows[0].id])
        res.redirect(uri.rows[0].url)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export async function deleteUrl(req, res) {
    try {
        const { id } = req.params
        const { authorization } = req.headers;

        const token = authorization.replace("Bearer ", "");
        const session = await db.query(`
            SELECT sessions."userId"
            FROM sessions 
            WHERE token = $1
        `, [token]);

        const shortUrl = await db.query(`
            SELECT "shortUrls"."userId"
            FROM "shortUrls"
            WHERE id = $1
        `, [id])
        
        if (!session.rows[0]) return res.status(401).send();
        if (!shortUrl.rows[0]) return res.status(404).send()
        if (session.rows[0].userId !== shortUrl.rows[0].userId) return res.status(401).send()

        await db.query(`
            DELETE FROM "shortUrls"
            WHERE id=$1
        `, [id])
        res.status(204).send()
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}