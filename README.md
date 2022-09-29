# CRUD usuarios + documentación con Swagger.io

En este repositorio se encuentra una pequeña API que permite el CRUD de usuarios, donde la parte importante de este proyecto fue realizar una práctica
para poder realizar la documentación de la API con [**Swagger.io**](https://swagger.io/)

## Clonar repositorio

1. Para clonar el repositorio y poder ejecutarlo correctamente es necesario tener instalado los siguientes programas
- [git](https://git-scm.com/).
- [NodeJS](https://nodejs.org/en/).
- [MongoDB](https://www.mongodb.com/es).

2. Ejecute el comando:
```sh
git clone https://github.com/emmanuelmenpe/swagger-documentation-api.git
```

## Instalar dependencias

Una vez clonado el repositorio debe de acceder a la carpeta del proyecto con el comando: `cd swagger-documentation-api` y ejecutar el comando:
```sh
npm install
```

## Configuración del proyecto

1. Crear una base de datos local usando [MongoDB](https://www.mongodb.com/es) y copiar el String para acceder a la base de datos
2. Crear en la carpeta principal un archivo llamado .env y agregar las siguientes variables:
```js
MONGOOSE_URI=StingDeLaBaseDeDatosAnteriormenteCreada
NOMBREDB=NombreDeBD_opcional
PORT=NumeroDePuertoEnQueEstaraEjecutandoseLaAPI
SECRETA=LetrasNumerosAleatoriosParaCifrarDecifrarContraseñas
```

## Ejecutar la API

1. Ejecutar el comando:
```sh
npm run dev
```
- Podrá usar un cliente http como [Postman](https://www.postman.com/) para realizar las consultas a la API 
- o ingresar a http://localhost:8080/api-docs/ desde un navegador web para ver la **documentación de la API** creada con **Swagger.io**
