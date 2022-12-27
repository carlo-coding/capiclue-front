export function obtenerObjetosUnicos<T extends Array<{ id?: number }>>(
  lista1?: T,
  lista2?: T
): T {
  const objetosUnicos = []
  // Agrega los objetos de la primera lista a la lista de objetos únicos
  for (const objeto of lista1 === undefined ? [] : lista1) {
    if (objetosUnicos.find((o) => o.id === objeto.id) == null) {
      objetosUnicos.push(objeto)
    }
  }
  // Agrega los objetos de la segunda lista a la lista de objetos únicos
  for (const objeto of lista2 === undefined ? [] : lista2) {
    if (objetosUnicos.find((o) => o.id === objeto.id) == null) {
      objetosUnicos.push(objeto)
    }
  }

  return objetosUnicos as T
}
