const db = require('../../config/database');

/**
 * * Livros
 * * Categorias
 * * Estoque
 */

class ProdutoModel {
    static async criarProduto(isbn, titulo, autor, categoria_id, estoque_id) {
        const query = 'INSERT INTO Livros (isbn, titulo, autor, categoria_id, estoque_id) VALUES (?, ?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(query, [isbn, titulo, autor, categoria_id, estoque_id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_produto: this.lastID });
                }
            });
        });
    }

    static async editarProduto(id, isbn, titulo, autor, categoria_id, estoque_id) {
        const query = 'UPDATE Livros SET isbn = ?, titulo = ?, autor = ?, categoria_id = ?, estoque_id = ? WHERE id_produto = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [isbn, titulo, autor, categoria_id, estoque_id, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Produto editado com sucesso' });
                }
            });
        });
    }

    static async excluirProduto(id) {
        const query = 'DELETE FROM Livros WHERE id_produto = ?';

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

    static async listarProdutos(categoria_id, autor) {
        let query = 'SELECT * FROM Livros';

        const params = [];

        if (categoria_id) {
            query += ' WHERE categoria_id = ?';
            params.push(categoria_id);
        }

        if (autor) {
            query += categoria_id ? ' AND autor = ?' : ' WHERE autor = ?';
            params.push(autor);
        }

        return new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async criarCategoria(nome) {
        const query = 'INSERT INTO Categorias (nome_categoria) VALUES (?)';

        return new Promise((resolve, reject) => {
            db.run(query, [nome], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_categoria: this.lastID });
                }
            });
        });
    }

    static async editarCategoria(id, nome) {
        const query = 'UPDATE Categorias SET nome_categoria = ? WHERE id_categoria = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [nome, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Categoria editada com sucesso' });
                }
            });
        });
    }

    static async excluirCategoria(id) {
        const query = 'DELETE FROM Categorias WHERE id_categoria = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Categoria excluída com sucesso' });
                }
            });
        });
    }

    static async listarCategorias() {
        const query = 'SELECT * FROM Categorias';

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

    static async criarEstoque(preco, quantidade, usuario_id, transacao_id) {
        const query = 'INSERT INTO Estoque (preco, quantidade, usuario_id, transacao_id) VALUES (?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            db.run(query, [preco, quantidade, usuario_id, transacao_id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_estoque: this.lastID });
                }
            });
        });
    }

    static async editarEstoque(id, preco, quantidade, usuario_id, transacao_id) {
        const query = 'UPDATE Estoque SET preco = ?, quantidade = ?, usuario_id = ?, transacao_id = ? WHERE id_estoque = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [preco, quantidade, usuario_id, transacao_id, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Estoque editado com sucesso' });
                }
            });
        });
    }

    static async excluirEstoque(id) {
        const query = 'DELETE FROM Estoque WHERE id_estoque = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Estoque excluído com sucesso' });
                }
            });
        });
    }

    static async listarEstoque(usuario_id) {
        let query = 'SELECT * FROM Estoque';

        if (usuario_id) {
            query += ' WHERE usuario_id = ?';
        }

        return new Promise((resolve, reject) => {
            const params = usuario_id ? [usuario_id] : [];

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
