import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const SECRET = process.env.JWT_SECRET || 'chave_secreta';
export function generateToken(payload) {
    return jwt.sign(payload, SECRET, {expiresIn: "3h"})
}

export function verifyToken(token) {
    return jwt.verify(token, SECRET)
}