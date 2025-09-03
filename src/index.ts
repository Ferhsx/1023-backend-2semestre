import mysql from 'mysql2/promise';
import express from 'express';
import 'dotenv/config';

const app = express();
app.get('/', async (req, res) => {
    if (process.env.DBHOST === undefined) {
        res.status(500).send("DBHOST is not defined");
        return
    }
    if (process.env.DBUSER === undefined) {
        res.status(500).send("DBUSER is not defined");
        return
    }
    if (process.env.DBPASSWORD === undefined) {
        res.status(500).send("DBPASSWORD is not defined");
        return
    }
    if (process.env.DBDATABASE === undefined) {
        res.status(500).send("DBDATABASE is not defined");
        return
    }
    if (process.env.DBPORT === undefined) {
        res.status(500).send("DBPORT is not defined");
        return
    }
    
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        });
        res.send(`
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <p>Conectado, clique nesse botão para ver os produtos</p>
                <button onclick="window.location.href='/produtos' "style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Produtos
                </button>
            </div>
        `)
    }
    catch (err) {
        if(err instanceof Error === false){
            res.status(500).send("erro q n sabo")
            return
        }
        const error = err as Error
        res.status(500).send("Erro ao conectar no banco de dados " + error.message)
    }

})

app.get('/produtos', async (req, res) => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        });
        const [rows] = await conn.query('SELECT * FROM produtos');
        res.send(rows)
    }
    catch (err) {
        if(err instanceof Error === false){
            res.status(500).send("erro q n sabo")
            return
        }
        const error = err as Error
        res.status(500).send("Erro ao conectar no banco de dados " + error.message)
    }
})

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})

//criar rota get que pega e retorna lista dos produtos do banco de dados do aiven, deve ter id, nome, preco, urlfoto, descricao
//deve ser uma array a resposta 
//crie o codigo sql para criar a tabela de produtos
/*
CREATE TABLE produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    urlfoto VARCHAR(255) NOT NULL,
    descricao TEXT
);

*/
