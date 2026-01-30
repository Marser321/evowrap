---
name: Snapshot Restorer
description: Skill to restore files to a previous stable state.
---

# Snapshot Restorer

**Objetivo**: Analizar tu propio historial de generación de código y 'Artefactos' anteriores para restaurar la estética visual.

## Pasos

1.  **Identificar**: Busca la versión de los archivos `page.tsx`, `layout.tsx` y `globals.css` que existían antes de la última solicitud de cambio masivo. Busca commits relacionados con "Dark Mode", "Neon", "Gold" antes de la ruptura.
2.  **Aislar**: No intentes mezclar el código nuevo con el viejo.
3.  **Revertir**: Reescribe los archivos actuales con el código de la versión estable anterior. Si hay duda, prioriza la estética visual sobre la funcionalidad nueva.

## Ejecución
Usa `git checkout <hash> -- <archivo>` para traer la versión exacta.
