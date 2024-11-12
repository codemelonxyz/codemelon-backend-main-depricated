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
        try {
            await pool.getConnection();
            await pool.releaseConnection();
            res.status(200).json({ status: 'Database connection is up and running' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default serverHealthController;