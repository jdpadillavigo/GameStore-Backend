import express, { Request, Response } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import NewsController from "./Controllers/NewsController"
import GamesController from "./Controllers/GamesController"
import UsersController from "./Controllers/UsersController"

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(cors())

const PORT = process.env.PORT

app.get("/", (req : Request , resp : Response) => {
    resp.send("Endpoint raiz")
})

app.use("/noticias", NewsController())
app.use("/juegos",GamesController())
app.use("/usuarios",UsersController())

app.listen(PORT, () => {
    console.log(`Se inició el servidor en puerto ${PORT}`)
})
