import MarcasRepository from "../repositories/marcas.repository.js";

export default class MarcaServices {
    static async createMarca(data) {
        const marcaExists = await MarcasRepository.findByName(data.nome);
        if (marcaExists) {
            throw new Error("Marca já cadastrada");
        }
        
        return await MarcasRepository.create(data)
    }

    static async findAllMarcas() {
        return await MarcasRepository.findAll()
    }
    static async findMarcaByUser(id) {
        return await MarcasRepository.findByUser(id)
    }

    static async findMarcaById(id) {
        return await MarcasRepository.findById(id)
    }

    static async updateMarca(id, data) {
       return await MarcasRepository.update(id, data)
    }

    static async deleteMarca(id) {
       return await MarcasRepository.delete(id)

    }
}