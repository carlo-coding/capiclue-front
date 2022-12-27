export function isOverEighteen(date: string): boolean {
  const birthday = new Date(date)
  const hoy = new Date()
  let age = hoy.getFullYear() - birthday.getFullYear()
  if (
    hoy.getMonth() < birthday.getMonth() ||
    (hoy.getMonth() === birthday.getMonth() &&
      hoy.getDate() < birthday.getDate())
  ) {
    age--
  }
  return age >= 18
}
