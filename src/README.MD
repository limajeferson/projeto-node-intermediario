# `Estrutura`

``` plaintext
|-- projeto-node-intermediario/
|   |-- config/
|   |   |-- authMiddleware.js
|   |   |-- database.js
|   |   |-- dotenv.js
|   |   |-- logMiddleware.js
|   |
|   |-- node_modules/
|   |-- public/  (para arquivos estáticos como imagens, CSS, etc.)
|   |-- src/
|   |   |-- controllers/
|   |   |   |-- produtoController.js
|   |   |   |-- usuarioController.js
|   |   |
|   |   |-- models/
|   |   |   |-- produtoModel.js 
|   |   |   |-- usuarioModel.js
|   |   |
|   |   |-- routes/
|   |   |   |-- index.js
|   |   |   |-- produtoRoutes.js
|   |   |   |-- usuarioRoutes.js
|   |   |
|   |   |-- views/
|   |   |   |-- livros/
|   |   |   |   |-- detalhesLivro.ejs
|   |   |   |   |-- index.ejs
|   |   |   |
|   |   |   |-- usuarios/
|   |   |   |   |-- login.ejs
|   |   |   |   |-- registro.ejs
|   |   |   |
|   |   |   |-- index.ejs
|   |   |   |-- layout.ejs
|   |   |
|   |   |-- app.js
|   |   |-- buildCryptoKey.js
|   |   |-- database.db
|   |   |-- README.MD
|   |-- .env
|   |-- .gitignore
|   |-- package.json
|   |-- package-lock.json
```

## Informações inseridas

• **Categorias**

```SQL
INSERT INTO Categorias (nome_categoria) VALUES ('Ficção Científica');
INSERT INTO Categorias (nome_categoria) VALUES ('Romance');
INSERT INTO Categorias (nome_categoria) VALUES ('Mistério');
INSERT INTO Categorias (nome_categoria) VALUES ('Aventura');
INSERT INTO Categorias (nome_categoria) VALUES ('Fantasia');
INSERT INTO Categorias (nome_categoria) VALUES ('Drama');
INSERT INTO Categorias (nome_categoria) VALUES ('Suspense');
INSERT INTO Categorias (nome_categoria) VALUES ('Terror');
INSERT INTO Categorias (nome_categoria) VALUES ('Autoajuda');
INSERT INTO Categorias (nome_categoria) VALUES ('História');
```

• **Usuários**

```SQL
INSERT INTO Usuarios (nome, email, senha, endereco, telefone) VALUES ('João Silva', 'joao@email.com', 'senha123', 'Rua A, 123', '123456789');
INSERT INTO Usuarios (nome, email, senha, endereco, telefone) VALUES ('Maria Oliveira', 'maria@email.com', 'senha456', 'Rua B, 456', '987654321');
INSERT INTO Usuarios (nome, email, senha, endereco, telefone) VALUES ('Carlos Santos', 'carlos@email.com', 'senha789', 'Rua C, 789', '111222333');
INSERT INTO Usuarios (nome, email, senha, endereco, telefone) VALUES ('Ana Souza', 'ana@email.com', 'senhaabc', 'Rua D, 987', '444555666');
INSERT INTO Usuarios (nome, email, senha, endereco, telefone) VALUES ('Pedro Rocha', 'pedro@email.com', 'senhaxyz', 'Rua E, 654', '777888999');
```

• **Produtos**

```SQL
INSERT INTO Livros (titulo, autor, descricao, preco, ano_publicacao, quantidade_em_estoque, categoria_id) VALUES
('Aventuras no Espaço', 'John Autor', 'Uma emocionante jornada interestelar', 29.99, 2010, 50, 1),
('Caminhando com Dinossauros', 'Jane Autora', 'Uma viagem no tempo até a era dos dinossauros', 19.99, 2015, 30, 2),
('O Mistério do Castelo Assombrado', 'Sam Autorson', 'Descubra os segredos escondidos no castelo', 24.99, 2018, 40, 1),
('A Arte da Guerra', 'Sun Tzu', 'Estratégias milenares para a vida e os negócios', 15.99, -500, 20, 3),
('Viagem ao Centro da Terra', 'Jules Verne', 'Uma jornada épica para o centro do nosso planeta', 22.99, 1864, 25, 2),
('O Código Da Vinci', 'Dan Brown', 'Intrigas e mistérios na busca pelo Santo Graal', 30.99, 2003, 35, 1),
('1984', 'George Orwell', 'Um clássico distópico sobre vigilância e controle', 18.99, 1949, 15, 3),
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'A épica jornada na Terra Média', 34.99, 1954, 28, 2),
('Dom Quixote', 'Miguel de Cervantes', 'As aventuras do cavaleiro sonhador', 26.99, 1605, 22, 1),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'A jornada mágica de Harry em Hogwarts', 28.99, 1997, 33, 2),
('Romeu e Julieta', 'William Shakespeare', 'Uma história de amor trágica', 20.99, 1597, 18, 1),
('Sherlock Holmes: O Cão dos Baskervilles', 'Arthur Conan Doyle', 'O detetive mais famoso enfrenta um mistério sobrenatural', 23.99, 1902, 27, 3),
('Orgulho e Preconceito', 'Jane Austen', 'Romance clássico sobre amor e preconceito social', 21.99, 1813, 23, 1),
('Duna', 'Frank Herbert', 'Uma saga épica de ficção científica no deserto de Arrakis', 32.99, 1965, 38, 3),
('O Hobbit', 'J.R.R. Tolkien', 'A jornada de Bilbo Bolseiro em direção à Montanha Solitária', 25.99, 1937, 20, 2),
('Crime e Castigo', 'Fiódor Dostoiévski', 'A complexa psicologia de um crime e suas consequências', 27.99, 1866, 31, 1),
('O Iluminado', 'Stephen King', 'Horror e paranóia em um hotel isolado', 29.99, 1977, 29, 3),
('Moby Dick', 'Herman Melville', 'A obsessiva caça à baleia branca', 24.99, 1851, 26, 1),
('O Retrato de Dorian Gray', 'Oscar Wilde', 'A decadência moral refletida em um retrato', 22.99, 1890, 21, 2),
('As Aventuras de Alice no País das Maravilhas', 'Lewis Carroll', 'Um mundo surreal e encantador', 18.99, 1865, 24, 1);
```
