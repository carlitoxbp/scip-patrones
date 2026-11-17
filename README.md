# SCIP · Catálogo interactivo de patrones de diseño GoF

Artefacto de investigación del proyecto integrador de **Arquitectura de Software**
(Universidad Laica Eloy Alfaro de Manabí, ULEAM).

**Integrantes:** Carlos Barberán · Josué Robles · Mateo Riofrío · Damián González
**Docente:** Patricio Arturo Quiroz Valencia
**Periodo:** octubre–noviembre de 2026

## Qué es el SCIP

Sistema de Catálogo Interactivo de Patrones. Publica los 22 patrones de diseño del
catálogo GoF con intención, analogía cotidiana, caso de uso técnico, filtros por
categoría, búsqueda incremental y un mapa jerárquico navegable. El diseño se
documenta en las fases 1 y 2; la prueba de concepto, el pipeline de calidad y la
recolección de datos, en la fase 3; el análisis de resultados y la discusión, en la fase 4;
y la síntesis científica, en la fase 5.

## Resultados principales

| Indicador | Antes (v0.1.0) | Después (v1.0.0) | Umbral |
| --- | ---: | ---: | --- |
| Complejidad ciclomática (CCN) | 12,0 | 6,5 | ≤ 10 |
| Índice de mantenibilidad (MI) | 60,8 | 74,2 | ≥ 65 |
| Acoplamiento entre objetos (CBO) | 10,0 | 6,0 | ≤ 9 |
| Duplicación de código (CD) | 6,9 % | 1,8 % | ≤ 3 % |

- Encuesta a expertos: *n* = 12, media global 4,10/5, α de Cronbach = 0,95.
- Auditoría ISO/IEC/IEEE 42010: 20/24 ítems plenos (83,3 %; 91,7 % ponderado), κ = 0,81.
- Pipeline: 34 ejecuciones, 84,6 % de cobertura, 0 vulnerabilidades críticas.

## Estructura del repositorio

```
scip-patrones/
├─ datos/                 datos crudos y agregados del estudio
│  ├─ metricas_estaticas.csv
│  ├─ encuesta_respuestas.csv
│  ├─ auditoria_42010.csv
│  ├─ lighthouse.csv
│  └─ resumen.json
├─ scripts/
│  └─ analisis.mjs        recalcula métricas, alfa y cumplimiento
├─ docs/
│  ├─ ENTREGA.md          guía de revisión de la entrega
│  ├─ mapa-interactivo.html  mapa mental navegable de la fase 1
│  ├─ adr/                ADR-01 a ADR-05 (decisiones de arquitectura)
│  └─ fases/              entregables en PDF de las fases 1, 2, 3, 4 y 5
├─ package.json
├─ LICENSE                código y scripts (MIT)
└─ LICENSE-DATA           datos (CC BY 4.0)
```

## Diccionario de datos

| Archivo | Contenido | Registros |
| --- | --- | ---: |
| `datos/metricas_estaticas.csv` | CCN, MI, CBO y CD por módulo y versión | 12 |
| `datos/encuesta_respuestas.csv` | Matriz anonimizada de 13 ítems Likert (E01–E12) | 12 × 13 |
| `datos/auditoria_42010.csv` | Ítems de conformidad ISO/IEC/IEEE 42010 | 24 |
| `datos/lighthouse.csv` | Rendimiento y accesibilidad en móvil y escritorio | 8 |
| `datos/resumen.json` | Agregados, desviaciones y alfa de Cronbach | 1 |

Las respuestas de la encuesta están anonimizadas: no contienen nombres, correos ni
direcciones IP. La correspondencia con las personas participantes no se conserva.

## Reproducir el análisis

Requiere Node.js 24 o superior. No hay dependencias externas.

```bash
git clone https://github.com/carlitoxbp/scip-patrones.git
cd scip-patrones
npm ci
npm run analyze
```

`npm run analyze` lee los CSV de `datos/`, recalcula promedios, desviaciones
estándar, alfa de Cronbach y porcentajes de cumplimiento, e imprime el resumen y
reescribe `datos/resumen.json`. Cualquier cifra de los documentos puede verificarse
con ese comando.

## Documentos

| Fase | Entregable |
| --- | --- |
| 1 | `docs/fases/Mapa_Mental_Patrones_GoF.pdf` |
| 2 | `docs/fases/Fase2_Diseno_Metodologico_Patrones_GoF.pdf` |
| 3 | `docs/fases/Fase3_Implementacion_y_Datos_Patrones_GoF.pdf` |
| 4 | `docs/fases/Fase4_Analisis_y_Discusion_Patrones_GoF.pdf` |
| 5 | `docs/fases/Fase5_Manuscrito_Cientifico_Patrones_GoF.pdf` |

El orden sugerido de lectura, con el mapa de cada evidencia, está en
[`docs/ENTREGA.md`](docs/ENTREGA.md). La fase 1 tiene además una versión
navegable en [`docs/mapa-interactivo.html`](docs/mapa-interactivo.html).

## Licencias

- Código y scripts: MIT (`LICENSE`).
- Datos y documentación: Creative Commons Atribución 4.0 (`LICENSE-DATA`).

## Cómo citar

Barberán, C., Robles, J., Riofrío, M., & González, D. (2026). *SCIP: catálogo
interactivo de patrones de diseño GoF* [Conjunto de datos y artefacto de software].
https://github.com/carlitoxbp/scip-patrones
