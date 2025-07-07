import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaNoticias, noticia } from "./noticias"
import { Games, Game } from "./games"
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

app.listen(PORT, () => {
    console.log(`Se inició el servidor en puerto ${PORT}`)
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
        platform: newGame.platform,
    };

    resp.json({
        msg: "Juego agregado correctamente"
    })
})

app.put("/juegos/:id", (req: Request, resp: Response) => {
    const gameSelected = req.body;
    const gameKey = req.params.id;

    if (!gameKey) {
    resp.status(400).json({
        msg: "Debe enviar un ID como parte del path",
    });
    return;
    }

    if (
    gameSelected.title === undefined ||
    gameSelected.description === undefined ||
    gameSelected.trailer === undefined ||
    !Array.isArray(gameSelected.images) ||
    gameSelected.release_date === undefined ||
    gameSelected.category === undefined ||
    typeof gameSelected.base_price !== "number" ||
    typeof gameSelected.discount !== "number" ||
    gameSelected.platform === undefined
    ) {
    resp.status(400).json({
        msg: "Debe llenar todos los campos",
    });
    return;
    }

    if (!Games[gameKey]) {
    resp.status(404).json({
        msg: "No existe un juego con ese ID",
    });
    return;
    }

    Games[gameKey] = {
    ...Games[gameKey],
    title: gameSelected.title,
    description: gameSelected.description,
    trailer: gameSelected.trailer,
    images: gameSelected.images,
    release_date: gameSelected.release_date,
    category: gameSelected.category,
    base_price: gameSelected.base_price,
    discount: gameSelected.discount,
    platform: gameSelected.platform,
    };

    resp.json({
    msg: "Juego editado correctamente",
    });
});
