# ![mercado libre](https://http2.mlstatic.com/frontend-assets/ui-navigation/5.6.1/mercadolibre/logo__large_plus.png) meli API

Frontend desarrollado para el [Test Práctico - Frontend](https://www.dropbox.com/sh/nbq7zvtqd2gb9ab/AABIy7kFj4BvLeNfbLib_Jcya?dl=0&preview=Front-End+Test+Pr%C3%A1ctico.pdf)

## Introducción

Si bien en el día a día en forntend trabajo con Angular, AngularJS y Typescript, decidí hacer esta app en React para tomar un desafío personal.
Asimismo he intentado usar las mejores prácticas de desarrollo y las tecnologías más actualizadas y recomendadas, incluyendo Hooks, PropTypes y tests de snapshots.
No me pareció necesario incluir TypeScript, ya que sus ventajas se pueden aprovechar en proyectos de gran volúmen.

## Estructura principal de archivos

La estructura de archivos intenta ser simple sin crecer mucho en profundidad.

* Las carpetas y archivos nomencladas en **PascalCase** se refieren a componentes de **React**.
Cuando hay una carpeta que se refiere a un componente, el mismo se encontrará en el archivo `index.jsx`, y todos los sub-componentes directos de éste tendrán su propio archivo.
*Por ejemplo: la carpeta `Header` contiene al componente **Header** en el archivo `index.jsx`, mientras que también tiene al componente **HeaderSearchBar** en el archivo `HeaderSearchBar.jsx`.*

* Las carpetas escritas en kebab-case son agrupadoras de funcionalidad, como es el caso de la carpeta `shared-components` que contiene a componentes compartidos por diferentes componentes mas principales.

* El resto de los archivos que no están relacionados con React están escritos en kebab-case

```
+-- public // Contiene el archivo index.html y los assets
+-- src
|   +-- core
|       +-- App.jsx // Contiene al componente principal de la aplicación
|       +-- app.scss // Hoja de estilos principal de la aplicación
|       ...
|   +-- Header
|       +-- index.jsx // Contiene al componente Header
|       +-- index.scss // Hoja de estilos específica para todo el header
|       +-- index.test.jsx // Test de Header
|       ...  
|   +-- hooks
|       ... 
|   +-- ItemPage
|       ...
|   +-- ItemsListPage
|       ...
|   +-- shared-components
|       ...
```

## Estilos

Los estilos principales se encuentran en `app.scss`, aunque cada componente principal de la página tiene su propia hoja (Header, ItemPage e ItemsListPage). Los `shared-components` también tienen sus propias hojas de estilos.

La mayoría del layout fue hecho con **flex**, el listado de items también. El detalle de un item fue hecho con **grid**.
Se respetaron los mockups y aunque no fue foco, se agregaron algunos estilos y @media para que las pantallas sean levemente responsivas. 

##### Instalación
```
$ npm install
```

## Uso
La url del backend, única variable de entorno se puede configurar en el archivo webpack.conf.js, dentro del plugin de webpack *DefinePlugin*.

##### Producción
Para compilar la app en modo productivo:
```
$ npm run build
```
En la carpeta `./dist` se generarán los archivos `index.html`, `bundle.js` y los assets.

La solución se puede montar en cualquier servidor que sirva archivos estáticos.
Me hubiera gustado implementar server side rendering, pero me iba a sobrepasar del tiempo que había estimado y preferí usar el tiempo en otros detalles.

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


Licencia
----

MIT
