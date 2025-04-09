import UsuarioRepository from "../repositories/usuarios.repository.js";

export default class UsuarioServices {
    static async createUser(data) {
        const userExists = await UsuarioRepository.findByEmail(data.email);
        if (userExists) {
            throw new Error("Email já cadastrado");
        }
        
        return await UsuarioRepository.create(data)
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