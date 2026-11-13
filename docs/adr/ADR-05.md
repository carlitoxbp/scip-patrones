# ADR-05 · Calidad automatizada en integración continua

- **Estado:** Aceptada
- **Fecha:** 2026-10-18
- **Decisores:** Carlos Barberán, Josué Robles, Mateo Riofrío, Damián González
- **Concerns:** mantenibilidad, reproducibilidad, trazabilidad, cumplimiento ISO/IEC 25023

## Contexto

La Fase 3 exige evidencia objetiva de mantenibilidad. La medición manual no es
reproducible ni comparable entre versiones, y el equipo necesita bloquear cambios
que degraden la calidad.

## Decisión

Ejecutar en cada push y pull request un pipeline de GitHub Actions con lint,
pruebas y cobertura, análisis estático con SonarQube 10.6 y una puerta de calidad
con umbrales fijados antes de la medición: CCN ≤ 10, MI ≥ 65, CBO ≤ 9, CD ≤ 3 %,
cobertura ≥ 80 %. El despliegue solo ocurre si la puerta pasa.

## Alternativas consideradas

| Alternativa | Motivo de descarte |
| --- | --- |
| Medición manual al cierre | No reproducible y sin trazabilidad por commit |
| Solo lint y pruebas | No cubre complejidad, acoplamiento ni duplicación |
| Otro servicio SaaS de análisis | Costo y menor control sobre el ruleset |

## Consecuencias

- Positivas: 34 ejecuciones registradas, 4/4 umbrales verificados y artefactos
  conservados 30 días para auditoría.
- Negativas: 2 min 41 s de duración media por ejecución y necesidad de mantener
  el token de SonarQube como secreto.
- Verificación: la puerta «SCIP-Mantenibilidad» bloquea el despliegue si falla.
