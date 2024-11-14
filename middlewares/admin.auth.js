import jwtServices from "../services/jwt.services.js";

export default async (req, res, next) => {
    const token = req.header('authorization').replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized',
            err: 'Access denied'
        });
    }
    try {
        const payload = await jwtServices.decodeToken(token);
        if (!payload.isAdmin) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                err: 'Access denied'
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid token',
            err: error.message
        });
    }
};