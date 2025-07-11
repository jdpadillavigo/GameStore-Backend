import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const NewsController = () => {
    const router = express.Router()

    // Endpoints Noticias
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const noticias = await prisma.noticia.findMany()
        resp.json(noticias)
    })

    router.post("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const nota = req.body

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

        const noticiaCreada = await prisma.noticia.create({
            data: nota
        })

       resp.json({
            msg: "Noticia agregada correctamente",
            nota: noticiaCreada
        })
    })

    router.put("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const nota = req.body
        const notaId = parseInt(req.params.id)

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

        try {
            const noticiaModificada = await prisma.noticia.update({
                where : {
                    id : notaId
                },
                data : nota
            })
            resp.json({
                msg: "Noticia editada correctamente",
                nota: noticiaModificada
            })
        } catch (e) {
            resp.status(400).json({
                msg: "No existe noticia con ese ID"
            })
        }
    })

    router.delete("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const notaId = parseInt(req.params.id)

        if (notaId == undefined) {
            resp.status(400).json({
                msg: "Debe enviar el ID como parte del path"
            })
            return
        }
        try {
            await prisma.noticia.delete({
                where : {
                    id : notaId
                }
            })
            resp.json({
                msg: "Noticia eliminada correctamente"
            })
        } catch (e) {
            resp.status(400).json({
                msg : "No existe noticia con ese ID"
            })
            return
        }
    })
    
    return router
}

export default NewsController;