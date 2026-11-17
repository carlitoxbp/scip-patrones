# Guía de revisión de la entrega

Proyecto integrador de **Arquitectura de Software** — ULEAM.
**Integrantes:** Carlos Barberán · Josué Robles · Mateo Riofrío · Damián González
**Docente:** Patricio Arturo Quiroz Valencia · **Entrega:** 17 de noviembre de 2026

Esta guía indica, en orden, qué revisar y dónde está cada evidencia.

## 1. Documentos por fase

| Fase | Tema | Archivo | Págs. |
| --- | --- | --- | ---: |
| 1 | Mapa mental de los 22 patrones GoF | [`docs/fases/Mapa_Mental_Patrones_GoF.pdf`](fases/Mapa_Mental_Patrones_GoF.pdf) | 2 |
| 2 | Diseño metodológico y arquitectura del SCIP | [`docs/fases/Fase2_Diseno_Metodologico_Patrones_GoF.pdf`](fases/Fase2_Diseno_Metodologico_Patrones_GoF.pdf) | 6 |
| 3 | Implementación, CI/CD, métricas y datos | [`docs/fases/Fase3_Implementacion_y_Datos_Patrones_GoF.pdf`](fases/Fase3_Implementacion_y_Datos_Patrones_GoF.pdf) | 6 |
| 4 | Análisis de resultados, hallazgos y discusión | [`docs/fases/Fase4_Analisis_y_Discusion_Patrones_GoF.pdf`](fases/Fase4_Analisis_y_Discusion_Patrones_GoF.pdf) | 8 |
| 5 | Manuscrito científico (IMRyD, APA 7) | [`docs/fases/Fase5_Manuscrito_Cientifico_Patrones_GoF.pdf`](fases/Fase5_Manuscrito_Cientifico_Patrones_GoF.pdf) | 8 |

La versión navegable del mapa mental de la fase 1 está en
[`docs/mapa-interactivo.html`](mapa-interactivo.html); se abre con doble clic en
cualquier navegador y no requiere conexión.

## 2. Datos y reproducibilidad

Los datos crudos están en [`datos/`](../datos) y el diccionario completo en el
[README](../README.md#diccionario-de-datos). Todas las cifras de las fases 3 y 5
se recalculan con un único comando:

```bash
git clone https://github.com/carlitoxbp/scip-patrones.git
cd scip-patrones
npm ci && npm run analyze
```

El script [`scripts/analisis.mjs`](../scripts/analisis.mjs) no tiene dependencias
externas y reescribe `datos/resumen.json` con los agregados, las desviaciones
estándar y el alfa de Cronbach.

## 3. Decisiones de arquitectura

Las cinco decisiones con su contexto, alternativas y consecuencias están en
[`docs/adr/`](adr): formato del catálogo, estrategia de renderizado, pipeline de
calidad, esquema de datos y estrategia de accesibilidad.

## 4. Resultados en una tabla

| Indicador | Antes (v0.1.0) | Después (v1.0.0) |
| --- | ---: | ---: |
| Complejidad ciclomática (CCN) | 12,0 | 6,5 |
| Índice de mantenibilidad (MI) | 60,8 | 74,2 |
| Acoplamiento entre objetos (CBO) | 10,0 | 6,0 |
| Duplicación de código (CD) | 6,9 % | 1,8 % |

- Encuesta de percepción: *n* = 12, *M* = 4,10, *DE* = 0,54, α = 0,95
  (D1 = 0,88; D2 = 0,85; D3 = 0,81).
- Auditoría ISO/IEC/IEEE 42010: 20/24 ítems plenos (83,3 %; 91,7 % ponderado), κ = 0,81.

## 5. Alcance del repositorio

Se publican los artefactos de investigación: datos crudos, script de análisis,
ADR y los documentos de cada fase. El código fuente completo de la prueba de
concepto no se distribuye en este repositorio; los extractos relevantes para la
trazabilidad de las métricas están citados en el cuerpo de la fase 3.
