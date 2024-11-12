// import jwt from 'jsonwebtoken';

// export default async (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({
//             status: 'error',
//             message: 'Unauthorized',
//             err: 'Access denied'
//         });
//     }
//     try {
//         const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).json({
//             status: 'error',
//             message: 'Invalid token',
//             err: error.message
//         });
//     }
// };