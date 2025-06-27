import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaNoticias } from "./noticias"
import bodyParser from "body-parser"
import cors from "cors"

dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(cors()) //configurando cors

const PORT = process.env.PORT

app.get("/", (req : Request , resp : Response) => {
    resp.send("Endpoint raiz")
})

app.get("/noticias",(req : Request , resp : Response) => {
    const lista = listaNoticias
    resp.json(lista)
})

app.post("/noticias",(req : Request , resp : Response) =>{
    const noticia = req.body
    const listaNot = listaNoticias
    
    if(noticia.id == undefined ||
        noticia.title == undefined ||
        noticia.categoria == undefined ||
        noticia.autor == undefined ||
        noticia.redaccion == undefined ||
        noticia.image == undefined ||
        noticia.dias == undefined ||
        noticia.select == undefined)
        {
            resp.status(400).json({
                msg : "Debe completar los campos vacios"
            })
            return
        }
    
    listaNot.push({
        id : new Date().getTime(),
        title : noticia.title,
        categoria : noticia.categoria,
        autor : noticia.autor,
        redaccion: noticia.redaccion,
        image : noticia.image,
        dias : noticia.dias,
        select : noticia.select
    })
    resp.json({
        msg: ""
    })
})

app.listen(PORT, () => {
    console.log(`se inicio en servidor en puerto ${PORT}`)
})