import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const UsersController = () => {
    const router = express.Router()

    // GET - Obtener todos los usuarios
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuarios = await prisma.usuario.findMany()
        resp.json(usuarios)
    })

    // POST - Registrar usuario (para Register.tsx)
    router.post("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuario = req.body

        if (
            usuario.email == undefined ||
            usuario.pasword == undefined ||
            usuario.name == undefined
        ) {
            resp.status(400).json({
                msg: "Debe llenar todos los campos"
            })
            return
        }

        const existente = await prisma.usuario.findUnique({
            where: { email: usuario.email }
        })

        if (existente) {
            resp.status(409).json({
                msg: "Ya existe un usuario con ese correo"
            })
            return
        }

        const usuarioCreado = await prisma.usuario.create({
            data: {
                email: usuario.email,
                pasword: usuario.pasword,
                name: usuario.name,
                token: "",
                status: true
            }
        })

        resp.json({
            msg: "Usuario registrado correctamente",
            usuario: usuarioCreado
        })
    })

    // POST - Login (para Login.tsx)
    router.post("/login", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { email, pasword } = req.body

        if (email == undefined || pasword == undefined) {
            resp.status(400).json({
                msg: "Debe ingresar email y contraseña"
            })
            return
        }

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        })

        if (!usuario) {
            resp.status(404).json({
                msg: "Usuario no registrado"
            })
            return
        }

        if (usuario.pasword !== pasword) {
            resp.status(401).json({
                msg: "Contraseña incorrecta"
            })
            return
        }

        resp.json({
            msg: "Inicio de sesión exitoso",
            usuario
        })
    })

    // PUT - Actualizar datos del usuario (para edición futura)
    router.put("/:id", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuario = req.body
        const usuarioId = parseInt(req.params.id)

        if (usuarioId == undefined) {
            resp.status(400).json({
                msg: "Debe enviar un ID como parte del path"
            })
            return
        }

        if (
            usuario.email == undefined ||
            usuario.pasword == undefined ||
            usuario.name == undefined ||
            usuario.status == undefined
        ) {
            resp.status(400).json({
                msg: "Debe llenar todos los campos"
            })
            return
        }

        try {
            const usuarioModificado = await prisma.usuario.update({
                where: { id: usuarioId },
                data: {
                    email: usuario.email,
                    pasword: usuario.pasword,
                    name: usuario.name,
                    status: usuario.status
                }
            })

            resp.json({
                msg: "Usuario actualizado correctamente",
                usuario: usuarioModificado
            })
        } catch (e) {
            resp.status(400).json({
                msg: "No existe usuario con ese ID"
            })
        }
    })

    return router
}

export default UsersController;

