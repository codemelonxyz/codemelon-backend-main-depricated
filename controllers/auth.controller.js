import userModel from "../models/user.model.js";
import bcryptServices from "../services/bcrypt.services.js";
import jwtServices from "../services/jwt.services.js";
import uuidServices from "../services/uuid.services.js";
import MailServices from "../services/mail.services.js";
import fs from 'fs';
import idVerificationCodesModel from "../models/idVerificationCodes.model.js";

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
            // Generate verification token and store it in the database
            const verificationToken = await uuidServices.createToken();
            await idVerificationCodesModel.addToken(id, verificationToken);
            const mailService = new MailServices();
            // Read signup email template
            const signupTemplate = fs.readFileSync('./mailTemplates/signup.html', 'utf8');
            // Send signup successful email
            await mailService.sendMailToUser({
                to: email,
                subject: 'Welcome to CodeMelon!',
                html: signupTemplate
            });
            // Read verification email template
            let verificationTemplate = fs.readFileSync('./mailTemplates/verificationMail.html', 'utf8');
            // Replace placeholder with the verification link
            const verificationLink = `https://api.codemelon.xyz/verify?token=${verificationToken}`;
            verificationTemplate = verificationTemplate.replace('{{verification_link}}', verificationLink);
            // Send verification email
            await mailService.sendMailToUser({
                to: email,
                subject: 'Verify Your Email - CodeMelon',
                html: verificationTemplate
            });
            res.status(201).json({ message: 'User created successfully' });
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

    static async verifyEmail(req, res) {
        try {
            const { token } = req.query;
            if (!token) {
                return res.status(400).json({ error: 'Verification token is required' });
            }

            // Check if the token exists and is not used
            const isUsed = await idVerificationCodesModel.isCodeUsed(token);
            if (isUsed === null) {
                return res.status(400).json({ error: 'Invalid verification token' });
            }
            if (isUsed) {
                return res.status(400).json({ error: 'Verification token has already been used' });
            }

            // Get the user associated with the token
            const codeData = await idVerificationCodesModel.getTokenData(token);
            if (!codeData) {
                return res.status(400).json({ error: 'Invalid verification token' });
            }

            // Update user's isVerified status
            const userId = codeData.user_id;
            await userModel.verifyUser(userId);

            // Mark the token as used
            await idVerificationCodesModel.updateIsUsed(token);

            res.status(200).json({ message: 'Email verified successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }

};

export default authController;