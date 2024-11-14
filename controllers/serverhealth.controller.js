import pool from "../config/db.config.js";

class serverHealthController {
    constructor() {
    }

    static async getServerHealth(req, res) {
        try {
            res.status(200).json({ status: 'Server is up and running' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async checkDatabaseConnection(req, res) {
        let connection;
        try {
            connection = await pool.getConnection();
            res.status(200).json({ status: 'Database connection is up and running' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        } finally {
            if (connection) connection.release();
        }
    }
}

export default serverHealthController;