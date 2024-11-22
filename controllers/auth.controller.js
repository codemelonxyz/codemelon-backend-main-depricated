import userModel from "../models/user.model.js";
import bcryptServices from "../services/bcrypt.services.js";
import jwtServices from "../services/jwt.services.js";
import uuidServices from "../services/uuid.services.js";
import MailServices from "../services/mail.services.js";

class authController {
    constructor() {
        
    }

    static async signup(req, res) {
        try {
            let { username, email, password } = req.body;
            password = await bcryptServices.hashPassword(password);
            const id = await uuidServices.createToken();
            const status = await userModel.createUser({id, username, email, password});
            if (status === false) {
                return res.status(400).json({ error: 'Error creating user' });
            }
            const token = await jwtServices.generateToken({id, username, email, isAdmin: 0 }, '3d');
            res.status(201).json({ message: 'User created successfully', token, token_type: 'Bearer', token_expires_in: '24h' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

    static async login(req, res) {
        const { email, username, password } = req.body; 
        let user
        if (email) {
            user = await userModel.getUserByEmail(email);
        } else {
            user = await userModel.getUserByUsername(username);
        }

        if (user) {
            const checkPassword = await bcryptServices.comparePassword(password, user.password);
            if (!checkPassword) {
                return res.status(401).json({ error: "Password is not correct" });
            }
            if (!user.isVerified) {
                return res.status(403).json({ error: "User is not verified. Please verify your Mail" });
            }
            const token = await jwtServices.generateToken({ id: user.id, username: user.username, email: user.email, isAdmin: user.isAdmin, isVerified: 1 }, '3d');
            res.status(201).json({ message: 'User created successfully', token, token_type: 'Bearer', token_expires_in: '3d' });
        } else {
            res.status(404).json({
                error: "User Not Found"
            })
        }
    }

};

export default authController;