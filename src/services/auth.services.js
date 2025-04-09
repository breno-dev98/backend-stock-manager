import { comparePassword } from "../helpers/hashPassword.js";
import UsuarioRepository from "../repositories/usuarios.repository.js";

export default class AuthService {
    static async login(data) {
        const user = await UsuarioRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Usuário ou senha inválidos");
        }

        const senhaValida = await comparePassword(data.senha, user.senha);
        if (!senhaValida) {
            throw new Error("Usuário ou senha inválidos");
        }

        const userData = user.get({plain: true})
        const {senha, createdAt, updatedAt, ...dadosLimpos} = userData
        return dadosLimpos;
    }
}