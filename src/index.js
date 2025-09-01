"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
app.get('/', async (req, res) => {
    if (process.env.DBHOST === undefined) {
        res.status(500).send("DBHOST is not defined");
        return;
    }
    if (process.env.DBUSER === undefined) {
        res.status(500).send("DBUSER is not defined");
        return;
    }
    if (process.env.DBPASSWORD === undefined) {
        res.status(500).send("DBPASSWORD is not defined");
        return;
    }
    if (process.env.DBDATABASE === undefined) {
        res.status(500).send("DBDATABASE is not defined");
        return;
    }
    if (process.env.DBPORT === undefined) {
        res.status(500).send("DBPORT is not defined");
        return;
    }
    try {
        const conn = await promise_1.default.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASSWORD,
            database: process.env.DBDATABASE,
            port: Number(process.env.DBPORT)
        });
        res.send(process.env.DBHOST);
    }
    catch (err) {
        if (err instanceof Error === false) {
            res.status(500).send("erro q n sabo");
            return;
        }
        const error = err;
        res.status(500).send("Erro ao conectar no banco de dados" + error.message);
    }
});
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
//# sourceMappingURL=index.js.map