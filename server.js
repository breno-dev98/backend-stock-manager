import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { connectDB } from './src/config/db.js'
import routes from './src/routes/routes.js'
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())
app.use("/api", routes)

app.get('/', (req, res) => {
    res.send("Bem Vindo ao Servidor!")
})

const startServer = async () => {
    await connectDB()

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`)
    })
}

startServer()