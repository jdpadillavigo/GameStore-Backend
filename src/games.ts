interface Review {
    author: string;
    message: string;
    stars: number;
}

export interface Game {
    id: string;
    title: string;
    description: string;
    trailer: string;
    images: string[];
    reviews: Review[];
    release_date: string;
    category: string;
    base_price: number;
    discount: number;
    platform: string;
}

export const Games: Game[] = [
    {
        id: "GTA_V",
        title: "Grand Theft Auto V",
        description: "Un juego de acción y aventura de mundo abierto, donde puedes explorar una ciudad ficticia, cometer crímenes y vivir aventuras con diferentes personajes.",
        trailer: "https://www.youtube.com/embed/nzV5_Uhu08A",
        images: [
            "/GameStore-Frontend/images/games/gta_v_1.jpg",
            "/GameStore-Frontend/images/games/gta_v_2.jpg",
            "/GameStore-Frontend/images/games/gta_v_3.jpg",
            "/GameStore-Frontend/images/games/gta_v_4.jpg"
        ],
        reviews: [
            {
                author: "John Doe",
                message: "Una experiencia increíble, la mejor entrega de la saga GTA.",
                stars: 5
            },
            {
                author: "Jane Smith",
                message: "Excelente juego, pero los controles pueden ser mejorados.",
                stars: 4
            }
        ],
        release_date: "17/09/2013",
        category: "Acción, Aventura, Multijugador, Más vendido, Mejor valorado",
        base_price: 199,
        discount: 20,
        platform: "PlayStation, Xbox, Windows"
    },
    {
        id: "NFS_Heat",
        title: "Need for Speed Heat",
        description: "Un juego de carreras lleno de acción y adrenalina, con la posibilidad de personalizar vehículos y competir en circuitos nocturnos.",
        trailer: "https://www.youtube.com/embed/9ewiJJe_nYI",
        images: [
            "/GameStore-Frontend/images/games/nfs_heat_1.jpg",
            "/GameStore-Frontend/images/games/nfs_heat_2.jpg",
            "/GameStore-Frontend/images/games/nfs_heat_3.jpg",
            "/GameStore-Frontend/images/games/nfs_heat_4.jpg"
        ],
        reviews: [
            {
                author: "Carlos Ruiz",
                message: "Muy entretenido, la personalización de los autos es impresionante.",
                stars: 4
            },
            {
                author: "Laura González",
                message: "Un juego muy divertido, aunque a veces se vuelve repetitivo.",
                stars: 3
            }
        ],
        release_date: "08/11/2019",
        category: "Carreras, Multijugador",
        base_price: 199,
        discount: 15,
        platform: "PlayStation, Xbox, Windows"
    },
    {
        id: "Elden_Ring",
        title: "Elden Ring",
        description: "Un juego de rol de acción en un mundo abierto donde los jugadores exploran un vasto mundo, luchan contra jefes desafiantes y mejoran sus habilidades.",
        trailer: "https://www.youtube.com/embed/AKXiKBnzpBQ",
        images: [
            "/GameStore-Frontend/images/games/elden_ring_1.jpg",
            "/GameStore-Frontend/images/games/elden_ring_2.jpg",
            "/GameStore-Frontend/images/games/elden_ring_3.jpg",
            "/GameStore-Frontend/images/games/elden_ring_4.jpg"
        ],
        reviews: [
            {
                author: "Alex Martínez",
                message: "Una obra maestra, uno de los mejores juegos de rol de todos los tiempos.",
                stars: 5
            },
            {
                author: "Marta López",
                message: "Increíblemente desafiante y hermoso. La dificultad es extrema.",
                stars: 5
            }
        ],
        release_date: "25/02/2022",
        category: "RPG, Acción, Mejor valorado",
        base_price: 172,
        discount: 10,
        platform: "PlayStation, Xbox, Windows"
    },
    {
        id: "Cyberpunk_2077",
        title: "Cyberpunk 2077",
        description: "Un juego de rol y acción ambientado en un futuro distópico, donde tomas el rol de un mercenario en la ciudad de Night City.",
        trailer: "https://www.youtube.com/embed/nLhWWoAaZ0Q",
        images: [
            "/GameStore-Frontend/images/games/cyberpunk_2077_1.jpg",
            "/GameStore-Frontend/images/games/cyberpunk_2077_2.jpg",
            "/GameStore-Frontend/images/games/cyberpunk_2077_3.jpg",
            "/GameStore-Frontend/images/games/cyberpunk_2077_4.jpg"
        ],
        reviews: [
            {
                author: "Pedro Hernández",
                message: "A pesar de los problemas iniciales, ahora es un juego impresionante.",
                stars: 4
            },
            {
                author: "Sofia Ramírez",
                message: "Excelente historia, pero la jugabilidad aún necesita mejoras.",
                stars: 4
            }
        ],
        release_date: "10/12/2020",
        category: "RPG, Acción, Aventura, Más vendido",
        base_price: 153,
        discount: 25,
        platform: "PlayStation, Xbox, Windows"
    },
    {
        id: "Red_Dead_Redemption 2",
        title: "Red Dead Redemption 2",
        description: "Un juego de acción y aventura ambientado en el Viejo Oeste, donde los jugadores toman el rol de un forajido que explora un mundo abierto y toma decisiones clave.",
        trailer: "https://www.youtube.com/embed/eaW0tYpxyp0",
        images: [
            "/GameStore-Frontend/images/games/rdr2_1.jpg",
            "/GameStore-Frontend/images/games/rdr2_2.jpg",
            "/GameStore-Frontend/images/games/rdr2_3.jpg",
            "/GameStore-Frontend/images/games/rdr2_4.jpg"
        ],
        reviews: [
            {
                author: "Carlos Pérez",
                message: "Una experiencia única, una de las mejores historias de la historia de los videojuegos.",
                stars: 5
            },
            {
                author: "Ricardo Jiménez",
                message: "El mundo abierto es impresionante, pero la historia se siente un poco larga.",
                stars: 4
            }
        ],
        release_date: "26/10/2018",
        category: "Aventura, Acción, Mejor valorado",
        base_price: 153,
        discount: 30,
        platform: "PlayStation, Xbox, Windows"
    },
    {
        id: "Horizon_Forbidden_West",
        title: "Horizon Forbidden West",
        description: "Un juego de aventura y acción en un mundo post-apocalíptico, donde controlas a Aloy, una cazadora que combate máquinas en un entorno vasto y diverso.",
        trailer: "https://www.youtube.com/embed/Lq594XmpPBg",
        images: [
            "/GameStore-Frontend/images/games/horizon_forbidden_west_1.jpg",
            "/GameStore-Frontend/images/games/horizon_forbidden_west_2.jpg",
            "/GameStore-Frontend/images/games/horizon_forbidden_west_3.jpg",
            "/GameStore-Frontend/images/games/horizon_forbidden_west_4.jpg"
        ],
        reviews: [
            {
                author: "Julia González",
                message: "Impresionante mundo, la jugabilidad es fantástica y la historia te engancha.",
                stars: 5
            },
            {
                author: "Luis Rodríguez",
                message: "Muy buen juego, pero se siente algo repetitivo en ciertos momentos.",
                stars: 4
            }
        ],
        release_date: "18/02/2022",
        category: "Aventura, Acción, Más vendido",
        base_price: 197,
        discount: 15,
        platform: "PlayStation"
    },
    {
        id: "Ghost_of_Tsushima",
        title: "Ghost of Tsushima",
        description: "Un juego de acción y aventura ambientado en el Japón feudal, donde tomas el rol de un samurái que lucha por defender su hogar.",
        trailer: "https://www.youtube.com/embed/iqysmS4lxwQ",
        images: [
            "/GameStore-Frontend/images/games/ghost_of_tsushima_1.jpg",
            "/GameStore-Frontend/images/games/ghost_of_tsushima_2.jpg",
            "/GameStore-Frontend/images/games/ghost_of_tsushima_3.jpg",
            "/GameStore-Frontend/images/games/ghost_of_tsushima_4.jpg"
        ],
        reviews: [
            {
                author: "Juan Carlos",
                message: "Un juego visualmente impresionante, y la historia es muy emocional.",
                stars: 5
            },
            {
                author: "Rosa Díaz",
                message: "Gran historia y ambientación, pero algunas mecánicas de combate son repetitivas.",
                stars: 4
            }
        ],
        release_date: "17/07/2020",
        category: "Aventura, Acción, Mejor valorado",
        base_price: 199,
        discount: 20,
        platform: "PlayStation"
    },
    {
        id: "Assassins_Creed_Valhalla",
        title: "Assassin’s Creed Valhalla",
        description: "Un juego de acción y aventura ambientado en la época vikinga, donde controlas a un guerrero vikingo mientras exploras un mundo abierto y realizas misiones.",
        trailer: "https://www.youtube.com/embed/ssrNcwxALS4",
        images: [
            "/GameStore-Frontend/images/games/assassins_creed_valhalla_1.jpg",
            "/GameStore-Frontend/images/games/assassins_creed_valhalla_2.jpg",
            "/GameStore-Frontend/images/games/assassins_creed_valhalla_3.jpg",
            "/GameStore-Frontend/images/games/assassins_creed_valhalla_4.jpg"
        ],
        reviews: [
            {
                author: "Oscar Méndez",
                message: "Una de las mejores entregas de la saga, con un mundo vasto y lleno de detalles.",
                stars: 5
            },
            {
                author: "Beatriz García",
                message: "Muy divertido, aunque algunas mecánicas se sienten un poco forzadas.",
                stars: 4
            }
        ],
        release_date: "10/11/2020",
        category: "Acción, Aventura, Multijugador",
        base_price: 197,
        discount: 10,
        platform: "PlayStation, Xbox, Windows"
    },
    {
        id: "Spider-Man",
        title: "Marvel’s Spider-Man Remastered",
        description: "Un juego de acción y aventura basado en el famoso superhéroe Spider-Man, donde puedes balancearte por la ciudad de Nueva York y luchar contra diversos villanos.",
        trailer: "https://www.youtube.com/embed/1E051WtpyWg",
        images: [
            "/GameStore-Frontend/images/games/spiderman_1.jpg",
            "/GameStore-Frontend/images/games/spiderman_2.jpg",
            "/GameStore-Frontend/images/games/spiderman_3.jpg",
            "/GameStore-Frontend/images/games/spiderman_4.jpg"
        ],
        reviews: [
            {
                author: "Antonio Pérez",
                message: "¡Es como ser Spider-Man! La jugabilidad es increíble y la historia muy entretenida.",
                stars: 5
            },
            {
                author: "Carmen Ruiz",
                message: "Un juego divertido, pero algunos villanos no están bien desarrollados.",
                stars: 4
            }
        ],
        release_date: "12/08/2020",
        category: "Acción, Aventura, Mejor valorado",
        base_price: 180,
        discount: 15,
        platform: "PlayStation"
    },
    {
        id: "Resident_Evil_4_Remake",
        title: "Resident Evil 4 Remake",
        description: "Un juego de survival horror donde controlas a Leon S. Kennedy en una misión para rescatar a la hija del presidente mientras lucha contra criaturas infectadas.",
        trailer: "https://www.youtube.com/embed/j5Ic2z3_xp0",
        images: [
            "/GameStore-Frontend/images/games/resident_evil_4_remake_1.jpg",
            "/GameStore-Frontend/images/games/resident_evil_4_remake_2.jpg",
            "/GameStore-Frontend/images/games/resident_evil_4_remake_3.jpg",
            "/GameStore-Frontend/images/games/resident_evil_4_remake_4.jpg"
        ],
        reviews: [
            {
                author: "Francisco Álvarez",
                message: "La mejor remasterización de la saga, un clásico modernizado.",
                stars: 5
            },
            {
                author: "Patricia Gómez",
                message: "Es un gran remake, pero algunas partes pierden el toque clásico del original.",
                stars: 4
            }
        ],
        release_date: "24/03/2023",
        category: "Survival Horror, Acción, Mejor valorado",
        base_price: 153,
        discount: 0,
        platform: "PlayStation, Xbox, Windows"
    }
]
