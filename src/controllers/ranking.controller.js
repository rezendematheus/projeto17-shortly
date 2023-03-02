import { db } from "../database/database.connection.js";

export async function getRanking(req, res){
    try {
        const ranking = await db.query(`
            SELECT users.id AS id, name, COUNT("shortUrls") AS "linksCount",COALESCE(SUM("shortUrls".visits), 0) AS "visitCount"
            FROM users
            LEFT JOIN "shortUrls"
            ON users.id = "shortUrls"."userId"
            GROUP BY users.id
            ORDER BY COALESCE(SUM("shortUrls".visits), 0) desc
            LIMIT 10
        `)

        res.send(ranking.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}