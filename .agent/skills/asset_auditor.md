---
name: asset_auditor
description: Protocolo para gestión y verificación de assets (imágenes, iconos, videos).
---
# Asset Auditor Protocol

## Objetivo
Garantizar que todos los activos visuales (imágenes, videos, iconos) carguen correctamente, sean de alta calidad y correspondan temáticamente con la marca.

## Reglas de Oro
1. **Verificación de URLs**: Antes de finalizar cualquier tarea, verifica que las URLs de imágenes (Unsplash, Supabase, etc.) respondan con status 200. Las URLs rotas (404) rompen la inmersión de "Lujo".
2. **Alta Resolución**: Para Apps modernas (Next.js), usa siempre imágenes de al menos 1080p (w=1920 o w=2070 en Unsplash).
3. **Temática Consistente**:
   - **Evo Wrap**: Automotive Dark, High Contrast, Reflections, Macro details. Evitar fotos genéricas de "lavaderos brillantes" o gente sonriendo artificialmente.
4. **Optimización**: Usa siempre `next/image` con `priority` para imágenes LCP (Hero) y `loading="lazy"` para el resto.

## Check de Calidad
- [ ] ¿La URL abre en el navegador?
- [ ] ¿La imagen tiene marca de agua? (PROHIBIDO)
- [ ] ¿El peso es aceptable? (Usar WebP o optimización automática de Next.js)
- [ ] ¿El `alt` text es descriptivo?
