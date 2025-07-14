import express, { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const GamesController = () => {
  const router = express.Router();

  // Obtener todos los juegos con sus relaciones
  router.get("/", async (_req: Request, res: Response) => {
    try {
      const juegos = await prisma.juego.findMany({
        include: {
          venta: true,
          calificaciones: true,
          plataformas: {
            include: { plataforma: true }
          },
          categorias: {
            include: { categoria: true }
          }
        }
      });

      // Formatear los juegos al formato solicitado
      const juegosFormateados = juegos.map(juego => {
        const primeraVenta = juego.venta[0]; // tomar la primera venta, si existe

        return {
          id: juego.id,
          title: juego.title,
          description: juego.description,
          trailer: juego.trailer,
          images: juego.images,
          reviews: juego.calificaciones.map(c => ({
            author: c.author,
            message: c.message,
            stars: c.stars
          })),
          release_date: juego.date_release,
          category: juego.categorias.map(c => c.categoria.name).join(", "),
          base_price: primeraVenta?.base_price ?? 0,
          discount: primeraVenta?.discount ?? 0,
          platform: juego.plataformas.map(p => p.plataforma.name).join(", ")
        };
      });

      res.json(juegosFormateados);
    } catch (error) {
      console.error("Error al obtener los juegos:", error);
      res.status(400).json({
        msg: "Error al obtener los juegos"
      });
    }
  });

  // Crear nuevo juego
  router.post("/", async (req: any, res: any) => {
  const {
    id,
    title,
    description,
    trailer,
    images,
    release_date,
    category,
    base_price,
    discount,
    platform,
    reviews = []
  } = req.body;

  const categories = typeof category === "string" ? category.split(",").map(s => s.trim()) : [];
  const platforms = typeof platform === "string" ? platform.split(",").map(s => s.trim()) : [];

  if (!id || !title || !description || !trailer || !Array.isArray(images) || !release_date || !category || !platform || typeof base_price !== "number" || typeof discount !== "number") {
    return res.status(400).json({ msg: "Debe llenar todos los campos correctamente." });
  }

  try {
    const juego = await prisma.juego.create({
      data: {
        id,
        title,
        description,
        trailer,
        images,
        date_release: release_date,
        venta: {
          create: { base_price, discount }
        },
        calificaciones: {
          create: reviews.map((r: any) => ({
            message: r.message,
            stars: r.stars,
            author: r.author ?? "Anon"
          }))
        },
        categorias: {
          create: await Promise.all(categories.map(async (catName: string) => {
            const cat = await prisma.categoria.upsert({
              where: { name: catName },
              update: {},
              create: { name: catName }
            });
            return { categoriaId: cat.id };
          }))
        },
        plataformas: {
          create: await Promise.all(platforms.map(async (platName: string) => {
            const plat = await prisma.plataforma.upsert({
              where: { name: platName },
              update: {},
              create: { name: platName }
            });
            return { plataformaId: plat.id };
          }))
        }
      }
    });

    res.json({ 
      msg: "Juego agregado correctamente" 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: "Error al agregar juego" 
    });
  }
});

  // Actualizar juego
  router.put("/:id", async (req: Request, res: Response) => {
    const juegoId = req.params.id;
    const {
      id,
      title,
      description,
      trailer,
      images,
      release_date,
      category,
      base_price,
      discount,
      platform,
      userId = 1, // ✅ Por defecto userId 1, o toma desde frontend/session si tienes login
      reviews = []
    } = req.body;

    const categories = typeof category === "string" ? category.split(",").map(s => s.trim()) : [];
    const platforms = typeof platform === "string" ? platform.split(",").map(s => s.trim()) : [];

    if (!id || !title || !description || !trailer || !Array.isArray(images) || !release_date || !category || !platform || typeof base_price !== "number" || typeof discount !== "number") {
      return res.status(400).json({ msg: "Debe llenar todos los campos correctamente." });
    }

    try {
      // Eliminar relaciones antiguas
      await prisma.categoriaJuego.deleteMany({ where: { juegoId } });
      await prisma.plataformaJuego.deleteMany({ where: { juegoId } });
      await prisma.calificacion.deleteMany({ where: { juegoId } });

      // Actualizar juego
      await prisma.juego.update({
        where: { id: juegoId },
        data: {
          id,
          title,
          description,
          trailer,
          images,
          date_release: release_date
        }
      });

      // Actualizar o crear venta
      const ventaExistente = await prisma.venta.findUnique({ where: { juegoId } });

      if (ventaExistente) {
        await prisma.venta.update({
          where: { juegoId },
          data: {
            base_price,
            discount,
            userId
          }
        });
      } else {
        await prisma.venta.create({
          data: {
            juegoId,
            base_price,
            discount,
            userId
          }
        });
      }

      // Crear nuevas calificaciones
      for (const r of reviews) {
        await prisma.calificacion.create({
          data: {
            juegoId,
            message: r.message,
            stars: r.stars,
            author: r.author ?? "Anon",
            userId
          }
        });
      }

      // Crear nuevas categorías
      for (const catName of categories) {
        const cat = await prisma.categoria.upsert({
          where: { name: catName },
          update: {},
          create: { name: catName }
        });

        await prisma.categoriaJuego.create({
          data: {
            juegoId,
            categoriaId: cat.id
          }
        });
      }

      // Crear nuevas plataformas
      for (const platName of platforms) {
        const plat = await prisma.plataforma.upsert({
          where: { name: platName },
          update: {},
          create: { name: platName }
        });

        await prisma.plataformaJuego.create({
          data: {
            juegoId,
            plataformaId: plat.id
          }
        });
      }

      res.json({ msg: "Juego actualizado correctamente" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al actualizar juego" });
    }
  });

  // Eliminar juego
  router.delete("/:id", async (req: Request, res: Response) => {
    const juegoId = req.params.id;

    try {
      await prisma.categoriaJuego.deleteMany({ where: { juegoId } });
      await prisma.plataformaJuego.deleteMany({ where: { juegoId } });
      await prisma.calificacion.deleteMany({ where: { juegoId } });
      await prisma.venta.deleteMany({ where: { juegoId } });
      await prisma.juego.delete({ where: { id: juegoId } });

      res.json({ 
        msg: "Juego eliminado correctamente" 
      });
    } catch (error) {
      res.status(400).json({ 
        msg: "Error al eliminar juego",  
      });
    }
  });

  return router;
};

export default GamesController;