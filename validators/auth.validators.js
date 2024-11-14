import userModel from "../models/user.model.js";

class authValidator {
    constructor() {
        
    }

    static async validateSignup(req, res, next) {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // testing mail
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        //testing password
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: 'Password must contain at least one uppercase letter, one lowercase letter and one number' });
        }

        //testing username  everything is allowed execpt special characters (execption _)
        const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ error: 'Username must contain only letters, numbers and underscores' });
        }
        
        // sql injection
        const sqlRegex = /(\b)(drop|select|truncate|delete|update|insert|create|alter)(\b)/;
        if (sqlRegex.test(username) || sqlRegex.test(email) || sqlRegex.test(password)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        // if username and email available
        const user = await userModel.checkEmailAvailability(email);
        if (user === false) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const userByUsername = await userModel.getUserByUsername(username);
        if (userByUsername) {
            return res.status(400).json({ error: 'Username already in use' });
        }

        next();
    }

    static async validateLogin(req, res, next) {
        const { identity, password } = req.body;
        if (!identity || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        //testing mail
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(identity)) {
            req.body.username = identity;
        } else {
            req.body.email = identity;
        }

        // sql injection
        const sqlRegex = /(\b)(drop|select|truncate|delete|update|insert|create|alter)(\b)/;
        if (sqlRegex.test(identity) || sqlRegex.test(password)) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        next();
    }
}

export default authValidator;