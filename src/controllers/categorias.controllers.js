import CategoriaServices from '../services/categorias.services.js'

export default class CategoriaController {
    static async create(req, res) {
        try {
            const newCategory = await CategoriaServices.createCategory(req.body);
            return res.status(201).json({ message: "Cadastro bem-sucedido!", category: newCategory })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getAll(req, res) {
        try {
            const category = await CategoriaServices.findAllCategorys()
            return res.status(200).json({ message: "Busca bem-sucedida", qtd: category.length, categorys: category })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getById(req, res) {
        try {
            const category = await CategoriaServices.findCategoryById(req.params.id)
            if (!category) return res.status(404).json({ error: "categoria não encontrado" });

            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async update(req, res) {
        try {
            const category = await CategoriaServices.findCategoryById(req.params.id)
            if (!category) return res.status(404).json({ error: "categoria não encontrado" });

            const updated = await CategoriaServices.updateCategory(req.params.id, req.body)
            return res.status(200).json({ message: "Categoria atualizada com sucesso", user: updated })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async delete(req, res) {
        try {
            const deletado = await CategoriaServices.deleteCategory(req.params.id)
            if (!deletado) return res.status(404).json({ error: "categoria não encontrado" });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }


}
