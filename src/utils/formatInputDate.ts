export function formatInputDate(date: string): string {
  const d = new Date(date)
  const ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(d)
  const mo = new Intl.DateTimeFormat('es', { month: '2-digit' }).format(d)
  const da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(d)
  return `${ye}-${mo}-${da}`
}
