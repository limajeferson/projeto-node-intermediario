const CategoriaModel = require('../models/categoriaModel');

class CategoriaController {
    static async criarCategoria(req, res) {
        try {
            const { nome } = req.body;

            // Cria a categoria no banco de dados
            const novaCategoria = await CategoriaModel.criarCategoria(nome);

            return res.status(201).json({ id_categoria: novaCategoria.id_categoria });
        } catch (error) {
            console.error('Erro na criação de categoria:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarCategoria(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            // Verifica se a categoria existe
            const categoriaExistente = await CategoriaModel.obterCategoriaPorId(id);
            if (!categoriaExistente) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada' });
            }

            // Atualiza a categoria no banco de dados
            await CategoriaModel.editarCategoria(id, nome);

            return res.status(200).json({ mensagem: 'Categoria editada com sucesso' });
        } catch (error) {
            console.error('Erro na edição de categoria:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirCategoria(req, res) {
        try {
            const { id } = req.params;

            // Verifica se a categoria existe
            const categoriaExistente = await CategoriaModel.obterCategoriaPorId(id);
            if (!categoriaExistente) {
                return res.status(404).json({ mensagem: 'Categoria não encontrada' });
            }

            // Exclui a categoria do banco de dados
            await CategoriaModel.excluirCategoria(id);

            return res.status(200).json({ mensagem: 'Categoria excluída com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão de categoria:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarCategorias(req, res) {
        try {
            // Lista as categorias do banco de dados
            const categorias = await CategoriaModel.listarCategorias();

            return res.status(200).json({ categorias });
        } catch (error) {
            console.error('Erro na listagem de categorias:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = CategoriaController;