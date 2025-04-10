import MarcaServices from '../services/marcas.services.js'

export default class MarcasController {
    static async create(req, res) {
        const dados = {
            ...req.body,
            user_id: req.user.id
        }
        try {

            const newMarca = await MarcaServices.createMarca(dados);
            return res.status(201).json({ message: "Cadastro bem-sucedido!", marcas: newMarca })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getAll(req, res) {
        try {
            const marcas = await MarcaServices.findAllMarcas()
            return res.status(200).json({ message: "Busca bem-sucedida", qtd: marcas.length, marcas: marcas })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getById(req, res) {
        try {
            const marca = await MarcaServices.findMarcaById(req.params.id)
            if (!marca) return res.status(404).json({ error: "marca não encontrado" });

            return res.status(200).json(marca)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async getByUser(req, res) {
        try {
            const marcaByUser = await MarcaServices.findMarcaByUser(req.user.id)
            res.status(200).json(marcaByUser)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async update(req, res) {
        try {
            const marca = await MarcaServices.findMarcaById(req.params.id)
            if (!marca) return res.status(404).json({ error: "marca não encontrado" });

            const updated = await MarcaServices.updateMarca(req.params.id, req.body)
            return res.status(200).json({ message: "Marca atualizada com sucesso", user: updated })
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    static async delete(req, res) {
        try {
            const deletado = await MarcaServices.deleteCategory(req.params.id)
            if (!deletado) return res.status(404).json({ error: "marca não encontrado" });

            return res.status(204).send();
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }


}
