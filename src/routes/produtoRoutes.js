const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtoController');
const { authenticateToken } = require('../../config/authMiddleware');

// Rota para cadastrar um produto
router.post('/cadastrar', authenticateToken, ProdutoController.cadastrarProduto);

// Rota para editar um produto
router.put('/editar/:id', authenticateToken, ProdutoController.editarProduto);

// Rota para excluir um produto
router.delete('/excluir/:id', authenticateToken, ProdutoController.excluirProduto);

// Rota para listar produtos
router.get('/listar', ProdutoController.listarProdutos);

module.exports = router;