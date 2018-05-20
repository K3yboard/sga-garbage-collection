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
    const inscricao_municipal = req.body.inscricao_municipal.substring(0,50);
    const licensa = req.body.licensa.substring(0,50);
    execSQLQuery(`
        UPDATE empresa SET 
        NOME_EMPRESA='${nome_empresa}',
        CNPJ_EMPRESA='${cnpj_empresa}',
        INSCRICAO_MUNICIPAL='${inscricao_municipal}',
        LICENSA='${licensa}'
        WHERE ID_EMPRESA=${id}
    `, res);
});

// CONTRATO

router.get('/contrato/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_CONTRATO=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM contrato' + filter, res);
});

router.delete('/contrato/:id', (req, res) => {
    execSQLQuery('DELETE FROM contrato WHERE ID_CONTRATO=' + parseInt(req.params.id), res);
});

router.post('/contrato', (req, res) => {
    const data_contrato = req.body.data_contrato;
    const data_vencimento_contrato = req.body.data_vencimento_contrato;
    const empresa_id_empresa = req.body.empresa_id_empresa;
    execSQLQuery(`
        INSERT INTO 
        contrato(DATA_CONTRATO, DATA_VENCIMENTO_CONTRATO, EMPRESA_ID_EMPRESA)
        VALUES('${data_contrato}','${data_vencimento_contrato}', '${empresa_id_empresa}')
    `, res);
});

router.patch('/contrato/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data_contrato = req.body.data_contrato;
    const data_vencimento_contrato = req.body.data_vencimento_contrato;
    const empresa_id_empresa = req.body.empresa_id_empresa;
    execSQLQuery(`
        UPDATE contrato SET 
        DATA_CONTRATO='${data_contrato}',
        DATA_VENCIMENTO_CONTRATO='${data_vencimento_contrato}',
        EMPRESA_ID_EMPRESA='${empresa_id_empresa}'
        WHERE ID_CONTRATO=${id}
    `, res);
});

// DOCUMENTO

router.get('/documento/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_DOCUMENTO=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM documento' + filter, res);
});

router.delete('/documento/:id', (req, res) => {
    execSQLQuery('DELETE FROM documento WHERE ID_DOCUMENTO=' + parseInt(req.params.id), res);
});

router.post('/documento', (req, res) => {
    const tipo_documento = req.body.tipo_documento.substring(0, 50);
    const nome_documento = req.body.nome_documento.substring(0, 50);
    const url = req.body.url;
    const contrato_id_contrato = req.body.contrato_id_contrato;
    execSQLQuery(`
        INSERT INTO 
        documento(TIPO_DOCUMENTO, NOME_DOCUMENTO, URL, CONTRATO_ID_CONTRATO)
        VALUES('${tipo_documento}','${nome_documento}', '${url}', '${contrato_id_contrato}')
    `, res);
});

router.patch('/documento/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tipo_documento = req.body.tipo_documento.substring(0, 50);
    const nome_documento = req.body.nome_documento.substring(0, 50);
    const url = req.body.url;
    const contrato_id_contrato = req.body.contrato_id_contrato;
    execSQLQuery(`
        UPDATE documento SET 
        TIPO_DOCUMENTO='${tipo_documento}',
        NOME_DOCUMENTO='${nome_documento}',
        URL='${url}',
        CONTRATO_ID_CONTRATO='${contrato_id_contrato}'
        WHERE ID_DOCUMENTO=${id}
    `, res);
});

// RISCO BIOLOGICO

router.get('/risco-biologico/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_RISCO_BIOLOGICO=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM risco_biologico' + filter, res);
});

router.delete('/risco-biologico/:id', (req, res) => {
    execSQLQuery('DELETE FROM risco_biologico WHERE ID_RISCO_BIOLOGICO=' + parseInt(req.params.id), res);
});

router.post('/risco-biologico', (req, res) => {
    const descricao_risco = req.body.descricao_risco.substring(0, 50);
    const grau_contaminacao = req.body.grau_contaminacao.substring(0, 50);
    execSQLQuery(`
        INSERT INTO 
        risco_biologico(DESCRICAO_RISCO, GRAU_CONTAMINACAO)
        VALUES('${descricao_risco}','${grau_contaminacao}')
    `, res);
});

router.patch('/risco-biologico/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const descricao_risco = req.body.descricao_risco.substring(0, 50);
    const grau_contaminacao = req.body.grau_contaminacao.substring(0, 50);
    execSQLQuery(`
        UPDATE risco_biologico SET 
        DESCRICAO_RISCO='${descricao_risco}',
        GRAU_CONTAMINACAO='${grau_contaminacao}'
        WHERE ID_RISCO_BIOLOGICO=${id}
    `, res);
});

// MATERIAL

router.get('/material/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE CODIGO_MATERIAL=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM material' + filter, res);
});

router.delete('/material/:id', (req, res) => {
    execSQLQuery('DELETE FROM material WHERE CODIGO_MATERIAL=' + parseInt(req.params.id), res);
});

router.post('/material', (req, res) => {
    const nome_material = req.body.nome_material.substring(0, 50);
    const tipo_material = req.body.tipo_material.substring(0, 50);
    execSQLQuery(`
        INSERT INTO 
        material(NOME_MATERIAL, TIPO_MATERIAL)
        VALUES('${nome_material}','${tipo_material}')
    `, res);
});

router.patch('/material/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const nome_material = req.body.nome_material.substring(0, 50);
    const tipo_material = req.body.tipo_material.substring(0, 50);
    execSQLQuery(`
        UPDATE material SET 
        NOME_MATERIAL='${nome_material}',
        TIPO_MATERIAL='${tipo_material}'
        WHERE CODIGO_MATERIAL=${id}
    `, res);
});