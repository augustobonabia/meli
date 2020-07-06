# ![mercado libre](https://http2.mlstatic.com/frontend-assets/ui-navigation/5.6.1/mercadolibre/logo__large_plus.png) meli API

Servidor desarrollado para el [Test Práctico - Frontend](https://www.dropbox.com/sh/nbq7zvtqd2gb9ab/AABIy7kFj4BvLeNfbLib_Jcya?dl=0&preview=Front-End+Test+Pr%C3%A1ctico.pdf)

##### Instalación
```
$ npm install
```

## Uso
En el archivo `environment.js` se pueden configurar todas las variables de entorno, como por ejemplo en nombre y apellido del autor, cantidad de resultados a dovlver en un listado, nivel de logueo, etc...

##### Producción
Para levantar la app en modo productivo:
```
$ npm run serve
```
##### Desarrollo
Para levantar la app en modo desarrollo:
```
$ npm start
```
Para correr los test:
```
$ npm test
```
Para conocer los errores detectados por ESLint
```
$ npm run lint
```
Para intentar corregir automáticamente los errores detectados por ESLint
```
$ npm run lint:fix
```

## Estructura principal de archivos

```
+-- src
|   +-- core
|       +-- app.js // Archivo principal de la aplicación, donde se configuran todos los middlewares y routes
|       +-- items.router.js // El único router que existe, con los endpoints '/items' y 'items/:id'
|       +-- utils // Contiene todos archivos utils con funciones para mantener el código flexible, desacoplado y testeable
        +-- middlewares.js  // Contiene todos los middlewares custom (handler de error, custom 404, setAuthor)
/----start.js // punto de entrada para levantar la app en el puerto configurado
```

## Decisiones sobre la API

Como no estaba bien definido cómo debía ser el precio dentro de un item con la forma:
```
price: {
   amount,
   decimals,
   currency,
}
```
Definí que amount devuelva la parte entera del precio, decimals la parte decimal (los centavos), y currency el símbolo de la moneda en la que está definido el precio. Para realizar esto último se consume dinámicamente el endpoint `sites/MLA?attributes=currencies` cada vez que se quiere obtener un item o un listado de items.

Luego, para construir el array de categorías al listar `/api/items?q=:query` la información se saca del filtro de categorías aplicado, si es que existe. En caso de que no exista se construye en base a los filtros dispinibles, buscando cuál tiene mayor cantidad de resultados.

También decidí enviar ya sanitizados los textos HTML desde el servidor.

Licencia
----

MIT
