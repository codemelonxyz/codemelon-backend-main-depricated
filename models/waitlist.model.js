import pool from '../config/db.config.js';

class waitlistModel {
    constructor() {
        
    }

    static async getWaitlistWatermelon() {
        try {
            const query = `SELECT * FROM waitlistWatermelon`
            const [rows] = await pool.execute(query);
            return rows
        } catch (err) {
            return false
        }
    }

    static async checkWaitlistWatermelon(user_id) {
        try {
            const query = `SELECT id FROM waitlistWatermelon WHERE user_id = ?`
            const [rows] = await pool.execute(query, [user_id]);
            if (rows.length > 0) {
                return [true, rows[0].id]
            }
            return [false]
        } catch (err) {
            return [false]
        }
    }

    static async joinWaitlistWatermelon(user_id) {
        try {
            const query = `INSERT INTO waitlistWatermelon (user_id) VALUES (?)`
            const [rows] = await pool.execute(query, [user_id]);
            console.log(rows)
            return [true, rows.insertId]
        } catch (err) {
            return [false]
        }
    }

}


export default waitlistModel;