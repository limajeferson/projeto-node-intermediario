const ProdutoModel = require('../models/produtoModel');
// const TituloModel = require('../models/tituloModel');
// const AutorModel = require('../models/autorModel');
// const CategoriaModel = require('../models/categoriaModel');


class ProdutoController {
    static async cadastrarProduto(req, res) {
        try {
            const { isbn, titulo, autor, categoria_id, estoque_id } = req.body;

            /*
            ///* Verificar se a categoria existe (pode ser uma validação adicional)
            const tituloExistente = await TituloModel.obterTituloPorNome(titulo);
            const autorExistente = await AutorModel.obterCAutorPorNome(autor);
            const categoriaExistente = await CategoriaModel.obterCategoriaPorNome(categoria_id);

            if (!titulo || !autor || !categoria_id) {
                return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
            }
            */

            // Cria o produto no banco de dados
            const novoProduto = await ProdutoModel.criarProduto(isbn, titulo, autor, categoria_id, estoque_id);

            return res.status(201).json({ id_produto: novoProduto.id_produto });
        } catch (error) {
            console.error('Erro no cadastro de produto:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarProduto(req, res) {
        try {
            const { id } = req.params;
            const { isbn, titulo, autor, categoria_id, estoque_id } = req.body;

            // Verifica se o produto existe
            const produtoExistente = await ProdutoModel.obterProdutoPorId(id);
            if (!produtoExistente) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            // Atualiza o produto no banco de dados
            await ProdutoModel.editarProduto(id, isbn, titulo, autor, categoria_id, estoque_id);

            return res.status(200).json({ mensagem: 'Produto editado com sucesso' });
        } catch (error) {
            console.error('Erro na edição de produto:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirProduto(req, res) {
        try {
            const { id } = req.params;

            // Verifica se o produto existe
            const produtoExistente = await ProdutoModel.obterProdutoPorId(id);
            if (!produtoExistente) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            // Exclui o produto do banco de dados
            await ProdutoModel.excluirProduto(id);

            return res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão de produto:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarProdutos(req, res) {
        try {
            const { categoria_id, autor } = req.query;

            // Lista os produtos do banco de dados com base nos filtros
            const produtos = await ProdutoModel.listarProdutos(categoria_id, autor);

            return res.status(200).json({ produtos });
        } catch (error) {
            console.error('Erro na listagem de produtos:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = ProdutoController;