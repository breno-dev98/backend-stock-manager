import { exec } from 'child_process';
import path from 'path'
import dotenv from 'dotenv';
dotenv.config();

const configPath = path.resolve('./config.json')

// Comando que será executado
const command = `npx sequelize-auto --config ${configPath} -o ./src/models -l esm --noInitModels`

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Erro ao gerar models: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }
    console.log(stdout);
});
