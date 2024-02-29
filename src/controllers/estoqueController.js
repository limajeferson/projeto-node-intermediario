const EstoqueModel = require('../models/estoqueModel');

class EstoqueController {
    static async criarEstoque(req, res) {
        try {
            const { quantidade } = req.body;

            // Cria o estoque no banco de dados
            const novoEstoque = await EstoqueModel.criarEstoque(quantidade);

            return res.status(201).json({ id_estoque: novoEstoque.id_estoque });
        } catch (error) {
            console.error('Erro na criação de estoque:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarEstoque(req, res) {
        try {
            const { id } = req.params;
            const { quantidade } = req.body;

            // Verifica se o estoque existe
            const estoqueExistente = await EstoqueModel.obterEstoquePorId(id);
            if (!estoqueExistente) {
                return res.status(404).json({ mensagem: 'Estoque não encontrado' });
            }

            // Atualiza o estoque no banco de dados
            await EstoqueModel.editarEstoque(id, quantidade);

            return res.status(200).json({ mensagem: 'Estoque editado com sucesso' });
        } catch (error) {
            console.error('Erro na edição de estoque:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirEstoque(req, res) {
        try {
            const { id } = req.params;

            // Verifica se o estoque existe
            const estoqueExistente = await EstoqueModel.obterEstoquePorId(id);
            if (!estoqueExistente) {
                return res.status(404).json({ mensagem: 'Estoque não encontrado' });
            }

            // Exclui o estoque do banco de dados
            await EstoqueModel.excluirEstoque(id);

            return res.status(200).json({ mensagem: 'Estoque excluído com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão de estoque:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarEstoques(req, res) {
        try {
            // Lista os estoques do banco de dados
            const estoques = await EstoqueModel.listarEstoques();

            return res.status(200).json({ estoques });
        } catch (error) {
            console.error('Erro na listagem de estoques:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = EstoqueController;
