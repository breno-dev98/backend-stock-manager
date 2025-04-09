import CategoriaRepository from "../repositories/categorias.repository.js";

export default class CategoriaServices {
    static async createCategory(data) {
        const categoryExists = await CategoriaRepository.findByName(data.nome);
        if (categoryExists) {
            throw new Error("Categoria já cadastrada");
        }
        
        return await CategoriaRepository.create(data)
    }

    static async findAllCategorys() {
        return await CategoriaRepository.findAll()
    }

    static async findCategoryById(id) {
        return await CategoriaRepository.findById(id)
    }

    static async updateCategory(id, data) {
       return await CategoriaRepository.update(id, data)
    }

    static async deleteCategory(id) {
       return await CategoriaRepository.delete(id)

    }
}