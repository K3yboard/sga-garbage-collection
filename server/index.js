const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

//inicia o servidor
app.listen(port);
console.log('API funcionando http://localhost:' + port + '/');

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'sga'
    });

    connection.query(sqlQry, function(error, results, fields){
        if(error) 
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}

// EMPRESA

router.get('/empresa/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_EMPRESA=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM empresa' + filter, res);
});

router.delete('/empresa/:id', (req, res) => {
    execSQLQuery('DELETE FROM empresa WHERE ID_EMPRESA=' + parseInt(req.params.id), res);
});

router.post('/empresa', (req, res) => {
    const nome_empresa = req.body.nome_empresa.substring(0,150);
    const cnpj_empresa = req.body.cnpj_empresa.substring(0,14);
    const inscricao_municipal = req.body.inscricao_municipal.substring(0,50);
    const licensa = req.body.licensa.substring(0,50);
    execSQLQuery(`
        INSERT INTO 
        empresa(NOME_EMPRESA, CNPJ_EMPRESA, INSCRICAO_MUNICIPAL, LICENSA)
        VALUES('${nome_empresa}','${cnpj_empresa}', '${inscricao_municipal}', '${licensa}')
    `, res);
});

router.patch('/empresa/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome_empresa = req.body.nome_empresa.substring(0,150);
    const cnpj_empresa = req.body.cnpj_empresa.substring(0,14);
    execSQLQuery(`
        UPDATE Clientes SET 
        NOME_EMPRESA='${nome_empresa}',
        CNPJ_EMPRESA='${cnpj_empresa}',
        INSCRICAO_MUNICIPAL='${inscricao_municipal}',
        LICENSA='${licensa}'
        WHERE ID_EMPRESA=${id}
    `, res);
})
