import UsuarioRepository from "../repositories/usuarios.repository.js";
import { hashPassword } from "../helpers/hashPassword.js";

export default class UsuarioServices {
    static async createUser(data, req) {
        const senhaCriptografada = await hashPassword(data.senha)
        const userExists = await UsuarioRepository.findByEmail(data.email);
        if (userExists) {
            throw new Error("Email já cadastrado");
        }

        // Definir adminId com base no papel do usuário logado
        let adminId = null;

        // OWNER pode criar qualquer usuário, então ele define o adminId
        if (req.user.papel === 'OWNER') {
            adminId = req.user.id; // O adminId é sempre o do OWNER
        }

        // ADMIN pode criar apenas usuários de nível inferior a ele
        if (req.user.papel === 'ADMIN') {
            adminId = req.user.id; // O adminId é o do ADMIN, já que ele pode criar usuários abaixo dele
        }

        const usuario = {
            ...data,
            senha: senhaCriptografada,
            adminId,
        }
        return await UsuarioRepository.create(usuario)
    }

    static async findAllUsers(req) {
        if (req.user.papel === "OWNER") {
            return await UsuarioRepository.findAll()
        } 
        if (req.user.papel === "ADMIN") {
            return await UsuarioRepository.findAllByAdminId(req.user.id)
        }
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