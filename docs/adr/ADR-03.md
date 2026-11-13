# ADR-03 · Contenido como código validado con JSON Schema

- **Estado:** Aceptada
- **Fecha:** 2026-10-12
- **Decisores:** Carlos Barberán, Josué Robles, Mateo Riofrío, Damián González
- **Concerns:** mantenibilidad, trazabilidad, calidad del contenido, trabajo colaborativo

## Contexto

Los 22 patrones se redactan de forma colaborativa y deben revisarse como cualquier
otro cambio. Un CMS tradicional añade una base de datos y un panel que el equipo
no necesita para una entrega académica.

## Decisión

Versionar el contenido como archivos JSON en Git, validados contra un esquema
JSON Schema (draft-07) con Ajv en el pipeline. Cada patrón incluye intención,
analogía, caso de uso, categoría y referencias. Los cambios pasan por revisión
de pares antes de integrarse.

## Alternativas consideradas

| Alternativa | Motivo de descarte |
| --- | --- |
| CMS headless | Costo, credenciales y respaldo fuera del repositorio |
| Markdown con front matter | Validación estructural más débil para campos obligatorios |
| Base de datos relacional | Impide revisar el contenido como diff en el pull request |

## Consecuencias

- Positivas: historial completo, revisión por pares y validación automática.
- Negativas: el equipo debe respetar el esquema; un error de formato rompe el build.
- Verificación: el pipeline falla si `content/` no valida contra el esquema.
