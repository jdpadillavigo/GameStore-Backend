export interface news {
  id : number
  title : string
  category : string
  author : string
  redaction: string
  image : string
  days : number
}

export let listNews : news[] = [
  {
    id: 1,
    title: 'Nintendo Switch 2: la mejor consola',
    category: 'Actualidad',
    author: 'Nintendo',
    redaction: 'Se espera que los propietarios de la nueva consola de la compañía japonesa puedan ver videos en YouTube',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Switch-2-3.jpg?resize=320,144&quality=75&strip=all',
    days: 10
  },
  {
    id: 2,
    title: 'Xbox canceló el estreno de Gears of War: Reloaded',
    category: 'Shooter',
    author: 'Equipo GameStore',
    redaction: 'La compañía ofreció disculpas a los usuarios de la consola de Sony que serán afectados',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Cancelan-Gears-para-PS5-en-Japont.jpg?resize=320,144&quality=75&strip=all',
    days: 26
  },
  {
    id: 3,
    title: 'Tu aventura en Indiana Jones and the Great Circle continuará con The Order of Giants',
    category: 'Aventura',
    author: 'Sony',
    redaction: 'El contenido adicional debutará de forma simultánea en todas las plataformas',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Indiana-528e009bdea8ecc04fc3-1536x864-1-401b99a11368a1b0820c.jpg?resize=320,144&quality=75&strip=all',
    days: 18
  },
  {
    id: 4,
    title: 'Final Fantasy por fin deja exclusividad con PlayStation en consolas',
    category: 'Estrategia',
    author: 'PlanetGame',
    redaction: 'Microsoft reafirmó todas las mejoras que tendrá esta versión, tanto en single player como multijugador',
    image: 'https://i0.wp.com/levelup.buscafs.com/2025/06/Final-Fantasy-VII-Remake-Intergade-Final-Fantasy-XVI-port-Xbox-Square-Enix-Xbox-Games-Showcase.jpg?resize=320,144&quality=75&strip=all',
    days: 30
  }
]