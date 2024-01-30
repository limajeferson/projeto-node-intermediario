const db = require('../../config/database.js');

class ProdutoModel {
    static async criarProduto(nome, categoria, foto) {
        const query = 'INSERT INTO Produtos (nome, categoria, foto) VALUES (?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(query, [nome, categoria, foto], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_produto: this.lastID });
                }
            });
        });
    }

    static async editarProduto(id, nome, categoria, foto) {
        const query = 'UPDATE Produtos SET nome = ?, categoria = ?, foto = ? WHERE id_produto = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [nome, categoria, foto, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Produto editado com sucesso' });
                }
            });
        });
    }

    static async excluirProduto(id) {
        const query = 'DELETE FROM Produtos WHERE id_produto = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Produto excluído com sucesso' });
                }
            });
        });
    }

    static async listarProdutos(categoria, id_usuario) {
        let query = 'SELECT * FROM Produtos';

        if (categoria) {
            query += ' WHERE categoria = ?';
        }

        if (id_usuario) {
            query += categoria ? ' AND id_usuario = ?' : ' WHERE id_usuario = ?';
        }

        return new Promise((resolve, reject) => {
            const params = id_usuario ? [categoria, id_usuario] : [categoria];

            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = ProdutoModel;
