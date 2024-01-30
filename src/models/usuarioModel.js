const db = require('../../config/database.js');
const bcrypt = require('bcrypt');

class UsuarioModel {
    static async criarUsuario(nome, email, senha, endereco, telefone) {
        const query = 'INSERT INTO Usuarios (nome, email, senha, endereco, telefone) VALUES (?, ?, ?, ?, ?)';
        const hashedSenha = await bcrypt.hash(senha, 10);

        return new Promise((resolve, reject) => {
            db.run(query, [nome, email, hashedSenha, endereco, telefone], function (err) {
                if (err) {
                    reject(err.message);
                } else {
                    resolve({ id_usuario: this.lastID });
                }
            });
        });
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
}

module.exports = UsuarioModel;
