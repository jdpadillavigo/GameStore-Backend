import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const GamesController = () => {
  const router = express.Router();

  // Obtener todos los juegos con relaciones
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const juegos = await prisma.juego.findMany({
        include: {
          calificaciones: true,
          plataformas: { include: { plataforma: true } },
          categorias: { include: { categoria: true } }
        }
      });

      const juegosFormateados = juegos.map(juego => ({
        id: juego.id,
        title: juego.title,
        description: juego.description,
        trailer: juego.trailer,
        images: juego.images,
        reviews: juego.calificaciones.map(r => ({
          author: r.author,
          message: r.message,
          stars: r.stars
        })),
        release_date: juego.release_date,
        category: juego.categorias.map(c => c.categoria.name).join(", "),
        base_price: juego.base_price,
        discount: juego.discount,
        platform: juego.plataformas.map(p => p.plataforma.name).join(", ")
      }));

      res.json(juegosFormateados);
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
      res.status(400).json({ 
        msg: "Error al obtener los juegos" 
      });
    }
  });

  // Crear un nuevo juego
  router.post("/", async (req: any, res: any) => {
    const {
      id,
      title,
      description,
      trailer,
      images,
      release_date,
      base_price,
      discount,
      platform,
      category
    } = req.body;

    if (
      !id || !title || !description || !trailer ||
      !Array.isArray(images) || !release_date ||
      base_price == null || discount == null ||
      !platform || !category
    ) {
      return res.status(400).json({ msg: "Debe llenar todos los campos" });
    }

    // Aseguramos que sean arrays
    const platformArray = Array.isArray(platform)
      ? platform
      : platform.split(",").map((p: string) => p.trim());

    const categoryArray = Array.isArray(category)
      ? category
      : category.split(",").map((c: string) => c.trim());

    try {
      const juego = await prisma.juego.create({
        data: {
          id,
          title,
          description,
          trailer,
          images,
          release_date, // como string, según tu modelo
          base_price,
          discount,
          plataformas: {
            create: await Promise.all(
              platformArray.map(async (name: string) => {
                const plataforma = await prisma.plataforma.upsert({
                  where: { name },
                  update: {},
                  create: { name }
                });
                return {
                  plataforma: {
                    connect: { id: plataforma.id }
                  }
                };
              })
            )
          },
          categorias: {
            create: await Promise.all(
              categoryArray.map(async (name: string) => {
                const categoria = await prisma.categoria.upsert({
                  where: { name },
                  update: {},
                  create: { name }
                });
                return {
                  categoria: {
                    connect: { id: categoria.id }
                  }
                };
              })
            )
          }
        }
      });

      res.status(200).json({ 
        msg: "Juego creado exitosamente" 
      });
    } catch (error) {
      console.error("Error al crear juego:", error);
      res.status(400).json({ 
        msg: "Error al crear juego" 
      });
    }
  });

  // Actualizar un juego existente
  router.put("/:id", async (req: any, res: any) => {
    const gameId = req.params.id;
    const {
      id,
      title,
      description,
      trailer,
      images,
      release_date,
      base_price,
      discount,
      platform,
      category
    } = req.body;

    if (
      !id || !title || !description || !trailer ||
      !Array.isArray(images) || !release_date ||
      base_price == null || discount == null ||
      !platform || !category
    ) {
      return res.status(400).json({ msg: "Debe llenar todos los campos" });
    }

    const platformArray = Array.isArray(platform)
      ? platform
      : platform.split(",").map((p: string) => p.trim());

    const categoryArray = Array.isArray(category)
      ? category
      : category.split(",").map((c: string) => c.trim());

    try {
      const juegoExistente = await prisma.juego.findUnique({ where: { id: gameId } });
      if (!juegoExistente) {
        return res.status(404).json({ msg: "Juego no encontrado" });
      }

      await prisma.juego.update({
        where: { id: gameId },
        data: {
          id,
          title,
          description,
          trailer,
          images,
          release_date,
          base_price,
          discount
        }
      });

      // Reemplazar relaciones
      await prisma.plataformaJuego.deleteMany({ where: { juegoId: gameId } });
      await Promise.all(
        platformArray.map(async (name: string) => {
          const plataforma = await prisma.plataforma.upsert({
            where: { name },
            update: {},
            create: { name }
          });
          await prisma.plataformaJuego.create({
            data: {
              juegoId: gameId,
              plataformaId: plataforma.id
            }
          });
        })
      );

      await prisma.categoriaJuego.deleteMany({ where: { juegoId: gameId } });
      await Promise.all(
        categoryArray.map(async (name: string) => {
          const categoria = await prisma.categoria.upsert({
            where: { name },
            update: {},
            create: { name }
          });
          await prisma.categoriaJuego.create({
            data: {
              juegoId: gameId,
              categoriaId: categoria.id
            }
          });
        })
      );

      res.json({ msg: 
        "Juego actualizado correctamente" 
      });
    } catch (error) {
      res.status(400).json({ 
        msg: "Error al actualizar juego" 
      });
    }
  });

  // Eliminar un juego
  router.delete("/:id", async (req: Request, res: Response) => {
    const gameId = req.params.id;

    try {
      await prisma.calificacion.deleteMany({ where: { juegoId: gameId } });
      await prisma.plataformaJuego.deleteMany({ where: { juegoId: gameId } });
      await prisma.categoriaJuego.deleteMany({ where: { juegoId: gameId } });

      await prisma.juego.delete({ where: { id: gameId } });

      res.json({ msg: 
        "Juego eliminado correctamente" 
      });
    } catch (error) {
      res.status(400).json({ 
        msg: "Error al eliminar juego", error 
      });
    }
  });

  return router;
};

export default GamesController;
