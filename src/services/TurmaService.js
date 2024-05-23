
const database = require('../database')

module.exports = {

//Método para pesquisar todas as turmas
searchTurmas: () => {
    return new Promise(
        (accepted, rejected) => {
            database.query("SELECT * FROM turma", (error, result) => {
                if (error) {
                    rejected(error)
                    return
                }
                accepted(result)
                })

            }
        )
    },

//Método para consultar turma pelo id
searchTurmaByid: (codigo) => {
    return new Promise((accepted, rejected) => {
        database.query(`SELECT * FROM turma WHERE id =  ${codigo}`,
         (error, result) => {
            if(error) {
                rejected(error)
                return
            }
            accepted(result)
        }
    )
    })
    },

//Método para criar turma
createTurma: (nome, descricao, quantidade_alunos) => {
    return new Promise((accepted, rejected) => {
        database.query(
            `INSERT INTO turma (nome, descricao, quantidade_alunos) VALUES
            ('${nome}', '${descricao}', '${quantidade_alunos}')`,
            (error, result) => {
                if (error){
                    rejected(error)
                    return
                }
                accepted(result)
                })
        }
        )

    },
//Método para atualizar as informações da turma

updateTurma: (id, nome, descricao, quantidade_alunos) => {
    return new Promise((accepted, rejected) => {
        database.query(
            `UPDATE turma SET nome = '${nome}', descricao = '${descricao}', quantidade_alunos '${quantidade_alunos}', WHERE ${id}`,
            (error, result) => {
                if(error){
                    rejected(error)
                    return
                }
                accepted(result)
                })
        }
        )

    },
//Método para deletar uma turma
deleteTurma: (id) => {
    return new Promise((accepted, rejected) => {
        database.query(
            `DELETE FROM turma WHERE id = ${id}`, (error, result) => {
                if(error){
                    rejected(error)
                    return
                }
                accepted(result)
                })
        }
        )

    },

//Método para adicionar quantidade de alunos a turma
AddAlunos: (id) => {
    return new Promise((accepted, rejected) => {
        database.query(`UPDATE turma SET quantidade_alunos = quantidade_alunos + 1 WHERE id = ${id}`, 
        (error, result) => {
            if(error){
                rejected(error)
                return
            }
            accepted(result)

            })

        }
        )

    },

//Método para excluir quantiade de alunos a turma
DelAlunos: (id) => {
    return new Promise((accepted, rejected) => {
        database.query(`UPDATE turma SET quantidade_alunos = quantidade_alunos - 1 WHERE id = ${id}`, 
        (error, result) => {
            if(error){
                rejected(error)
                return
            }
            accepted(result)

            })

        }
        )

    }



}