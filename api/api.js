const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.listen(8000, () => {
    console.log('servidor rodando na porta 8000');
})

app.get('/usuarios', (req, res) => {
    res.json(
        [{
                id: 1,
                class: "",
                usuario: 'ANPINA',
                email: 'antonio.pina@tvglobo.com.br',
                dataInclusao: '28/05/2019',
                dataAlteracao: '30/05/2019',
                regras: '01',
                status: 'ATIVO'
            },
            {   
                id: 2,
                class: "",
                usuario: 'CCHANG',
                email: 'ciro.chang@tvglobo.com.br',
                dataInclusao: '28/05/2019',
                dataAlteracao: '30/05/2019',
                regras: '01',
                status: 'ATIVO'
            },
            {
                id: 3,
                class: "",
                usuario: 'TMARCAL',
                email: 'thiago.marcal@tvglobo.com.br',
                dataInclusao: '28/05/2019',
                dataAlteracao: '30/05/2019',
                regras: '01',
                status: 'ATIVO'
            },
            {
                id: 4,
                class: "",
                usuario: 'ECGIANN',
                email: 'ecgiannotto@tvglobo.com.br',
                dataInclusao: '28/05/2019',
                dataAlteracao: '30/05/2019',
                regras: '01',
                status: 'ATIVO'
            },
            {
                id: 5,
                class: "",
                usuario: 'YFERNAND',
                email: 'yuri.vasquez@tvglobo.com.br',
                dataInclusao: '28/05/2019',
                dataAlteracao: '30/05/2019',
                regras: '02',
                status: 'ATIVO'
            },
            {
                id: 6,
                class: "",
                usuario: 'PLACERDA',
                email: 'pedro.soares.lacerda@tvglobo.com.br',
                dataInclusao: '28/05/2019',
                dataAlteracao: '30/05/2019',
                regras: '02',
                status: 'ATIVO'
            }
        ]
    )
})