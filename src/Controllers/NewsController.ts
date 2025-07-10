import express, { Request, Response } from "express"
import { listNews, news } from "../News"
import { PrismaClient } from "../generated/prisma"

const NewsController = () => {
    const router = express.Router()

    // Endpoints Noticias
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const noticias = await prisma.noticia.findMany()
        resp.json(noticias)
    })

    router.post("/", (req: Request, resp: Response) => {
        const nota = req.body
        const listaNot = listNews

        if (nota.id == undefined ||
            nota.title == undefined ||
            nota.category == undefined ||
            nota.author == undefined ||
            nota.redaction == undefined ||
            nota.image == undefined ||
            nota.days == undefined
        ) {
            resp.status(400).json({
                msg: "Debe llenar todos los campos"
            })
            return
        }

        listaNot.push({
            id: nota.id,
            title: nota.title,
            category: nota.category,
            author: nota.author,
            redaction: nota.redaction,
            image: nota.image,
            days: nota.days
        })

        resp.json({
            msg: "Noticia agregada correctamente"
        })
    })

    router.put("/:id", (req: Request, resp: Response) => {
        const nota = req.body
        const notaId = req.params.id
        const listaNot = listNews

        if (notaId == undefined) {
            resp.status(400).json({
                msg: "Debe enviar un ID como parte del path"
            })
            return
        }
        if (nota.id == undefined ||
            nota.title == undefined ||
            nota.category == undefined ||
            nota.author == undefined ||
            nota.redaction == undefined ||
            nota.image == undefined
        ) {
            resp.status(400).json({
                msg: "Debe llenar todos los campos"
            })
            return
        }

        for (let nt of listaNot) {
            if (nt.id.toString() == notaId) {
                nt.title = nota.title
                nt.category = nota.category
                nt.author = nota.author
                nt.redaction = nota.redaction
                nt.image = nota.image
                resp.json({
                    msg: "Noticia editada correctamente"
                })
                return
            }
        }

        resp.status(400).json({
            msg: "No existe noticia con ese ID"
        })
    })

    router.delete("/:id", (req: Request, resp: Response) => {
        const notaId = req.params.id
        const list = listNews

        const indiceAEliminar = list.findIndex((nt: news) => {
            return nt.id.toString() == notaId
        })

        if (indiceAEliminar == -1) {
            resp.status(400).json({
                msg: "No existe noticia con ese ID"
            })
            return
        }

        list.splice(indiceAEliminar, 1)

        resp.json({
            msg: "Noticia eliminada correctamente"
        })
    })
    
    return router
}

export default NewsController;