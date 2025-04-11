import { niveisDeAcesso } from "../utils/niveisDeAcesso.js"

export function verificarPermissaoMinima(papelMinimoPermitido) {
    return (req, res, next) => {
        const papelUsuario = req.user.papel // vem do token decodificado

        if (niveisDeAcesso[papelUsuario] < niveisDeAcesso[papelMinimoPermitido]) {
            return res.status(403).json({ mensagem: 'Acesso negado.' })
        }

        next()
    }
}
