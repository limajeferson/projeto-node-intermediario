const PedidoModel = require('../models/pedidoModel');

class PedidoController {
    static async criarPedido(req, res) {
        try {
            const { cliente_id, data_pedido, status_pedido_id } = req.body;

            // Cria o pedido no banco de dados
            const novoPedido = await PedidoModel.criarPedido(cliente_id, data_pedido, status_pedido_id);

            return res.status(201).json({ id_pedido: novoPedido.id_pedido });
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarPedidosPorCliente(req, res) {
        try {
            const { cliente_id } = req.params;

            // Lista os pedidos do cliente no banco de dados
            const pedidos = await PedidoModel.listarPedidosPorCliente(cliente_id);

            return res.status(200).json({ pedidos });
        } catch (error) {
            console.error('Erro na listagem de pedidos por cliente:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async atualizarStatusPedido(req, res) {
        try {
            const { id } = req.params;
            const { novo_status_id } = req.body;

            // Verifica se o pedido existe
            const pedidoExistente = await PedidoModel.obterPedidoPorId(id);
            if (!pedidoExistente) {
                return res.status(404).json({ mensagem: 'Pedido não encontrado' });
            }

            // Atualiza o status do pedido no banco de dados
            await PedidoModel.atualizarStatusPedido(id, novo_status_id);

            return res.status(200).json({ mensagem: 'Status do pedido atualizado com sucesso' });
        } catch (error) {
            console.error('Erro na atualização do status do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = PedidoController;
