import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaNoticias, noticia } from "./noticias"
import { Games } from "./games"
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
    const lista = listaNoticias
    resp.json(lista)
})

app.post("/noticias",(req : Request , resp : Response) =>{
    const nota = req.body
    const listaNot = listaNoticias

    if(nota.id == undefined ||
        nota.title == undefined ||
        nota.categoria == undefined ||
        nota.autor == undefined ||
        nota.redaccion == undefined ||
        nota.image == undefined ||
        nota.dias == undefined
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
        categoria : nota.categoria,
        autor : nota.autor,
        redaccion: nota.redaccion,
        image : nota.image,
        dias : nota.dias
    })

    resp.json({
        msg: "Noticia agregada correctamente"
    })
})

app.put("/noticias/:id",(req : Request , resp : Response) => {
    const nota = req.body
    const notaId = req.params.id
    const listaNot = listaNoticias

    if(notaId == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar un ID como parte del path"
        })
        return
    }
    if(nota.id == undefined ||
        nota.title == undefined ||
        nota.categoria == undefined ||
        nota.autor == undefined ||
        nota.redaccion == undefined ||
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
            nt.categoria = nota.categoria
            nt.autor = nota.autor
            nt.redaccion = nota.redaccion
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
    const lista = listaNoticias

    const indiceAEliminar = lista.findIndex((nt : noticia) => {
        return nt.id.toString() == notaId
    })

    if(indiceAEliminar == -1){
        resp.status(400).json({
            msg : "No existe noticia con ese ID"
        })
        return
    }

    lista.splice(indiceAEliminar, 1)

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
        newGame.key === undefined ||
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

    if (Games[newGame.key]) {
        resp.status(400).json({
          msg: "El juego con esa clave ya existe"
        });
        return;
    }

    Games[newGame.key] = {
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
    };

    resp.json({
        msg: "Juego agregado correctamente"
    })
})

app.put("/juego/:key", (req: Request, resp: Response) => {
    const key = decodeURIComponent(req.params.key)
    const updatedGame = req.body

    if (
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

    if (!Games[key]) {
        resp.status(404).json({
            msg: "No existe un juego con ese ID"
        })
        return
    }

    const { id, ...gameData } = updatedGame;
    if (id && id !== key) {
        delete Games[key];
        Games[id] = { ...gameData };
    } else {
        Games[key] = { ...Games[key], ...updatedGame };
    }

    Games[key] = { ...Games[key], ...updatedGame }
    resp.json({
        msg: "Juego actualizado correctamente"
    })
    return
})

app.delete("/juego/:key", (req: Request, resp: Response) => {
    const key = decodeURIComponent(req.params.key)

    if (!Games[key]) {
        resp.status(404).json({
            msg: "No existe un juego con ese ID"
        })
        return
    }

    delete Games[key]
    resp.json({
        msg: "Juego eliminado correctamente"
    })
})
