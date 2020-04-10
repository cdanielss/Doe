const express = require("express")
const servidor = express()

//habilitar body do formulario
servidor.use(express.urlencoded({extended: true}))

servidor.get("/", function(req, res){
    db.query('select * from doador order by iddoador desc limit 4', function(err, result){
        if(err) return res.send("ERRO")

        const doadores = result
        return res.render("index.html", {doadores})
    })
    
})

servidor.post("/", function(req, res){
    //pegar dados do formulario
    const nome = req.body.nome
    const email = req.body.email
    const tiposangue = req.body.sangue
    if (nome == "" || email == "" || tiposangue == ""){
        return res.send("Todos os Campos são Obrigatórios!")
    }
    
    //coloca valores no banco de dados
    const query = `INSERT INTO doador (nome, email, tiposangue) VALUES (?,?,?)`
    const values = [nome, email, tiposangue]
    db.query(query, values, function(err){
        //fluxo de erro
        if(err) return res.send("erro no banco")

        //fluxo normal
        return res.redirect("/")
    })
    
})

servidor.listen(3003) //porta do servidor

//configurando a template 
const nunjucks =  require("nunjucks")

nunjucks.configure("./", {
    express: servidor,
    noCache: true,
})

//configurando o resto da aplicacao estaticoss
servidor.use(express.static('public'))


//configurando banco de dados
const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'localhost',
    user: 'carlos',
    password: 'samA51973', 
    database: 'doadores'
})
