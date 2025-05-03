import Produtos from "../models/produtos.js";

export default class ProdutosRepository {
    static async create(data) {
        return await Produtos.create(data);
    }

    static async findAll(req) {
        if (req.user.papel === "ADMIN") {
            return await Produtos.findAll({where: {user_id: req.user.id}});
        }
    }

    static async findByName(nome) {
        return await Produtos.findOne({ where: { nome } });
    }

    static async findById(id) {
        return await Produtos.findByPk(id);
    }

    static async findByUser(id) {
        return await Produtos.findAll({ where: { user_id: id } })
    }

    static async update(id, data) {
        const produto = await Produtos.findByPk(id);
        if (!produto) return null;

        await Produtos.update(data, { where: { id } });
        return produto;
    }

    static async delete(id) {
        const produto = await Produtos.findByPk(id);
        if (!produto) return null;

        await Produtos.destroy({ where: { id } });
        return true;
    }
}