import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config();

const command = `npx sequelize-auto -h ${process.env.PGHOST} -d ${process.env.PGDATABASE} -u ${process.env.PGUSER} -x ${process.env.PGPASSWORD} -p 5432 -e postgres -o ./src/models --lang esm --dialect-options ssl=true`;

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
