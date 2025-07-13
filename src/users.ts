export interface User {
  id: number;
  nombre: string;
  correo: string;
  pais: string;
  rol: 'admin' | 'user';
}

export const Users: User[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    pais: "Perú",
    rol: "user"
  },
  {
    id: 2,
    nombre: "Ana Gómez",
    correo: "ana.gomez@example.com",
    pais: "Argentina",
    rol: "admin"
  },
  {
    id: 3,
    nombre: "Carlos Ríos",
    correo: "carlos.rios@example.com",
    pais: "México",
    rol: "user"
  },
  {
    id: 4,
    nombre: "Luisa Fernández",
    correo: "luisa.fernandez@example.com",
    pais: "Chile",
    rol: "user"
  },
  {
    id: 5,
    nombre: "Pedro Morales",
    correo: "pedro.morales@example.com",
    pais: "Colombia",
    rol: "user"
  }
];
