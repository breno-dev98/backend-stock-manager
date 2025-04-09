import AuthService from '../services/auth.services.js'

export default class AuthController {
    static async login(req, res) {
        try {
            const user = await AuthService.login(req.body);
            return res.status(200).json({message: "Login realizado com sucesso!", user})
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }
}
