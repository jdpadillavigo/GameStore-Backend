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

### Endpoint: Modifcar una noticia

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