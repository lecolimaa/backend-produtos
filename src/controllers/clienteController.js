// Define a utilização do model cliente e a dependência http-status
const Produtos = require('../models/cliente');
const status = require('http-status');
 
// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const qtd_estoque = req.body.qtd_estoque;
    const ativo = req.body.ativo;
 
    // Popula cada um dos campos do model com os campos recebido na request
    Produtos.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        qtd_estoque: qtd_estoque,
        ativo: ativo,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(Produtos => {
            if (Produtos) {
                res.status(status.OK).send(Produtos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

 
exports.SelectAll = (req, res, next) => {
    Produtos.findAll()
        .then(Produtos => {
            if (Produtos) {
                res.status(status.OK).send(Produtos);
            }
        })
        .catch(error => next(error));
}
 
exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                res.status(status.OK).send(produtos);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Update = (req, res, next) => {
    const nome = req.body.nome;
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const qtd_estoque = req.body.qtd_estoque;
    const ativo = req.body.ativo;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                produtos.update({
                    nome: nome,
                    descricao: descricao,
                    preco: preco,
                    qtd_estoque: qtd_estoque,
                    ativo: ativo
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
 
exports.Delete = (req, res, next) => {
    const id = req.params.id;
 
    Produtos.findByPk(id)
        .then(produtos => {
            if (produtos) {
                produtos.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

