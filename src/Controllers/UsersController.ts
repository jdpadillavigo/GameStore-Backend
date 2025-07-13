import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const UsersController = () => {
    const router = express.Router()
    
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuarios = await prisma.usuario.findMany()
        resp.json(usuarios)
    })
    router.post("/login", async (req : Request, resp : Response) => {
        const prisma = new PrismaClient()
        const requestData = req.body

        const email = requestData.email
        const password = requestData.password

        if (email == undefined || password == undefined) {
            resp.status(400).json({
                msg : "Debe enviar correo y password."
            })
            return
        }

        const usuario = await prisma.usuario.findFirst({
            omit : {
                pasword : true
            },
            where : {
                email : email,
                pasword : password
            }
        })

        if (usuario == undefined) {
            
            resp.status(400).json({
                msg : "Login incorrecto."
            })
            return
        }

        resp.json({
            msg : "",
            usuario : usuario
        })
    })
    

    return router
}

export default UsersController;