import Categoria from './categorias.js'
import Marcas from './marcas.js'
import Usuarios from './usuarios.js'
import Fornecedores from './fornecedores.js'
import Produtos from './produtos.js'
import Entradas from './entradas.js'
import Saidas from './saidas.js'


function setupModels(sequelize) {
    // Aqui você já importou os models que usam sequelize internamente
    // Eles já estão prontos pra registrar

    // Não precisa definir associações aqui se você já faz isso nos próprios models
    return {
        Categoria,
        Marcas,
        Usuarios,
        Fornecedores,
        Produtos,
        Entradas,
        Saidas
    }
}

export { setupModels }
