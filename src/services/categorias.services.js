import CategoriaRepository from "../repositories/categorias.repository.js";

export default class UsuarioServices {
    static async create(data) {
        const categoryExists = await CategoriaRepository.findByName(data.nome);
        if (categoryExists) {
            throw new Error("Categoria já cadastrada");
        }
        
        return await CategoriaRepository.create(data)
    }

    static async findAll() {
        return await CategoriaRepository.findAll()
    }

    static async findById(id) {
        return await CategoriaRepository.findById(id)
    }

    static async update(id, data) {
       return await CategoriaRepository.update(id, data)
    }

    static async delete(id) {
       return await CategoriaRepository.delete(id)

    }
}