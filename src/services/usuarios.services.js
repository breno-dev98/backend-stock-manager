import UsuarioRepository from "../repositories/usuarios.repository.js";
import { hashPassword } from "../helpers/hashPassword.js";

export default class UsuarioServices {
    static async createUser(data, req) {
        const senhaCriptografada = await hashPassword(data.senha)
        const userExists = await UsuarioRepository.findByEmail(data.email);
        if (userExists) {
            throw new Error("Email já cadastrado");
        }
        const usuario = {
            ...data,
            senha: senhaCriptografada,
            adminId: req.user.papel === 'ADMIN' ? req.user.id : null
        }
        return await UsuarioRepository.create(usuario)
    }

    static async findAllUsers() {
        return await UsuarioRepository.findAll()
    }

    static async findById(id) {
        return await UsuarioRepository.findById(id)
    }

    static async updateUser(id, data) {
       return await UsuarioRepository.update(id, data)
    }

    static async deleteUser(id) {
       return await UsuarioRepository.delete(id)

    }
}