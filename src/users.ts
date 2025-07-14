export interface users {
  id: number
  email: string
  password: string
  name: string
  country: string
  role: string
  token: number
}

export let listUsers : users[] = [
  {
    id: 1,
    email: 'omar@gmail.com',
    password: '1234',
    name: 'Omar Portuguez',
    country: "Perú",
    role: "admin",
    token: 123456
  },
  {
    id: 2,
    email: 'joan@gmail.com',
    password: '1234',
    name: 'Joan Lazo',
    country: "Perú",
    role: "admin",
    token: 123457
  },
  {
    id: 3,
    email: 'jose@gmail.com',
    password: '1234',
    name: 'Jose Matos',
    country: "Perú",
    role: "admin",
    token: 123458
  },
  {
    id: 4,
    email: 'juan@gmail.com',
    password: '1234',
    name: 'Juan Padilla',
    country: "Perú",
    role: "admin",
    token: 123459
  },
  {
    id: 5,
    email: 'giomar@gmail.com',
    password: '1234',
    name: 'Giomar Castillo',
    country: "Perú",
    role: "admin",
    token: 123460
  },
]