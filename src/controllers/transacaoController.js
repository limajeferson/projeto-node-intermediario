const TransacaoModel = require('../models/transacaoModel');

class TransacaoController {
    static async criarTransacao(req, res) {
        try {
            const { descricao_transacao } = req.body;

            const novaTransacao = await TransacaoModel.criarTransacao(descricao_transacao);

            return res.status(201).json({ id_transacao: novaTransacao.id_transacao });
        } catch (error) {
            console.error('Erro ao criar transação:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarTransacao(req, res) {
        try {
            const { id } = req.params;
            const { descricao_transacao } = req.body;

            const transacaoExistente = await TransacaoModel.obterTransacaoPorId(id);
            if (!transacaoExistente) {
                return res.status(404).json({ mensagem: 'Transação não encontrada' });
            }

            await TransacaoModel.editarTransacao(id, descricao_transacao);

            return res.status(200).json({ mensagem: 'Transação editada com sucesso' });
        } catch (error) {
            console.error('Erro na edição de transação:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirTransacao(req, res) {
        try {
            const { id } = req.params;

            const transacaoExistente = await TransacaoModel.obterTransacaoPorId(id);
            if (!transacaoExistente) {
                return res.status(404).json({ mensagem: 'Transação não encontrada' });
            }

            await TransacaoModel.excluirTransacao(id);

            return res.status(200).json({ mensagem: 'Transação excluída com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão de transação:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarTransacoes(req, res) {
        try {
            const transacoes = await TransacaoModel.listarTransacoes();

            return res.status(200).json({ transacoes });
        } catch (error) {
            console.error('Erro na listagem de transações:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = TransacaoController;