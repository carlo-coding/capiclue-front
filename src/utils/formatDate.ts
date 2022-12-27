export function formatDate(date?: string): string {
  if (date === undefined) return ''
  const d = new Date(date)
  const ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(d)
  const mo = new Intl.DateTimeFormat('es', { month: 'short' })
    .format(d)
    .toUpperCase()
  const da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(d)
  return `${ye}-${mo}-${da}`
}
