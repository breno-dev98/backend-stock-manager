// src/validations/categoria.schema.js
import { z } from "zod";

export const categoriaSchema = z.object({
    nome: z.string({
        required_error: "O campo nome é obrigatório",
        invalid_type_error: "O campo nome deve ser um texto",
}).min(1, "Nome é obrigatório"),
    descricao: z.string({
        required_error: "O campo descricao é obrigatório",
        invalid_type_error: "O campo descricao deve ser um texto",
    }),
});
