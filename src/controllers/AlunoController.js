const { request } = require('express');
const alunoService = require('../services/AlunoService');
const turmaService = require('../services/TurmaService');

module.exports = {

    readyAlunos: async (request, response) => {
        let json = { error:"", result: []}

        let alunos = await alunoService.searchAlunos()

        for(let i in alunos){
            json.result.push({
                id: alunos[i].id,
                nome: alunos[i].nome,
                telefone: alunos[i].telefone,
                dt_nascimento: alunos[i].dt_nascimento,
                endereco : alunos[i].endereco
            })
    }

    response.header("Access-Control-Allow-Origin", "*")

    if(json.result.length == 0){
        response.status(200).json({
            "message": "Nenhuma instância de alunos cadastrada!" 
        })
    }else{
        response.status(200).json(json)
    }
        
        
    },

    readyAlunosByCurso:  async (request, response) => {
        let json = { error:"", result: []}

        let id = request.params.codigo

        let alunos = await alunoService.getAlunosByCurso(id)

        for(let i in alunos){
            json.result.push({
                id: alunos[i].id,
                nome: alunos[i].nome,
                telefone: alunos[i].telefone,
                dt_nascimento: alunos[i].dt_nascimento,
                endereco : alunos[i].endereco
            })
    }

    response.header("Access-Control-Allow-Origin", "*")

    if(json.result.length == 0){
        response.status(200).json({
            "message": "Nenhuma instância de alunos cadastrada!" 
        })
    }else{
        response.status(200).json(json)
    }
        
    },

    createAluno: async (request, response) => {

        let json = { error:"", result: {}}

        let nome = request.body.nome
        let telefone = request.body.telefone
        let data = request.body.data
        let endereco = request.body.endereco
        let turma = request.body.turma

        if(nome && telefone && data && endereco && turma){

            let resultTurma = await turmaService.searchTurmaByid(turma)

            if(resultTurma.length == 0){
                json.error = "Turma não encontrada"
                response.status(400).json(json)
            }else{

                let aluno = await alunoService.createAluno(
                    nome,
                    telefone,
                    data,
                    endereco,
                    turma
                    )
    
                    await turmaService.AddAlunos(turma)
    
                    json.result = {
                        id: aluno.insertId,
                        nome,
                        telefone,
                        data,
                        endereco,
                        turma

            }

            response.header("Access-Control-Allow-Origin", "*")
            response.status(201).json(json)
    
          }
        }else{
            json.error = "Incomplete Fields!"
            response.header("Access-Control-Allow-Origin", "*")
            response.status(400).json(json)
    }
    
   

},

updateAluno: async (request, response) => {
    let json = {error:"", result: {}}

    let id = request.params.codigo
    let nome = request.body.nome
    let telefone = request.body.telefone
    let data = request.body.data
    let endereco = request.body.endereco

    if(id){

         let aluno = await alunoService.getAlunoById(id)

            if(aluno.length == 0){
            json.error = "Aluno não encontrado!"
            response.header("Acess-Control-Allow-Origin", "*")
            response.status(400).json(json)

        }else{

            await alunoService.updateAluno(id, nome, telefone, data, endereco)
            json.result = {id, nome, telefone, data, endereco}

            response.header("Access-Control-Allow-Origin", "*")
            response.status(200).json(json)
        }    
        

     }else{
        json.error = "Error ID!"
        response.header("Access-Control-Allow-Origin", "*")
        response.status(400).json(json)
     }

    },

deleteAluno: async (request, response) => {
    let json = {error:"", result: ""}

    let id = request.params.codigo
    

    if(id){

        let aluno = await alunoService.getAlunoById(id)

            if(aluno.length == 0){
            json.error = "Aluno não encontrado!"
            response.header("Acess-Control-Allow-Origin", "*")
            response.status(400).json(json)

            }else{
            await alunoService.deleteAluno(id)
            await turmaService.DelAlunos(aluno[0].fk_turma)
            json.result = `Aluno deleted successfully! ID: ${id}`

            response.header("Access-Control-Allow-Origin", "*")
            response.status(200).json(json)
            
            }
        
    
    }else{
        json.error = "Error ID!"
        response.header("Access-Control-Allow-Origin", "*")
        response.json(json)
    
    }

    
}

}