// HTTP Applications => APIs

//Padrão de importação chamado commonJS abaixo:
// const http = require('http');

// Porém agora está sendo mais usado o ESModules => import/export
// Mas por padrão o node não suporta ESModules
// Para isso é necessario colocar no package.json logo abaixo de name
// "type": "module"

//Agora podemos substituis o const http = require('http') por:
// import http from 'http';
//Porem nas ultimas versões o node pede que coloque um préfixo antes
//das importações


//Metodos HTTP
//GET | POST | PUT | PATCH | DELETE

// GET => Buscar um recurso do back-end
// POST => Criar uma informação no back-end
// PUT => Atualizar um recurso no back-end (atualizando muitos campos ao memso tempo como name, avatar, endereço...)
// PATCH => Atualizar uma informação específica de um recurso no back-end (exemplo: aceitar notificações ou não)
// DELETe => Deletar um recurso do back-end

// Stateful / Stateless
// A diferença entre elas é que a Stateful sempre vai ter algum tipo de informação
// sendo guardada em memória, ou seja, a aplicação depende de informação salvas na memória
// para que ela consiga funcionar. A partir do momento que essa aplicação for derrubada e perder
// seus dados na memória, ela pode funcionar de uma maneira diferente.
// Enquanto que uma aplicação Stateless onde as informações são salvas em dispositivos externos como
// banco de dados ou arquivos de texto, independente se a aplicação for parada e rodada novamente, os dados ou arquivos
// e qualquer tipo de funcionamento, vão se manter igual.

//O que vamos criar é uma aplicação Statefull

//Cabeçalhos (Requisição/resposta) = Metadados

// 3 formas do front-end enviar informações para o back-end
//Query Parameters: ==> URL Stateful ==> Filtros, paginação, não obrigatórios
//Route Parameters ==> Identificação de recurso
//Request Body ==> Envio de informações de um formulário (usa o HTTPs) ==> não fica na URL

// Query Parameters são parametros 
// nomedados que a gente envia no proprio endereco 
// da requisição. Exemplo:
// http:localhost:3333/users?userId=1&name=Diego

//Route Parameters
// Parâmetros não nomedados que também ficam na rota. Exemplo:
// GET http:localhost:3333/user/1
// Nesse caso daria para entender que estamos buscando o usuario com ID = 1
// DELETE http:localhost:3333/user/1
// Nesse caso daria para entender que estamos querendo deletar o usuario com ID = 1

//Request Body
// POST http://localhost:3333/users

import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'
import { randomUUID } from 'node:crypto' //UUID => Universally Unique Identifier
import { routes } from './routes.js'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  await json(req,res)

  const route = routes.find(route => {
    return route.method === method && route.path.test(url)
  })

  if(route) {
    const routeParams = req.url.match(route.path)
    req.params = { ...routeParams.groups }
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)