import { TSections } from '../features/publication/publicationSlice'

export function validateSectionQuery(
  section?: string | null,
  search?: string
): TSections {
  const sections: TSections[] = [
    'all',
    'favorite',
    'friends',
    'popular',
    'search',
    'user'
  ]
  if (search !== undefined && search?.length !== 0) return 'search'
  if (section === undefined) return sections[0]
  if (sections.includes(section as TSections)) return section as TSections
  return sections[0]
}
