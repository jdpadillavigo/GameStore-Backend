import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"

const UsersController = () => {
    const router = express.Router()

    router.get("/a/usuarios", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuarios = await prisma.usuario.findMany()
        resp.json(usuarios)
    })

    router.post("/register", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuario = req.body

        if (
            usuario.email == undefined ||
            usuario.password == undefined ||
            usuario.name == undefined ||
            usuario.country == undefined
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
            resp.status(400).json({
                msg: "Ya existe un usuario con ese correo"
            })
            return
        }
        const role = usuario.name.trim().startsWith("Admin") ? "admin" : "usuario";
        const usuarioCreado = await prisma.usuario.create({
            data: {
                email: usuario.email,
                password: usuario.password,
                name: usuario.name,
                country: usuario.country,
                token: usuario.token,
                role: role
            }
        })

        resp.json({
            msg: "Usuario registrado correctamente"
        })
    })

    router.post("/login", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const { email, password } = req.body

        if (email == undefined || password == undefined) {
            resp.status(400).json({
                msg: "Debe ingresar email y contraseña"
            })
            return
        }

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        })

        if (!usuario) {
            resp.status(400).json({
                msg: "Usuario no registrado"
            })
            return
        }

        if (usuario.password !== password) {
            resp.status(400).json({
                msg: "Contraseña incorrecta"
            })
            return
        }

        resp.json({
            msg: "Inicio de sesión exitoso",
            usuario: {
                id: usuario.id,
                email: usuario.email,
                name: usuario.name,
                country: usuario.country,
                role: usuario.role
            }
        });
    })

    router.put("/a/usuarios/:id", async (req: Request, resp: Response) => {
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
            usuario.password == undefined ||
            usuario.name == undefined ||
            usuario.country == undefined ||
            usuario.role == undefined
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
                    password: usuario.password,
                    name: usuario.name,
                    country: usuario.country,
                    role: usuario.role
                }
            })

            resp.json({
                msg: "Usuario actualizado correctamente"
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