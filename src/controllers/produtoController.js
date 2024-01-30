const ProdutoModel = require('../models/produtoModel');

class ProdutoController {
    static async cadastrarProduto(req, res) {
        try {
            const { nome, categoria, foto } = req.body;

            /*
            ///* Verificar se a categoria existe (pode ser uma validação adicional)
            ///* Se não existir, pode ser criada ou a lógica desejada
            const categoriaExistente = await CategoriaModel.obterCategoriaPorNome(categoria);
            if (!categoriaExistente) {
                await CategoriaModel.criarCategoria(categoria);
            }
            */

            // Criar produto
            const novoProduto = await ProdutoModel.criarProduto(nome, categoria, foto);

            return res.status(201).json({ id_produto: novoProduto.id_produto });
        } catch (error) {
            console.error('Erro no cadastro de produto:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarProduto(req, res) {
        try {
            const { id } = req.params;
            const { nome, categoria, foto } = req.body;

            // Verifica se o produto existe
            const produtoExistente = await ProdutoModel.obterProdutoPorId(id);
            if (!produtoExistente) {
                return res.status(404).json({ mensagem: 'Produto não encontrado' });
            }

            // Atualizar produto
            await ProdutoModel.editarProduto(id, nome, categoria, foto);

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
            const { categoria, id_usuario } = req.query;

            // Lista os produtos do banco de dados com base nos parâmetros fornecidos
            const produtos = await ProdutoModel.listarProdutos(categoria, id_usuario);

            return res.status(200).json({ produtos });
        } catch (error) {
            console.error('Erro na listagem de produtos:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = ProdutoController;