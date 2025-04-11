export function verificarPermissaoOwner(req, res, next) {
    if (req.user.papel !== 'OWNER') {
        return res.status(403).json({ mensagem: 'Acesso negado.' })
    }
    next()
}
