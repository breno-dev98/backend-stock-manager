//./src/config/db.js
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

if (!process.env.PGHOST) {
    console.error("❌ A variavel de ambiente PGHOST não foi encontrada")
    process.exit(1)
}
if (!process.env.PGDATABASE) {
    console.error("❌ A variavel de ambiente PGDATABASE não foi encontrada")
    process.exit(1)
}
if (!process.env.PGUSER) {
    console.error("❌ A variavel de ambiente PGUSER não foi encontrada")
    process.exit(1)
}
if (!process.env.PGPASSWORD) {
    console.error("❌ A variavel de ambiente PGPASSWORD não foi encontrada")
    process.exit(1)
}
const sequelize = new Sequelize({
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})


export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({alter: true})
        console.log('📦 Models sincronizados com o banco de dados.');
    } catch (error) {
        console.error('❌ Não foi possível conectar ao banco de dados:', error);
        process.exit(1)
    }
}

export default sequelize;