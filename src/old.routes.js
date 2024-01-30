const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuarioController');
const produtoController = require('./controllers/produtoController');
const { authenticateToken } = require('../config/authMiddleware');
const { logRequest } = require('../config/logMiddleware');

// Middleware de logging global
router.use(logRequest);

// Rotas de Usuário
router.post('/cadastro', usuarioController.cadastrarUsuario);
router.post('/login', usuarioController.loginUsuario);

// Middleware de autenticação global (exceto para rotas específicas)
router.use(authenticateToken);

// Rotas de Produto
router.post('/produto', authenticateToken, produtoController.cadastrarProduto);
router.put('/produto/:id', authenticateToken, produtoController.editarProduto);
router.delete('/produto/:id', authenticateToken, produtoController.excluirProduto);
router.get('/produtos', produtoController.listarProdutos);

module.exports = router;