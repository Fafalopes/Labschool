const { response } = require('express');
const turmaService = require('../services/TurmaService');


module.exports = {

    readyTurmas: async (request, response) => {
        let json = { error:"", result: []}

        let turmas = await turmaService.searchTurmas()

        for(let i in turmas) {
            json.result.push({
                id: turmas[i].id,
                nome: turmas[i].nome,
                descricao: turmas[i].descricao,
                quantidade_alunos: turmas[i].quantidade_alunos
            })

        }
        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    },

    createTurma: async (request, response) => {
        let json = { error:"", result: []}

        let nome = request.body.nome
        let descricao = request.body.descricao
        let quantidade_alunos = request.body.quantidade_alunos

        if(nome && descricao && quantidade_alunos >= 0){
            let turma = await turmaService.createTurma(
                nome,
                descricao,
                quantidade_alunos
            )

            json.result = {
                id: turma.insertId,
                nome,
                descricao,
                quantidade_alunos
            }
        }else{
            json.error = "Incomplete Fields!"
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)

    },

    updateTurma: async (request, response) => {
        let json = {error:"", result: {}}

        let id = request.params.codigo
        let nome = request.body.nome
        let descricao = request.body.descricao
        let quantidade_alunos = request.body.quantidade_alunos

        if(id){
            await turmaService.updateTurma(id, nome, descricao, quantidade_alunos)
        }else{
            json.error = "Error ID!"
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)

    },

    deleteTurma: async (request, response) => {
        let json = {error:"", result:""}

        let id = request.params.codigo

        if(id){
            await turmaService.deleteTurma(id)
            json.result = `Turma deleted successfully! ID: ${id}`
        }else{
            json.error = "Error ID!"
        }

        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    }


}



