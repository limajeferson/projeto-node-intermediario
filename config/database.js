const sqlite3 = require('sqlite3').verbose();

// Conexão com o banco
const caminhoDoBanco = 'src/database.db';
const db = new sqlite3.Database(caminhoDoBanco, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
    throw new Error('Erro ao abrir o banco de dados');
  } else {
    console.log('Conexão bem-sucedida com o banco de dados SQLite');
  }
});

// Criação das tabelas
db.run(`
  CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT,
    endereco TEXT,
    telefone TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Livros (
    id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    autor TEXT,
    descricao TEXT,
    preco REAL,
    ano_publicacao INTEGER,
    quantidade_em_estoque INTEGER,
    id_vendedor INTEGER,
    categoria_id INTEGER,
    FOREIGN KEY (id_vendedor) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id_categoria)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_categoria TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER,
    data_pedido TEXT,
    status_pedido TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Itens_Pedido (
    id_item_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER,
    id_livro INTEGER,
    quantidade INTEGER,
    preco_unitario REAL,
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (id_livro) REFERENCES Livros(id_livro)
  )
`);

// Exporta a instância de conexão para uso em outros módulos
module.exports = db;
