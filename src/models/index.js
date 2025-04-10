import Categoria from './categorias.js'
import Marcas from './marcas.js'
import Usuarios from './usuarios.js'

function setupModels(sequelize) {
    // Aqui você já importou os models que usam sequelize internamente
    // Eles já estão prontos pra registrar

    // Não precisa definir associações aqui se você já faz isso nos próprios models
    return {
        Categoria,
        Marcas,
        Usuarios
    }
}

export { setupModels }
