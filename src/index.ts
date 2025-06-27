import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { listaNoticias, noticia } from "./noticias"
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
    const nota = req.body
    const listaNot = listaNoticias

    if(nota.id == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar el nuevo id"
        })
        return
    }
    if(nota.title == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar el nuevo titulo"
        })
        return
    }
    if(nota.categoria == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar la nueva categoria"
        })
        return
    }
    if(nota.autor == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar el nuevo autor"
        })
        return
    }
    if(nota.redaccion == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar la nueva redaccion"
        })
        return
    }
    if(nota.image == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar el nuevo link de la imagen"
        })
        return
    }
    if(nota.dias == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar el nuevo link de la imagen"
        })
        return
    }
    if(nota.select == undefined)
    {
        resp.status(400).json({
            msg : "Debe llenar el nuevo link de la imagen"
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
        dias : nota.dias,
        select : nota.select
    })
    resp.json({
        msg: ""
    })
})

app.put("/noticias/:id",(req : Request , resp : Response) => {
    const nota = req.body
    const notaId = req.params.id
    const listaNot = listaNoticias

    if(notaId == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar un id como parte del path"
        })
        return
    }

    if(nota.title == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar el titulo"
        })
        return
    }
    if(nota.categoria == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar la categoria"
        })
        return
    }
    if(nota.autor == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar el autor"
        })
        return
    }
    if(nota.redaccion == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar la redaccion"
        })
        return
    }
    if(nota.image == undefined)
    {
        resp.status(400).json({
            msg : "Debe enviar el link de la imagen"
        })
        return
    }

    for (let nt of listaNot)
    {
        if(nt.id.toString() == notaId){
            nt.title = nota.descripcion
            nt.categoria = nota.categoria
            nt.autor = nota.autor
            nt.redaccion = nota.redaccion
            nt.image = nota.image
            resp.json({
                msg : ""
            })
            return
        }
        resp.status(400).json({
            msg : "No existe noticia con ese id"
        })
        return
    }

    resp.status(400).json({
        msg : "No existe todo con ese id"
    })
    return
})

app.delete("/noticias/:id",(req : Request , resp : Response) => {
    const notaId = req.params.id
    const lista = listaNoticias

    const indiceAEliminar = lista.findIndex((nt : noticia) => {
        return nt.id.toString() == notaId
    })

    if(indiceAEliminar == -1){
        resp.status(400).json({
            msg : "No existe noticia con ese id"
        })
        return
    }

    lista.splice(indiceAEliminar, 1)

    resp.json({
        msg : ""
    })
})

app.listen(PORT, () => {
    console.log(`se inicio en servidor en puerto ${PORT}`)
})