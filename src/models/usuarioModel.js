const db = require('../../config/database');
const bcrypt = require('bcrypt');

class UsuarioModel {
    static async criarUsuario(nome, email, senha, endereco, telefone, tipo_id) {
        const query = 'INSERT INTO Usuarios (nome, email, senha, endereco, telefone, tipo_id) VALUES (?, ?, ?, ?, ?, ?)';

        try {
            const hashedSenha = await bcrypt.hash(senha, 10);
            const result = await this.runAsync(query, [nome, email, hashedSenha, endereco, telefone, tipo_id]);
            return { id_usuario: result.lastID };
        } catch (error) {
            throw error;
        }
    }

    static async obterUsuarioPorEmail(email) {
        const query = 'SELECT * FROM Usuarios WHERE email = ?';

        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static async editarUsuario(id, nome, email, senha, endereco, telefone, tipo_id) {
        const query = 'UPDATE Usuarios SET nome = ?, email = ?, senha = ?, endereco = ?, telefone = ?, tipo_id = ? WHERE id_usuario = ?';

        try {
            const hashedSenha = await bcrypt.hash(senha, 10);
            await this.runAsync(query, [nome, email, hashedSenha, endereco, telefone, tipo_id, id]);
            return { mensagem: 'Usuário editado com sucesso' };
        } catch (error) {
            throw error;
        }
    }

    static async listarUsuarios() {
        const query = 'SELECT * FROM Usuarios';

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

    static async criarTipoUsuario(descricao_usuario) {
        const query = 'INSERT INTO TipoUsuario (descricao_usuario) VALUES (?)';

        return new Promise((resolve, reject) => {
            db.run(query, [descricao_usuario], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_tipo: this.lastID });
                }
            });
        });
    }

    static async editarTipoUsuario(id, descricao_usuario) {
        const query = 'UPDATE TipoUsuario SET descricao_usuario = ? WHERE id_tipo = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [descricao_usuario, id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Tipo de usuário editado com sucesso' });
                }
            });
        });
    }

    static async excluirTipoUsuario(id) {
        const query = 'DELETE FROM TipoUsuario WHERE id_tipo = ?';

        return new Promise((resolve, reject) => {
            db.run(query, [id], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ mensagem: 'Tipo de usuário excluído com sucesso' });
                }
            });
        });
    }

    static async listarTiposUsuario() {
        const query = 'SELECT * FROM TipoUsuario';

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

    static async runAsync(query, params) {
        return new Promise((resolve, reject) => {
            db.run(query, params, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        });
    }
}

module.exports = UsuarioModel;