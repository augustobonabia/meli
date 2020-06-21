##### Calidad del SW
Se agregó el archivo *check_code_health.ps1*, el cual es un script de _PowerShell_ que corre el hook de _pre-push_ de git. 
Dicho script asegura que todo el código pusheado al repositorio remoto siempre siga las reglas de ESLint, compile y pase los tests existentes.
Los resultados del mismo son volcados en el archivo *code_health_results.txt* para su análisis, de ser requerido. Este archivo no se encuentra versionado.