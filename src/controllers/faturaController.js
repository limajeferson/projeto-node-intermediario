const FaturaModel = require('../models/pedidoModel');

class FaturaController {
    static async criarFatura(req, res) {
        try {
            const { data_emissao, cliente_id, carrinho_id, funcionario_id } = req.body;

            const novaFatura = await FaturaModel.criarFatura(data_emissao, cliente_id, carrinho_id, funcionario_id);

            return res.status(201).json({ fatura_id: novaFatura.fatura_id });
        } catch (error) {
            console.error('Erro ao criar fatura:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarFatura(req, res) {
        try {
            const { id } = req.params;
            const { data_emissao, cliente_id, carrinho_id, funcionario_id } = req.body;

            const faturaExistente = await FaturaModel.obterFaturaPorId(id);
            if (!faturaExistente) {
                return res.status(404).json({ mensagem: 'Fatura não encontrada' });
            }

            await FaturaModel.editarFatura(id, data_emissao, cliente_id, carrinho_id, funcionario_id);

            return res.status(200).json({ mensagem: 'Fatura editada com sucesso' });
        } catch (error) {
            console.error('Erro na edição de fatura:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirFatura(req, res) {
        try {
            const { id } = req.params;

            const faturaExistente = await FaturaModel.obterFaturaPorId(id);
            if (!faturaExistente) {
                return res.status(404).json({ mensagem: 'Fatura não encontrada' });
            }

            await FaturaModel.excluirFatura(id);

            return res.status(200).json({ mensagem: 'Fatura excluída com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão de fatura:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarFaturas(req, res) {
        try {
            const faturas = await FaturaModel.listarFaturas();

            return res.status(200).json({ faturas });
        } catch (error) {
            console.error('Erro na listagem de faturas:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = FaturaController;
