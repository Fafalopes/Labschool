const database = require('../database')

module.exports = {
     //Método para pesquisar todos os alunos
     searchAlunos: () => {
        return new Promise(
            (accepted, rejected) => {
                database.query("SELECT * FROM aluno", (error, result) => {
                    if(error){
                        rejected(error)
                        return
                    }
                    accepted(result)
                })
            }
        )

     },
//Método para pesquisar os alunos por curso
getAlunosByCurso: (codigo) =>  {
    return new Promise((accepted, rejected) => {
        database.query(
            `SELECT FROM aluno WHERE fk_turma = ${codigo}`, (error, result) => {
                if(error){
                    rejected(error)
                    return
                }
                accepted(result)
            }
        )

    })
        
},

getAlunoById: (id) => {
    return new Promise((accepted, rejected) => {
        database.query(`SELECT * FROM aluno WHERE id = ${id}`, (error, result) => {
            if(error){
                rejected(error)
                return
            }
            accepted(result)
        })

    }
    )
    
},

//Método para cadastrar um aluno
createAluno: (nome, telefone, data, endereco, turma) => {
    return new Promise((accepted, rejected) => {
        database.query(
            `INSERT INTO aluno (nome, telefone, dt_nascimento, endereco, fk_turma) VALUES
            ('${nome}','${telefone}', '${data}', '${endereco}', ${turma})`, 
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

//Método para atualizar as informações de aluno
updateAluno: (id, nome, telefone, data, endereco) => {
    return new Promise((accepted, rejected) => {
        database.query(
            `UPDATE aluno SET nome = '${nome}', telefone = '${telefone}', data = '${data}', endereco = '${endereco}', WHERE id = ${id}`,
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

  //Método para deletar um aluno
  deleteAluno: (id) => { 
    return new Promise((accepted, rejected) => {
        database.query(`DELETE FROM aluno WHERE id = ${id}`, (error, result) => {
            if (error){
                rejected(error)
                return
            }
            accepted(result)
        })

    }
    )
  
  }

}