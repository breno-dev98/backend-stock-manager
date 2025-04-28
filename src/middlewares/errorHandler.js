import { ValidationError } from "sequelize";

export function errorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        // Se for erro de validação do Sequelize
        const formattedErrors = err.errors.map(e => ({
            field: e.path,
            message: e.message
        }));

        return res.status(400).json({
            type: "validation",
            errors: formattedErrors
        });
    }

    // Outros tipos de erro
    console.error(err);
    return res.status(500).json({ message: "Erro interno no servidor" });
}
