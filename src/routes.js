const express = require('express');
const route = express.Router()
const AlunoController = require("./controllers/AlunoController.js")
const TurmaController = require("./controllers/TumaController.js")
const cors = require('cors')

route.options("*", cors())

//endpoints - Aluno
route.get('/alunos', AlunoController.readyAlunos) //READY
route.get('/alunos/:codigo', AlunoController.readyAlunosByCurso)//READY
route.post('/aluno', AlunoController.createAluno)//CREATE
route.put('/aluno/:codigo', AlunoController.updateAluno)//UPDATE
route.delete('/aluno/:codigo', AlunoController.deleteAluno)//DELETE

//endpoints - Turma
route.get('/turmas', TurmaController.readyTurmas) //READY
route.post('/turma', TurmaController.createTurma)//Create
route.put('/turma/:codigo', TurmaController.updateTurma)//UPDATE
route.delete('/turma/:codigo', TurmaController.deleteTurma)//DELETE

module.exports = route

