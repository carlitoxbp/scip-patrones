# ADR-01 · Catálogo estático con mejora progresiva

- **Estado:** Aceptada
- **Fecha:** 2026-10-08
- **Decisores:** Carlos Barberán, Josué Robles, Mateo Riofrío, Damián González
- **Concerns:** rendimiento, accesibilidad, mantenibilidad, costo operativo

## Contexto

El SCIP debe publicar 22 patrones GoF con búsqueda, filtros y un mapa jerárquico.
El público objetivo son estudiantes y docentes que acceden desde equipos modestos y
redes móviles. El contenido cambia con poca frecuencia y no requiere autenticación.

## Decisión

Construir el cliente como sitio estático (HTML, CSS y módulos ES) con mejora
progresiva: el contenido es legible sin JavaScript y la interactividad se añade
como capa opcional. El despliegue se hace en GitHub Pages detrás de una CDN.

## Alternativas consideradas

| Alternativa | Motivo de descarte |
| --- | --- |
| SPA con React y render en cliente | Mayor peso inicial y dependencia de JavaScript para leer el contenido |
| SSR con Next.js | Infraestructura y costo innecesarios para contenido cuasi estático |
| Generador de sitios con tema cerrado | Poco control sobre el mapa jerárquico y la accesibilidad |

## Consecuencias

- Positivas: primera pintura rápida, bajo costo, contenido indexable y accesible.
- Negativas: la búsqueda incremental se resuelve en el cliente y el corpus debe
  caber en memoria (22 patrones, menos de 200 KB).
- Verificación: Lighthouse móvil ≥ 95 en rendimiento y 100 en accesibilidad.
