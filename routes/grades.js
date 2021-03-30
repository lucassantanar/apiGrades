import express from "express";
import { promises as fs } from "fs";

const {readFile, writeFile} = fs;

const router = express.Router();

// Este endpoint cadastra a grade. 
router.post("/", async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextId++, ...account, timestamp: new Date()};
    data.grades.push(account);

    await writeFile(global.fileName, JSON.stringify(data));

    res.send(account); 
  }catch(err){
    res.status(400).send({error: err.message});
  }

});

//este endpoint lista todos as grades.
router.get("/listaGrades", async (req, res) => {
  try{
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
  }catch(err) {
    res.status(400).send({error: err.message});
  }
});


// este endpoint lista as grades por id passado como parametro
router.get("/:id", async (req, res) => {
  try{
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.grades.find(
        account => account.id === parseInt(req.params.id));
        res.send(account);
  }catch(err) {
    res.status(400).send({error: err.message});
  }
});

//este endpoint deleta uma grade com id passado por parametro 
router.delete("/:id", async (req, res) => {
  try{
    const data = JSON.parse(await readFile(global.fileName));
    
    data.grades = data.grades.filter(
      account => account.id !== parseInt(req.params.id));

    await writeFile(global.fileName, JSON.stringify(data));
    res.end();
  }catch(err) {
    res.status(400).send({error: err.message});
  }
});

//este endpoint altera uma grade com id passado por parametro e verifica
//se o id da grade existe, se não existir retorna erro 
router.put("/", async (req, res) => {
  try{
    const account = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(a => a.id === account.id);

    if (index === -1) {
      res.send({error: "Grade não encontrada"})
    } else {
      data.grades[index] = account;

      await writeFile(global.fileName, JSON.stringify(data));
      res.send(account);
    }
  }catch(err){
    res.status(400).send({error: err.message});
  }
});


//retorna as grades por subject e student e devolve as notas por subject.
router.get("/notasPorMateria", async (req, res) => {
  try {
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));
    
    const student = data.grades.filter(std => std.student === account.student );
    const result = student.filter(students => students.subject === account.subject);
    const values = result.map(item => {
      return item.value
    });


    let total = 0;
    for ( var i = 0; i < values.length; i++ ){
    total += values[i];
    }

    res.send({TotaldeNotas: total, ...student});
    console.log(total);

    }catch (err) {
    res.status(400).send({error: err.message});
  }
});


//Média das grades de determinado subject e type
router.get("/mediaGrades", async (req, res) => {
  try{
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const subject = data.grades.filter(sbt => sbt.subject === account.subject);
    const type = subject.filter(tp => tp.type === account.type);
    const values = type.map(item => {
      return item.value
    });

    let total = 0;
    for ( var i = 0; i < values.length; i++ ){
    total += values[i];
    }

    let final = total / values.length;

    res.send({MediadeNotas: final, ...type});
  }catch(err){
    res.status(400).send({error: err.message});
  }
});


//três melhores grades de acordo com determinado subject e type
router.get("/melhoresGrades", async (req, res) => {
  try{
    const account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    const subject = data.grades.filter(sbt => sbt.subject === account.subject);
    const type = subject.filter(tp => tp.type === account.type);
    const values = type.map(item => {
      return item.value
    });

    let highNumber = values.sort(function(a, b){return b-a});
    console.log(highNumber);
    console.log(type);
    res.send({valor1: values[0], valor2: values[1], valor3: values[2]});
  }catch(err){
    res.status(400).send({error: err.message});
  }
});



export default router;