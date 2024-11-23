import pool from '../config/db.config.js';

class idVerificationCodesModel {
    static async addToken(user_id, code) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `INSERT INTO idVerificationCodes (user_id, code) VALUES (?, ?)`;
            await connection.query(query, [user_id, code]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateIsUsed(code) {
        let connection;
        try {
            connection = await pool.getConnection();
            // Update isUsed to 1 where the code matches
            const query = `UPDATE idVerificationCodes SET isUsed = 1 WHERE code = ?`;
            await connection.query(query, [code]);

            // Retrieve the user_id associated with the code
            const [rows] = await connection.query("SELECT user_id FROM idVerificationCodes WHERE code = ?", [code]);
            if (rows.length === 0) {
                return false;
            }
            const userId = rows[0].user_id;

            // Update the user's isVerified status to 1
            const queryUpdateUser = `UPDATE user SET isVerified = 1 WHERE id = ?`;
            await connection.query(queryUpdateUser, [userId]);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }

    static async isCodeUsed(code) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT isUsed FROM idVerificationCodes WHERE code = ?`;
            const [rows] = await connection.query(query, [code]);
            if (rows.length > 0) {
                return rows[0].isUsed === 1;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getTokenData(code) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM idVerificationCodes WHERE code = ?`;
            const [rows] = await connection.query(query, [code]);
            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }
}

export default idVerificationCodesModel;