import pool from "../config/db.config.js";

class userModel {
    constructor() {
    }

    // admin - access req (***)
    static async convertUserToAdmin(id) {
        try {
            const query = `UPDATE user SET admin = 1 WHERE id = ?`;
            const [rows] = await pool.query(query, [id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async getUserByEmail(email) {
        try {
            const query = `SELECT * FROM user WHERE email = ?`;
            const [rows] = await pool.query(query, [email]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static deleteUser(id) {
        try {
            const query = `DELETE FROM user WHERE id = ?`;
            pool.query(query, [id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async updateUser(data) {
        if (data.admin) data.admin = 0;
        try {
            const query = `UPDATE user SET ? WHERE id = ?`;
            const [rows] = await pool.query(query, [data, data.id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    static async checkEmailAvailability(email) {
        try {
            const query = `SELECT * FROM user WHERE email = ?`;
            const [rows] = await pool.query(query, [email]);
            return rows.length === 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    static async getAllUsers(skip, limit) {
        if (!skip) skip = 0;
        if (!limit || limit > 50) limit = 10;

        try {
            const query = `SELECT * FROM user LIMIT ?, ?`;
            const [rows] = await pool.query(query, [parseInt(skip), parseInt(limit)]);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    static async getUserById(id) {
        try {
            const query = `SELECT * FROM user WHERE id = ?`;
            const [rows] = await pool.query(query, [id]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    static async getUserByUsername(username) {
        try {
            const query = `SELECT * FROM user WHERE username = ?`;
            const [rows] = await pool.query(query, [username]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    static async checkUsernameAvailability(username) {
        try {
            const query = `SELECT * FROM user WHERE username = ?`;
            const [rows] = await pool.query(query, [username]);
            return rows.length === 0;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    static async createUser(data) {
        try {
            const query = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
            const [rows] = await pool.query(query, data);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    static async createTable() {
        try {
            const query = `CREATE TABLE IF NOT EXISTS user (
                            id VARCHAR(255) PRIMARY KEY,
                            username VARCHAR(255) NOT NULL,
                            email VARCHAR(255) NOT NULL,
                            password VARCHAR(255) NOT NULL,
                            admin BOOLEAN DEFAULT 0,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                        )`;
            await pool.query(query);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }


};

export default userModel;