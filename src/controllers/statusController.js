const StatusPedidoModel = require('../models/statusPedido');

class StatusPedidoController {
    static async criarStatusPedido(req, res) {
        try {
            const { descricao_pedido } = req.body;

            const novoStatusPedido = await StatusPedidoModel.criarStatusPedido(descricao_pedido);

            return res.status(201).json({ id_status: novoStatusPedido.id_status });
        } catch (error) {
            console.error('Erro ao criar status do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarStatusPedido(req, res) {
        try {
            const { id } = req.params;
            const { descricao_pedido } = req.body;

            const statusExistente = await StatusPedidoModel.obterStatusPedidoPorId(id);
            if (!statusExistente) {
                return res.status(404).json({ mensagem: 'Status do pedido não encontrado' });
            }

            await StatusPedidoModel.editarStatusPedido(id, descricao_pedido);

            return res.status(200).json({ mensagem: 'Status do pedido editado com sucesso' });
        } catch (error) {
            console.error('Erro na edição de status do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirStatusPedido(req, res) {
        try {
            const { id } = req.params;

            const statusExistente = await StatusPedidoModel.obterStatusPedidoPorId(id);
            if (!statusExistente) {
                return res.status(404).json({ mensagem: 'Status do pedido não encontrado' });
            }

            await StatusPedidoModel.excluirStatusPedido(id);

            return res.status(200).json({ mensagem: 'Status do pedido excluído com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão de status do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarStatusPedido(req, res) {
        try {
            const statusPedidos = await StatusPedidoModel.listarStatusPedido();

            return res.status(200).json({ statusPedidos });
        } catch (error) {
            console.error('Erro na listagem de status do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = StatusPedidoController;
