import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listNews, news } from "./News"
import { Games, Game } from "./games"
import bodyParser from "body-parser"
import cors from "cors"

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

app.listen(PORT, () => {
    console.log(`Se inició el servidor en puerto ${PORT}`)
})

// Endpoints Noticias
app.get("/noticias",(req : Request , resp : Response) => {
    const lista = listNews
    resp.json(lista)
})

app.post("/noticias",(req : Request , resp : Response) =>{
    const nota = req.body
    const listaNot = listNews

    if(nota.id == undefined ||
        nota.title == undefined ||
        nota.category == undefined ||
        nota.author == undefined ||
        nota.redaction == undefined ||
        nota.image == undefined ||
        nota.days == undefined
    )
    {
        resp.status(400).json({
            msg : "Debe llenar todos los campos"
        })
        return
    }

    listaNot.push({
        id : nota.id,
        title : nota.title,
        category : nota.category,
        author : nota.author,
        redaction: nota.redaction,
        image : nota.image,
        days : nota.days
    })

    resp.json({
        msg: "Noticia agregada correctamente"
    })
})

app.put("/noticias/:id",(req : Request , resp : Response) => {
    const nota = req.body
    const notaId = req.params.id
    const listaNot = listNews

    if(notaId == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar un ID como parte del path"
        })
        return
    }
    if(nota.id == undefined ||
        nota.title == undefined ||
        nota.category == undefined ||
        nota.author == undefined ||
        nota.redaction == undefined ||
        nota.image == undefined
    )
    {
        resp.status(400).json({
            msg : "Debe llenar todos los campos"
        })
        return
    }

    for (let nt of listaNot)
    {
        if(nt.id.toString() == notaId){
            nt.title = nota.title
            nt.category = nota.category
            nt.author = nota.author
            nt.redaction = nota.redaction
            nt.image = nota.image
            resp.json({
                msg : "Noticia editada correctamente"
            })
            return
        }
    }

    resp.status(400).json({
        msg : "No existe noticia con ese ID"
    })
})

app.delete("/noticias/:id",(req : Request , resp : Response) => {
    const notaId = req.params.id
    const list = listNews

    const indiceAEliminar = list.findIndex((nt : news) => {
        return nt.id.toString() == notaId
    })

    if(indiceAEliminar == -1){
        resp.status(400).json({
            msg : "No existe noticia con ese ID"
        })
        return
    }

    list.splice(indiceAEliminar, 1)

    resp.json({
        msg : "Noticia eliminada correctamente"
    })
})


// Endpoints Juegos
app.get("/juegos",(req : Request , resp : Response) => {
    resp.json(Games)
})

app.post("/juegos",(req : Request , resp : Response) =>{
    const newGame = req.body

    if (
        newGame.id === undefined ||
        newGame.title === undefined ||
        newGame.description === undefined ||
        newGame.trailer === undefined ||
        !Array.isArray(newGame.images) ||
        newGame.release_date === undefined ||
        newGame.category === undefined ||
        typeof newGame.base_price !== 'number' ||
        typeof newGame.discount !== 'number' ||
        newGame.platform === undefined
    )
    {
        resp.status(400).json({
            msg : "Debe llenar todos los campos"
        })
        return
    }

    if (Games[newGame.id]) {
        resp.status(400).json({
          msg: "El juego con ese ID ya existe"
        });
        return;
    }

    Games.push({
        id: newGame.id,
        title: newGame.title,
        description: newGame.description,
        trailer: newGame.trailer,
        images: newGame.images,
        reviews: [],
        release_date: newGame.release_date,
        category: newGame.category,
        base_price: newGame.base_price,
        discount: newGame.discount,
        platform: newGame.platform
    })

    resp.json({
        msg: "Juego agregado correctamente"
    })
})

app.put("/juego/:id", (req: Request, resp: Response) => {
    const gameId = decodeURIComponent(req.params.id)
    const updatedGame = req.body

    if (
        updatedGame.id === undefined ||
        updatedGame.title === undefined ||
        updatedGame.description === undefined ||
        updatedGame.trailer === undefined ||
        !Array.isArray(updatedGame.images) ||
        updatedGame.release_date === undefined ||
        updatedGame.category === undefined ||
        typeof updatedGame.base_price !== "number" ||
        typeof updatedGame.discount !== "number" ||
        updatedGame.platform === undefined
    ) {
        resp.status(400).json({
            msg: "Debe llenar todos los campos"
        })
        return
    }

    let gameFound = false;
    for (let g of Games) {
        if (g.id.toString() === gameId || g.title === updatedGame.title) {
            gameFound = true;
            break;
        }
    }

    if (!gameFound) {
        resp.status(404).json({
            msg: "No existe un juego con ese ID o título"
        })
        return
    }

    for (let g of Games)
    {
        if(g.id.toString() == gameId || g.title === updatedGame.title){
            g.id = updatedGame.id
            g.title = updatedGame.title
            g.description = updatedGame.description
            g.trailer = updatedGame.trailer
            g.images = updatedGame.images
            g.release_date = updatedGame.release_date
            g.category = updatedGame.category
            g.base_price = updatedGame.base_price
            g.discount = updatedGame.discount
            g.platform = updatedGame.platform

            resp.json({
                msg : "Juego actualizado correctamente"
            })
            return
        }
    }
})

app.delete("/juego/:id", (req: Request, resp: Response) => {
    const gameId = decodeURIComponent(req.params.id)
    const gamesData = Games

    const indiceAEliminar = gamesData.findIndex((g : Game) => {
        return g.id.toString() == gameId
    })

    if(indiceAEliminar == -1){
        resp.status(400).json({
            msg : "No existe juego con ese ID"
        })
        return
    }

    gamesData.splice(indiceAEliminar, 1)

    resp.json({
        msg : "Juego eliminado correctamente"
    })
})
