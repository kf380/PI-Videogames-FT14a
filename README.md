

# Videogames

![videojuego-app](https://user-images.githubusercontent.com/74383139/132355824-9a225823-dced-408e-9199-3e5be8f2fd71.png)


## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.




## BoilerPlate

El boilerplate cuenta con dos carpetas: `api` y `client`. En estas carpetas estan el código del back-end y el front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

Adicionalmente será necesario que creen desde psql una base de datos llamada `videogames`

El contenido de `client` fue creado usando: Create React App.

## Detalles del proyecto

La idea general fue crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

  - Buscar videjuegos
  - Filtrarlos / Ordenarlos
  - Agregar nuevos videojuegos


__IMPORTANTE__: No se utlizo librerías externas para aplicar estilos a la aplicación. 


Usamos las siguientes tecnologías en Javascript:

React | Redux | Node.js | Express.js | PostreSQL  | Sequelize | HTML | CSS  
