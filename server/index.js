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

// UNIDADE DE MEDIDA

router.get('/unidade-medida/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_UNIDADE_MEDIDA=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM unidade_medida' + filter, res);
});

router.delete('/unidade-medida/:id', (req, res) => {
    execSQLQuery('DELETE FROM unidade_medida WHERE ID_UNIDADE_MEDIDA=' + parseInt(req.params.id), res);
});

router.post('/unidade-medida', (req, res) => {
    const descricao = req.body.descricao.substring(0, 50);
    execSQLQuery(`
        INSERT INTO 
        unidade_medida(DESCRICAO)
        VALUES('${descricao}')
    `, res);
});

router.patch('/unidade-medida/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const descricao = req.body.descricao.substring(0, 50);
    execSQLQuery(`
        UPDATE unidade_medida SET 
        DESCRICAO='${descricao}'
        WHERE ID_UNIDADE_MEDIDA=${id}
    `, res);
});

// INSERIR RELAÇÃO DE MATERIAL COM RISCO BIOLOGICO

router.get('/relacao-material-risco-biologico/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_RISCO_MATERIAL=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM risco_material' + filter, res);
});

router.delete('/relacao-material-risco-biologico/:id', (req, res) => {
    execSQLQuery('DELETE FROM risco_material WHERE ID_RISCO_MATERIAL=' + parseInt(req.params.id), res);
});

router.post('/relacao-material-risco-biologico', (req, res) => {
    const material_codigo_material = req.body.material_codigo_material;
    const risco_biologico_id_risco_biologico = req.body.risco_biologico_id_risco_biologico;
    execSQLQuery(`
        INSERT INTO 
        risco_material(MATERIAL_CODIGO_MATERIAL, RISCO_BIOLOGICO_ID_RISCO_BIOLOGICO)
        VALUES('${material_codigo_material}', '${risco_biologico_id_risco_biologico}')
    `, res);
});

router.patch('/relacao-material-risco-biologico/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const material_codigo_material = req.body.material_codigo_material;
    const risco_biologico_id_risco_biologico = req.body.risco_biologico_id_risco_biologico;
    execSQLQuery(`
        UPDATE risco_material SET 
        MATERIAL_CODIGO_MATERIAL='${material_codigo_material}',
        RISCO_BIOLOGICO_ID_RISCO_BIOLOGICO='${risco_biologico_id_risco_biologico}'
        WHERE ID_RISCO_MATERIAL=${id}
    `, res);
});

// LISTA DE MATERIAIS

router.get('/lista-material/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_LISTA_MATERIAL=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM lista_material' + filter, res);
});

router.delete('/lista-material/:id', (req, res) => {
    execSQLQuery('DELETE FROM lista_material WHERE ID_LISTA_MATERIAL=' + parseInt(req.params.id), res);
});

router.post('/lista-material', (req, res) => {
    const periodo_geracao_inicio = req.body.periodo_geracao_inicio;
    const periodo_geracao_fim = req.body.periodo_geracao_fim;
    execSQLQuery(`
        INSERT INTO 
        lista_material(PERIODO_GERACAO_INICIO, PERIODO_GERACAO_FIM)
        VALUES('${periodo_geracao_inicio}', '${periodo_geracao_fim}')
    `, res);
});

router.patch('/lista-material/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const periodo_geracao_inicio = req.body.periodo_geracao_inicio;
    const periodo_geracao_fim = req.body.periodo_geracao_fim;
    execSQLQuery(`
        UPDATE lista_material SET 
        PERIODO_GERACAO_INICIO='${periodo_geracao_inicio}',
        PERIODO_GERACAO_FIM='${periodo_geracao_fim}'
        WHERE ID_LISTA_MATERIAL=${id}
    `, res);
});

// ITEM DA LISTA

router.get('/item-lista/:id?', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE ID_ITEM=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM item_lista' + filter, res);
});

router.delete('/item-lista/:id', (req, res) => {
    execSQLQuery('DELETE FROM item_lista WHERE ID_ITEM=' + parseInt(req.params.id), res);
});

router.post('/item-lista', (req, res) => {
    const quantidade_item = req.body.quantidade_item;
    const unidade_medida_id_unidade_medida = req.body.unidade_medida_id_unidade_medida;
    const lista_material_id_lista_material = req.body.lista_material_id_lista_material;
    const material_codigo_material = req.body.material_codigo_material;
    execSQLQuery(`
        INSERT INTO 
        item_lista(
            QUANTIDADE_ITEM,
            UNIDADE_MEDIDA_ID_UNIDADE_MEDIDA,
            LISTA_MATERIAL_ID_LISTA_MATERIAL, 
            MATERIAL_CODIGO_MATERIAL)
        VALUES(
            '${quantidade_item}',
            '${unidade_medida_id_unidade_medida}',
            '${lista_material_id_lista_material}',
            '${material_codigo_material}'
        )
    `, res);
});

router.patch('/item-lista/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quantidade_item = req.body.quantidade_item;
    const unidade_medida_id_unidade_medida = req.body.unidade_medida_id_unidade_medida;
    const lista_material_id_lista_material = req.body.lista_material_id_lista_material;
    const material_codigo_material = req.body.material_codigo_material;
    execSQLQuery(`
        UPDATE item_lista SET 
        QUANTIDADE_ITEM='${quantidade_item}',
        UNIDADE_MEDIDA_ID_UNIDADE_MEDIDA='${unidade_medida_id_unidade_medida}',
        LISTA_MATERIAL_ID_LISTA_MATERIAL='${lista_material_id_lista_material}',
        MATERIAL_CODIGO_MATERIAL='${material_codigo_material}'
        WHERE ID_ITEM=${id}
    `, res);
});