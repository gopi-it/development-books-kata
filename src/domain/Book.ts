export type Book = {
  readonly id: number
  readonly title: string
  readonly author: string
  readonly year: number
  readonly description: string
  readonly coverUrl: string
  readonly coverColor: string
}

const GITHUB_IMAGES = 'https://raw.githubusercontent.com/stephane-genicot/katas/master/images'

export const CATALOGUE: readonly Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    description: 'A Handbook of Agile Software Craftsmanship',
    coverUrl: `${GITHUB_IMAGES}/Kata_DevelopmentBooks_CleanCode.png`,
    coverColor: '#1a3a5c',
  },
  {
    id: 2,
    title: 'The Clean Coder',
    author: 'Robert C. Martin',
    year: 2011,
    description: 'A Code of Conduct for Professional Programmers',
    coverUrl: `${GITHUB_IMAGES}/Kata_DevelopmentBooks_CleanCoder.png`,
    coverColor: '#c45c00',
  },
  {
    id: 3,
    title: 'Clean Architecture',
    author: 'Robert C. Martin',
    year: 2017,
    description: "A Craftsman's Guide to Software Structure and Design",
    coverUrl: `${GITHUB_IMAGES}/Kata_DevelopmentBooks_CleanArchitecture.jpeg`,
    coverColor: '#1a5c3a',
  },
  {
    id: 4,
    title: 'TDD by Example',
    author: 'Kent Beck',
    year: 2003,
    description: 'Add test. Pass test. Refactor. Repeat.',
    coverUrl: `${GITHUB_IMAGES}/Kata_DevelopmentBooks_TDD.jpeg`,
    coverColor: '#1a1a4e',
  },
  {
    id: 5,
    title: 'Working Effectively with Legacy Code',
    author: 'Michael C. Feathers',
    year: 2004,
    description: 'Improve software quality without changing behavior',
    coverUrl: `${GITHUB_IMAGES}/Kata_DevelopmentBooks_Refactoring.jpeg`,
    coverColor: '#7a1a1a',
  },
]
