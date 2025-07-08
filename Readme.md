# Endpoints GameStore-Backend

## Sección de noticias

### Endpoint: Listar noticias

- Path: "/noticias"
- Metodo: GET
- Input:

- Output

```json
[
    {
        "id" : "1",
        "title" : "titulo",
        "categoria" : "accion",
        "autor" : "nintendo",
        "redaccion" : "Los videojuegos ...",
        "image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
        "dias" : "100"
    }, {}, {}, ...
]
```

### Endpoint: Registrar una noticia

- Path: "/noticias"
- Metodo: POST
- Input:

```json
{
    "id" : "1",
    "title" : "titulo",
    "categoria" : "accion",
    "autor" : "nintendo",
    "redaccion" : "Los videojuegos ...",
    "image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    "dias" : "100"
}
```

- Output

```json
{
    "msg" : "Noticia agregada correctamente"
}
```

### Endpoint: Modificar una noticia

- Path(Path parameter: noticias/id): "/noticias/2"
- Metodo: PUT
- Input:

```json
{
    "id" : "2",
    "title" : "titulo2",
    "categoria" : "accion2",
    "autor" : "nintendo2",
    "redaccion" : "Los juegos ...",
    "image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    "dias" : "100"
}
```

- Output

```json
{
    "msg" : "Noticia editada correctamente"
}
```

### Endpoint: Eliminar una noticia

- Path(Path parameter: noticias/id): "/noticias/2"
- Metodo: DELETE
- Input:

Path parameter: noticias/2

- Output

```json
{
    "msg" : "Noticia eliminada correctamente"
}
```

## Sección de juegos

### Endpoint: Listar juegos

- Path: "/juegos"
- Metodo: GET
- Input:

- Output

```json
{
    "Grand Theft Auto V": {
        "title": "Grand Theft Auto V",
        "description": "Un juego de acción y aventura de mundo abierto, donde puedes explorar una ciudad ficticia, cometer crímenes y vivir aventuras con diferentes personajes.",
        "trailer": "https://www.youtube.com/embed/3DBrG2YjqQA",
        "images": [
        "/images/games/gta_v_1.jpg",
        "/images/games/gta_v_2.jpg",
        "/images/games/gta_v_3.jpg",
        "/images/games/gta_v_4.jpg"
        ],
        "reviews": [
        {
            "author": "John Doe",
            "message": "Una experiencia increíble, la mejor entrega de la saga GTA.",
            "stars": 5
        },
        {
            "author": "Jane Smith",
            "message": "Excelente juego, pero los controles pueden ser mejorados.",
            "stars": 4
        }
        ],
        "release_date": "17/09/2013",
        "category": "Acción, Aventura, Multijugador, Más vendido, Mejor valorado",
        "base_price": 199,
        "discount": 20,
        "platform": "PlayStation, Xbox, Windows"
    }, "": {}, "": {}, ...
}
```

### Endpoint: Registrar un juego

- Path: "/juegos"
- Metodo: POST
- Input:

```json
{
    "key" : "j1",
    "title" : "juego1",
    "description" : "Descripción de juego 1",
    "trailer" : "https://www.youtube.com/embed/3DBrG2YjqQA",
    "images": [
        "/images/games/gta_v_1.jpg",
        "/images/games/gta_v_2.jpg",
        "/images/games/gta_v_3.jpg",
        "/images/games/gta_v_4.jpg"
    ],
    "release_date": "17/09/2013",
    "category": "Acción",
    "base_price": 199,
    "discount": 20,
    "platform": "Windows"
}
```

- Output

```json
{
    "msg" : "Juego agregado correctamente"
}
```

### Endpoint: Modificar un juego

- Path(Path parameter: juegos/id): "/juegos/j1"
- Metodo: PUT
- Input:

```json
{
    "key" : "j1",
    "title" : "juego1Modificado",
    "description" : "Descripción de juego 1 modificado",
    "trailer" : "https://www.youtube.com/embed/3DBrG2YjqQA",
    "images": [
        "/images/games/gta_v_1.jpg",
        "/images/games/gta_v_2.jpg",
        "/images/games/gta_v_3.jpg",
        "/images/games/gta_v_4.jpg"
    ],
    "release_date": "17/09/2013",
    "category": "Acción",
    "base_price": 199,
    "discount": 20,
    "platform": "Windows"
}
```

- Output

```json
{
    "msg" : "Juego editado correctamente"
}
```

### Endpoint: Eliminar un juego

- Path(Path parameter: juegos/id): "/juegos/j1"
- Metodo: DELETE
- Input:

Path parameter: juegos/j1

- Output

```json
{
    "msg" : "Juego eliminado correctamente"
}
```