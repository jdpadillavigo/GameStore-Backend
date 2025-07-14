import express, { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma"
import { randomInt } from "crypto"


const UsersController = () => {
    const router = express.Router()

    // GET - Obtener todos los usuarios
    router.get("/", async (req: Request, resp: Response) => {
        const prisma = new PrismaClient()
        const usuarios = await prisma.usuario.findMany()
        resp.json(usuarios)
    })

    // POST - Registrar usuario (para Register.tsx)
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
        const role = usuario.name.trim().toLowerCase().startsWith("Admin") ? "admin" : "usuarios";
        const usuarioCreado = await prisma.usuario.create({
            data: {
                email: usuario.email,
                password: usuario.password,
                name: usuario.name,
                country: usuario.country,
                token: randomInt(100_000, 1_000_000),
                role: role,
            }
        })

        resp.json({
            msg: "Usuario registrado correctamente"
        })
    })

    // POST - Login (para Login.tsx)
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
            msg: "Inicio de sesión exitoso"
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