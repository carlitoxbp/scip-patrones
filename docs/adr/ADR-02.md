# ADR-02 · API de solo lectura con caché en CDN

- **Estado:** Aceptada
- **Fecha:** 2026-10-10
- **Decisores:** Carlos Barberán, Josué Robles, Mateo Riofrío, Damián González
- **Concerns:** rendimiento, seguridad, disponibilidad, privacidad

## Contexto

El cliente necesita metadatos agregados (conteos por categoría, métricas de uso)
que no conviene incrustar en el HTML. No existen operaciones de escritura ni datos
personales que proteger.

## Decisión

Exponer una API REST de solo lectura con Fastify sobre Node.js 24, con respuestas
`GET` idempotentes, caché `stale-while-revalidate` en CDN y límite de tasa por IP.
La base de datos PostgreSQL almacena solo metadatos y agregados anónimos.

## Alternativas consideradas

| Alternativa | Motivo de descarte |
| --- | --- |
| GraphQL | Sobrecarga de esquema para un conjunto fijo de consultas |
| Funciones serverless por endpoint | Arranque en frío y dispersión de la lógica |
| Sin API (todo en el cliente) | Impide agregados actualizados y métricas de uso |

## Consecuencias

- Positivas: latencia baja por caché, superficie de ataque reducida y sin PII.
- Negativas: requiere invalidación de caché al publicar contenido nuevo.
- Verificación: pruebas de contrato con Vitest y E2E con Playwright; 0 vulnerabilidades
  críticas en el análisis de SonarQube.
