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
  if (sections.includes(section as TSections)) return section as TSections
  return sections[0]
}
