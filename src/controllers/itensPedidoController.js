const ItensPedidoModel = require('../models/test/old/itensPedidoModel');

class ItensPedidoController {
    static async criarItemPedido(req, res) {
        try {
            const { pedido_id, livro_id, quantidade, funcionario_id } = req.body;

            // Cria o item do pedido no banco de dados
            const novoItemPedido = await ItensPedidoModel.criarItemPedido(pedido_id, livro_id, quantidade, funcionario_id);

            return res.status(201).json({ id_item_pedido: novoItemPedido.id_item_pedido });
        } catch (error) {
            console.error('Erro ao criar item do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async editarItemPedido(req, res) {
        try {
            const { id } = req.params;
            const { pedido_id, livro_id, quantidade, funcionario_id } = req.body;

            // Verifica se o item do pedido existe
            const itemPedidoExistente = await ItensPedidoModel.obterItemPedidoPorId(id);
            if (!itemPedidoExistente) {
                return res.status(404).json({ mensagem: 'Item do pedido não encontrado' });
            }

            // Atualiza o item do pedido no banco de dados
            await ItensPedidoModel.editarItemPedido(id, pedido_id, livro_id, quantidade, funcionario_id);

            return res.status(200).json({ mensagem: 'Item do pedido editado com sucesso' });
        } catch (error) {
            console.error('Erro na edição do item do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async excluirItemPedido(req, res) {
        try {
            const { id } = req.params;

            // Verifica se o item do pedido existe
            const itemPedidoExistente = await ItensPedidoModel.obterItemPedidoPorId(id);
            if (!itemPedidoExistente) {
                return res.status(404).json({ mensagem: 'Item do pedido não encontrado' });
            }

            // Exclui o item do pedido do banco de dados
            await ItensPedidoModel.excluirItemPedido(id);

            return res.status(200).json({ mensagem: 'Item do pedido excluído com sucesso' });
        } catch (error) {
            console.error('Erro na exclusão do item do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }

    static async listarItensPedido(req, res) {
        try {
            const { pedido_id } = req.params;

            // Lista os itens do pedido no banco de dados
            const itensPedido = await ItensPedidoModel.listarItensPedido(pedido_id);

            return res.status(200).json({ itensPedido });
        } catch (error) {
            console.error('Erro na listagem de itens do pedido:', error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' });
        }
    }
}

module.exports = ItensPedidoController;