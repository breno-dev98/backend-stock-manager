import UsuarioServices from '../services/usuarios.services.js'

class UsuarioController {
    static async create(req, res) {
        try {
            const newUser = await UsuarioServices.createUser(req.body);
            return res.status(201).json({ message: "Cadastro bem-sucedido!", user: newUser })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getAll(req, res) {
        try {
            const usuarios = await UsuarioServices.findAllUsers()
            return res.status(200).json({ message: "Busca bem-sucedida", qtd: usuarios.length, users: usuarios })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getById(req, res) {
        try {
            const usuario = await UsuarioServices.findById(req.params.id)
            if (!usuario) return res.status(404).json({ error: "usuario não encontrado" });

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async update(req, res) {
        try {
            const usuario = await UsuarioServices.findById(req.params.id)
            if (!usuario) return res.status(404).json({ error: "usuario não encontrado" });

            const updated = await UsuarioServices.updateUser(req.params.id, req.body)
            return res.status(200).json({ message: "Usuário atualizado com sucesso", user: updated })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async delete(req, res) {
        try {
            const deletado = await UsuarioServices.deleteUser(req.params.id)
            if (!deletado) return res.status(404).json({ error: "usuario não encontrado" });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }


}

export default UsuarioController