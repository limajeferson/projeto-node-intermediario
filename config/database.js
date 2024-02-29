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
  CREATE TABLE IF NOT EXISTS TipoUsuario (
    id_tipo INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao_usuario TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Categorias (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_categoria TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS StatusPedido (
    id_status INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao_pedido TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Trasacao (
    id_transacao INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao_transacao TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Usuarios (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE,
    senha TEXT,
    endereco TEXT,
    telefone TEXT,
    tipo_id INTEGER,
    FOREIGN KEY (tipo_id) REFERENCES TipoUsuario(id_tipo)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Estoque (
    id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
    preco REAL,
    quantidade INTEGER,
    usuario_id INTEGER,
    transacao_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (transacao_id) REFERENCES Trasacao(id_transacao)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Livros (
    id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
    isbn TEXT PRIMARY KEY,
    titulo TEXT,
    autor TEXT,
    categoria_id INTEGER,
    estoque_id INTEGER,
    FOREIGN KEY (categoria_id) REFERENCES Categorias(id_categoria),
    FOREIGN KEY (estoque_id) REFERENCES Estoque(id_estoque)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Pedidos (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    data_pedido TEXT,
    status_pedido_id INTEGER,
    FOREIGN KEY (cliente_id) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (status_pedido_id) REFERENCES StatusPedido(id_status)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Itens_Pedido (
    id_item_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    pedido_id INTEGER,
    livro_id INTEGER,
    quantidade INTEGER,
    funcionario_id INTEGER,
    FOREIGN KEY (pedido_id) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (funcionario_id) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (livro_id) REFERENCES Livros(isbn)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Fatura (
    fatura_id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_emissao TEXT,
    cliente_id INTEGER,
    carrinho_id INTEGER,
    funcionario_id INTEGER,
    FOREIGN KEY (cliente_id) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (carrinho_id) REFERENCES Pedidos(id_pedido),
    FOREIGN KEY (funcionario_id) REFERENCES Usuarios(id_usuario)
  )
`);

// // Criação das tabelas
// db.run(`
//   CREATE TABLE IF NOT EXISTS Usuarios (
//     id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
//     nome TEXT,
//     email TEXT UNIQUE,
//     senha TEXT,
//     endereco TEXT,
//     telefone TEXT
//   )
// `);

// db.run(`
//   CREATE TABLE IF NOT EXISTS Livros (
//     id_livro INTEGER PRIMARY KEY AUTOINCREMENT,
//     titulo TEXT,
//     autor TEXT,
//     preco REAL,
//     ano_publicacao INTEGER,
//     quantidade_em_estoque INTEGER,
//     id_vendedor INTEGER,
//     categoria_id INTEGER,
//     FOREIGN KEY (id_vendedor) REFERENCES Usuarios(id_usuario),
//     FOREIGN KEY (categoria_id) REFERENCES Categorias(id_categoria)
//   )
// `);

// db.run(`
//   CREATE TABLE IF NOT EXISTS Categorias (
//     id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
//     nome_categoria TEXT
//   )
// `);

// db.run(`
//   CREATE TABLE IF NOT EXISTS Pedidos (
//     id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
//     id_usuario INTEGER,
//     data_pedido TEXT,
//     status_pedido TEXT,
//     FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
//   )
// `);

// db.run(`
//   CREATE TABLE IF NOT EXISTS Itens_Pedido (
//     id_item_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
//     id_pedido INTEGER,
//     id_livro INTEGER,
//     quantidade INTEGER,
//     preco_unitario REAL,
//     FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido),
//     FOREIGN KEY (id_livro) REFERENCES Livros(id_livro)
//   )
// `);

// Exporta a instância de conexão para uso em outros módulos
module.exports = db;
