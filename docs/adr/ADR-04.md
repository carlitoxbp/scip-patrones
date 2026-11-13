# ADR-04 · Exportación de fichas con Factory Method

- **Estado:** Aceptada
- **Fecha:** 2026-10-15
- **Decisores:** Carlos Barberán, Josué Robles, Mateo Riofrío, Damián González
- **Concerns:** extensibilidad, acoplamiento, mantenibilidad

## Contexto

El catálogo ofrece exportar fichas en PDF y JSON. Nuevos formatos (Markdown, DOCX)
son probables, y el cliente no debe conocer las clases concretas de cada exportador.

## Decisión

Aplicar el patrón **Factory Method**: una interfaz `Exportador` con implementaciones
`ExportadorPDF` y `ExportadorJSON`, y una fábrica que resuelve la implementación
según el formato solicitado. El cliente depende solo de la interfaz.

## Alternativas consideradas

| Alternativa | Motivo de descarte |
| --- | --- |
| Condicionales por formato | Aumenta la complejidad ciclomática y duplica la lógica |
| Registro dinámico de plugins | Complejidad prematura para dos formatos |
| Servicio externo de conversión | Dependencia de red y costo por uso |

## Consecuencias

- Positivas: añadir un formato implica una clase nueva y una entrada en la fábrica;
  el CBO del módulo de exportación bajó de 12 a 6.
- Negativas: una indirección adicional para un caso con dos implementaciones.
- Verificación: pruebas unitarias por exportador y prueba de contrato de la fábrica.
