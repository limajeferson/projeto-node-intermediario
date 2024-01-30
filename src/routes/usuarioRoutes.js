const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/usuarioController');
const { authenticateToken } = require('../../config/authMiddleware');

// Rota para exibir a página de registro
router.get('/registro', UsuarioController.exibirPaginaRegistro);

// Rota para cadastrar um usuário
router.post('/registro', UsuarioController.cadastrarUsuario);

// Rota para exibir a página de login
router.get('/login', UsuarioController.exibirPaginaLogin);

// Rota para fazer login
router.post('/login', UsuarioController.loginUsuario);

module.exports = router;