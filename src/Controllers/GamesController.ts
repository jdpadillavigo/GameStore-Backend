import express, { Request, Response } from "express"
import { Games, Game } from "../games"
import { PrismaClient } from "../generated/prisma"

const GamesController = () => {
    const router = express.Router()

    // Endpoints Juegos
    router.get("/", (req: Request, resp: Response) => {
        resp.json(Games)
    })

    router.post("/", (req: Request, resp: Response) => {
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
        ) {
            resp.status(400).json({
                msg: "Debe llenar todos los campos"
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

    router.put("/:id", (req: Request, resp: Response) => {
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

        for (let g of Games) {
            if (g.id.toString() == gameId || g.title === updatedGame.title) {
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
                    msg: "Juego actualizado correctamente"
                })
                return
            }
        }
    })

    router.delete("/:id", (req: Request, resp: Response) => {
        const gameId = decodeURIComponent(req.params.id)
        const gamesData = Games

        const indiceAEliminar = gamesData.findIndex((g: Game) => {
            return g.id.toString() == gameId
        })

        if (indiceAEliminar == -1) {
            resp.status(400).json({
                msg: "No existe juego con ese ID"
            })
            return
        }

        gamesData.splice(indiceAEliminar, 1)

        resp.json({
            msg: "Juego eliminado correctamente"
        })
    })

    return router
}

export default GamesController;