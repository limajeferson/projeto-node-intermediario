const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Configuração do middleware para parse de JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do view engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuração de rotas
const routes = require('./routes/index');
app.use('/', routes);

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


/**
 * se precisar configurar servidor para utilizar HTTPS por
 * lhe dar com informações sensíveis de login e registro:
 * 
    const https = require('https');
    const fs = require('fs');

    const options = {
        key: fs.readFileSync('caminho/para/sua/chave-privada.pem'),
        cert: fs.readFileSync('caminho/para/seu/certificado.pem')
    };

    https.createServer(options, app).listen(port, () => {
        console.log(`Servidor rodando na porta ${port} usando HTTPS`);
    });
    

 * CONSIDERANDO ERROS:

    app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
    });

 * 
 */