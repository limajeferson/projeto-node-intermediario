const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes.js');
const produtoRoutes = require('./produtoRoutes.js');
const { authenticateToken } = require('../../config/authMiddleware');
const { logRequest } = require('../../config/logMiddleware');

// Middleware de logging global
router.use(logRequest);

// Rota para a Página Inicial
router.get('/', (req, res) => {
    res.render('index', { title: 'Página Inicial' });
});

// Rotas de Usuário
router.use('/usuarios', usuarioRoutes);

// Rotas de Produto
router.use('/produtos', produtoRoutes);

// Middleware de autenticação global (aplicado apenas para rotas abaixo deste ponto)
router.use(authenticateToken);

module.exports = router;
