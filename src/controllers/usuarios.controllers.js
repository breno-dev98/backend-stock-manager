import UsuarioServices from '../services/usuarios.services.js'

class UsuarioController {
    static async create(req, res) {
        try {
            const newUser = await UsuarioServices.createUser(req.body);
            return res.status(201).json({message: "Cadastro bem-sucedido!", user: newUser })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

export default UsuarioController