// middleware/autorizar.js
export function autorizar(...papeisPermitidos) {
    return (req, res, next) => {
        const papel = req.user.papel;

        if (!papeisPermitidos.includes(papel)) {
            return res.status(403).json({ mensagem: 'Acesso negado.' });
        }

        next();
    };
}
