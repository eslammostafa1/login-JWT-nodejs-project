import express from "express";
import path from "path";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import routerauth from "./routes/auth.js";
import { fileURLToPath } from 'url';
import mydb from "./config.js";

dotenv.config({path: './.env'})
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const publicDir = path.join(__dirname, './public')

app.use(express.static(publicDir));

app.use(express.urlencoded({ extended: false}));
app.use(express.json())

app.set('view engine', 'hbs')

mydb.connect((error) => {
    if(error){
        console.log(error)
    } else {
        console.log("MySQL database connected ....")
    }
})

app.use('/', router)
app.use('/auth', routerauth)

app.listen(5000, () => {
    console.log("server start on port 5000")
})
