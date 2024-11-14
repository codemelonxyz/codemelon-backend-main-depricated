import pool from "../config/db.config.js";

class userModel {
    constructor() {
    }

    static async searchUser(search) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE username LIKE ? OR email LIKE ?`;
            const [rows] = await connection.query(query, [search.email, search.password]);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    // admin - access req (***)
    static async convertUserToAdmin(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `UPDATE user SET admin = 1 WHERE id = ?`;
            await connection.query(query, [id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getUserByEmail(email) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE email = ?`;
            const [rows] = await connection.query(query, [email]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    static async deleteUser(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `DELETE FROM user WHERE id = ?`;
            await connection.query(query, [id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }

    static async updateUser(data) {
        if (data.admin) data.admin = 0;
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `UPDATE user SET ? WHERE id = ?`;
            await connection.query(query, [data, data.id]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    };

    static async checkEmailAvailability(email) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE email = ?`;
            const [rows] = await connection.query(query, [email]);
            return rows.length === 0;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    };

    static async getAllUsers(skip, limit) {
        if (!skip) skip = 0;
        if (!limit || limit > 50) limit = 10;
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user LIMIT ?, ?`;
            const [rows] = await connection.query(query, [parseInt(skip), parseInt(limit)]);
            return rows;
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    static async getUserById(id) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE id = ?`;
            const [rows] = await connection.query(query, [id]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    };

    static async getUserByUsername(username) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE username = ?`;
            const [rows] = await connection.query(query, [username]);
            return rows[0];
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            if (connection) connection.release();
        }
    }

    static async checkUsernameAvailability(username) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `SELECT * FROM user WHERE username = ?`;
            const [rows] = await connection.query(query, [username]);
            return rows.length === 0;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }

    static async createUser(data) {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;
            await connection.query(query, [data.id, data.username ,data.email, data.password]);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }

    static async createTable() {
        let connection;
        try {
            connection = await pool.getConnection();
            const query = `CREATE TABLE IF NOT EXISTS user (
                            id VARCHAR(255) PRIMARY KEY,
                            username VARCHAR(255) NOT NULL UNIQUE,
                            email VARCHAR(255) NOT NULL UNIQUE,
                            password VARCHAR(255) NOT NULL,
                            admin BOOLEAN DEFAULT 0,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                        )`;
            await connection.query(query);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        } finally {
            if (connection) connection.release();
        }
    }
};

export default userModel;