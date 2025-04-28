import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import sequelize from './src/config/db.js'
import routes from './src/routes/routes.js'
import { setupModels } from './src/models/index.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use("/api", routes)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send("Bem Vindo ao Servidor!")
})

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.')

        setupModels(sequelize)

        await sequelize.sync({ alter: true })
        console.log('📦 Models sincronizados com o banco de dados.')

        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`)
        })
    } catch (error) {
        console.error('❌ Erro ao iniciar o servidor:', error)
        process.exit(1)
    }
}

startServer()