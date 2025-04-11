import { niveisDeAcesso } from '../utils/niveisDeAcesso.js'

export function verificarCriacaoUsuarioPermitida(req, res, next) {
    const papelUsuarioLogado = req.user.papel        // ex: ADMIN
    const papelUsuarioCriadoOuEditado = req.body.papel  // ex: MODERADOR

    // Dono pode tudo
    if (papelUsuarioLogado === 'OWNER') {
        return next()
    }

    const nivelLogado = niveisDeAcesso[papelUsuarioLogado]
    const nivelAlvo = niveisDeAcesso[papelUsuarioCriadoOuEditado]

    // Validação: papel inválido
    if (!nivelAlvo) {
        return res.status(400).json({ mensagem: 'Papel inválido informado.' })
    }

    // Verifica se o usuário está tentando alterar seu próprio nível
    if (req.user.id === req.params.id || req.user.id === req.body.id) {
        if (nivelAlvo !== nivelLogado) {
            return res.status(403).json({ mensagem: 'Você não pode alterar seu próprio nível de acesso.' })
        }
    }

    // Verifica se está tentando criar ou alterar para um nível igual ou superior
    if (nivelAlvo >= nivelLogado) {
        return res.status(403).json({ mensagem: 'Você só pode atribuir papéis de nível inferior ao seu.' })
    }

    next()
}
