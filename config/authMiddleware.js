const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    // Ignorar autenticação para a rota de criação de usuário
    if ((req.path === '/login' || req.path === '/registro') && (req.method === 'POST' || req.method === 'GET')) {
        return next();
    }

    const token = req.headers['authorization'];
    if (!token) {
        console.log('Token não fornecido. Cabeçalho de Autorização ausente.');
        return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('Token expirado.');
                return res.status(403).json({ mensagem: 'Token expirado.' });
            }
            console.log('Erro na verificação do token:', err.message);
            return res.status(403).json({ mensagem: 'Token inválido.' });
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
