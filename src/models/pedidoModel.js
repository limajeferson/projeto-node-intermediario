const db = require('../../config/database');

/**
 * * Pedidos
 * * Fatura
 * * Itens_Pedido
 * * StatusPedido
 * * Trasacao
 */
class PedidoModel {
    static async criarPedido(cliente_id, data_pedido, status_pedido_id) {
        const query = 'INSERT INTO Pedidos (cliente_id, data_pedido, status_pedido_id) VALUES (?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(query, [cliente_id, data_pedido, status_pedido_id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_pedido: this.lastID });
                }
            });
        });
    }

    static async listarPedidosPorCliente(cliente_id) {
        const query = 'SELECT * FROM Pedidos WHERE cliente_id = ?';

        return new Promise((resolve, reject) => {
            db.all(query, [cliente_id], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async atualizarStatusPedido(id_pedido, novo_status_id) {
        const query = 'UPDATE Pedidos SET status_pedido_id = ? WHERE id_pedido = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [novo_status_id, id_pedido], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Status do pedido atualizado com sucesso' });
                }
            });
        });
    }
    
    static async criarFatura(data_emissao, cliente_id, carrinho_id, funcionario_id) {
        const query = 'INSERT INTO Fatura (data_emissao, cliente_id, carrinho_id, funcionario_id) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(query, [data_emissao, cliente_id, carrinho_id, funcionario_id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ fatura_id: this.lastID });
                }
            });
        });
    }

    static async editarFatura(id, data_emissao, cliente_id, carrinho_id, funcionario_id) {
        const query = 'UPDATE Fatura SET data_emissao = ?, cliente_id = ?, carrinho_id = ?, funcionario_id = ? WHERE fatura_id = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [data_emissao, cliente_id, carrinho_id, funcionario_id, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Fatura editada com sucesso' });
                }
            });
        });
    }

    static async excluirFatura(id) {
        const query = 'DELETE FROM Fatura WHERE fatura_id = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Fatura excluída com sucesso' });
                }
            });
        });
    }

    static async listarFaturas() {
        const query = 'SELECT * FROM Fatura';

        return new Promise((resolve, reject) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async criarItemPedido(pedido_id, livro_id, quantidade, funcionario_id) {
        const query = 'INSERT INTO Itens_Pedido (pedido_id, livro_id, quantidade, funcionario_id) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(query, [pedido_id, livro_id, quantidade, funcionario_id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_item_pedido: this.lastID });
                }
            });
        });
    }

    static async editarItemPedido(id, pedido_id, livro_id, quantidade, funcionario_id) {
        const query = 'UPDATE Itens_Pedido SET pedido_id = ?, livro_id = ?, quantidade = ?, funcionario_id = ? WHERE id_item_pedido = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [pedido_id, livro_id, quantidade, funcionario_id, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Item do pedido editado com sucesso' });
                }
            });
        });
    }

    static async excluirItemPedido(id) {
        const query = 'DELETE FROM Itens_Pedido WHERE id_item_pedido = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Item do pedido excluído com sucesso' });
                }
            });
        });
    }

    static async listarItensPedido(pedido_id) {
        let query = 'SELECT * FROM Itens_Pedido';

        if (pedido_id) {
            query += ' WHERE pedido_id = ?';
        }

        return new Promise((resolve, reject) => {
            const params = pedido_id ? [pedido_id] : [];

            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async criarStatusPedido(descricao_pedido) {
        const query = 'INSERT INTO StatusPedido (descricao_pedido) VALUES (?)';

        return new Promise((resolve, reject) => {
            db.run(query, [descricao_pedido], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_status: this.lastID });
                }
            });
        });
    }

    static async editarStatusPedido(id, descricao_pedido) {
        const query = 'UPDATE StatusPedido SET descricao_pedido = ? WHERE id_status = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [descricao_pedido, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Status do pedido editado com sucesso' });
                }
            });
        });
    }

    static async excluirStatusPedido(id) {
        const query = 'DELETE FROM StatusPedido WHERE id_status = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Status do pedido excluído com sucesso' });
                }
            });
        });
    }

    static async listarStatusPedido() {
        const query = 'SELECT * FROM StatusPedido';

        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }
    
    static async criarTransacao(descricao_transacao) {
        const query = 'INSERT INTO Trasacao (descricao_transacao) VALUES (?)';

        return new Promise((resolve, reject) => {
            db.run(query, [descricao_transacao], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_transacao: this.lastID });
                }
            });
        });
    }

    static async editarTransacao(id, descricao_transacao) {
        const query = 'UPDATE Trasacao SET descricao_transacao = ? WHERE id_transacao = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [descricao_transacao, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Transação editada com sucesso' });
                }
            });
        });
    }

    static async excluirTransacao(id) {
        const query = 'DELETE FROM Trasacao WHERE id_transacao = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Transação excluída com sucesso' });
                }
            });
        });
    }

    static async listarTransacoes() {
        const query = 'SELECT * FROM Trasacao';

        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = PedidoModel;