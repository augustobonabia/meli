# ![mercado libre](https://http2.mlstatic.com/frontend-assets/ui-navigation/5.6.1/mercadolibre/logo__large_plus.png) meli API

Repositorio desarrollado para el [Test Práctico - Frontend](https://www.dropbox.com/sh/nbq7zvtqd2gb9ab/AABIy7kFj4BvLeNfbLib_Jcya?dl=0&preview=Front-End+Test+Pr%C3%A1ctico.pdf)



# Introducción

Tanto el backend como el frontend son un "build from scratch", esto quiere decir que partí desde cero configurando todas las dependencias de los proyectos y sus configuraciones. Por ejemplo, para el frontend tuve que configurar los diferentes pasos del empaquetado, incluyendo 'uglify', configuración de dev server con proxy para poder interactuar con el backend, habilitación de CORS para el entorno productivo, etc...

##### Para ver la documentación detallada de cada app más accedé a:

* [front-end](https://github.com/augustobonabia/meli/tree/master/front-end#readme)

* [api](https://github.com/augustobonabia/meli/tree/master/api#readme)

##### Calidad del SW
Agregué el script de _PowerShell_ *check_code_health.ps1* que se corre con el hook de _pre-push_ de git. 
Dicho script asegura que todo el código pusheado al repositorio remoto siempre siga las reglas de ESLint, compile y pase los tests existentes.
Los resultados del mismo son volcados en el archivo *code_health_results.txt* para su análisis, de ser requerido. Este archivo no se encuentra versionado.