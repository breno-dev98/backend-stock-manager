import marcas from "../models/marcas.js";

export default class MarcasRepository {
    static async create(data) {
        return await marcas.create(data);
    }

    static async findAll() {
        return await marcas.findAll();
    }

    static async findByName(nome) {
        return await marcas.findOne({ where: { nome } });
    }

    static async findById(id) {
        return await marcas.findByPk(id);
    }

    static async findByUser(id) {
        return await marcas.findAll({ where: { user_id: id } })
    }

    static async update(id, data) {
        const categoria = await marcas.findByPk(id);
        if (!categoria) return null;

        await marcas.update(data, { where: { id } });
        return categoria;
    }

    static async delete(id) {
        const categoria = await marcas.findByPk(id);
        if (!categoria) return null;

        await marcas.destroy({ where: { id } });
        return true;
    }
}