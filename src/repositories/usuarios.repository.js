import usuarios from "../models/usuarios.js";

export default class UsuarioRepository {
    static async create(data) {
        return await usuarios.create(data);
    }

    static async findAll() {
        return await usuarios.findAll();
    }

    static async findByEmail(email) {
        return await usuarios.findOne({ where: { email } });
    }

    static async findById(id) {
        return await usuarios.findByPk(id);
    }

    static async update(id, data) {
        const usuario = await usuarios.findByPk(id);
        if (!usuario) return null;

        await usuarios.update(data, { where: { id } });
        return usuario;
    }

    static async delete(id) {
        const usuario = await usuarios.findByPk(id);
        if (!usuario) return null;

        await usuarios.destroy({ where: { id } });
        return true;
    }
}