const UsuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secret = process.env.JWT_SECRET;

class UsuarioController {
    static async exibirPaginaRegistro(req, res) {
        // Renderizar a página de registro
        res.render('registro');
    }

    static async cadastrarUsuario(req, res) {
        try {
            const { nome, email, senha, endereco, telefone } = req.body;

            // Verifica se o email já está em uso
            const usuarioExistente = await UsuarioModel.obterUsuarioPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({ mensagem: 'Email já cadastrado' });
            }

            // Hash da senha antes de salvar no banco de dados
            const hashedSenha = await bcrypt.hash(senha, 10);

            // Cria o usuário no banco de dados
            const novoUsuario = await UsuarioModel.criarUsuario(nome, email, hashedSenha, endereco, telefone);

            return res.status(201).json({ id_usuario: novoUsuario.id_usuario });
        } catch (error) {
            console.error('Erro no cadastro de usuário:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async exibirPaginaLogin(req, res) {
        // Renderizar a página de login
        res.render('login');
    }

    static async loginUsuario(req, res) {
        try {
            const { email, senha } = req.body;

            // Obtém o usuário pelo email
            const usuario = await UsuarioModel.obterUsuarioPorEmail(email);

            // Verifica se o usuário existe
            if (!usuario) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            // Verifica a senha
            const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
            if (!senhaCorreta) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            // Gera um token JWT
            const token = jwt.sign({ id_usuario: usuario.id_usuario }, secret, { expiresIn: '1h' });

            // Retorna o token
            return res.status(200).json({ token });
        } catch (error) {
            console.error('Erro no login de usuário:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = UsuarioController;