import { verifyToken } from "../helpers/jwt.js";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({error: "Token inválido ou expirado"})
    }
}