import { db } from "../database/database.connection.js";

export async function getUserMe(req, res) {
    try {
        const { authorization } = req.headers;
        const { url } = req.body;

        const token = authorization.replace("Bearer ", "");
        const session = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        if (!session.rows[0]) res.status(401).send();
        
        const user = await db.query(`
            SELECT users.id AS id, name, COALESCE(SUM("shortUrls".visits), 0) AS "visitCount"
            FROM users
            LEFT JOIN "shortUrls"
            ON users.id = "shortUrls"."userId"
            WHERE users.id = $1
            GROUP BY users.id
        `, [session.rows[0].userId])
        
        const userShortUrls = await db.query(`
            SELECT id, "shortUrl", url, visits AS "visitCount"
            FROM "shortUrls"
            GROUP BY id
        `)
        res.send({...user.rows[0], shortenedUrls: userShortUrls.rows})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}