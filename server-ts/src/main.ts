// type aliases / custom types

type Name = string
type PopularTrait = string

// interfaces

interface UserInterface {
  name: string
  age: number
}

const user: UserInterface = {
  name: 'ian',
  age: 29,
}

const getFullName = (first: Name, surname: Name): string => {
  return first + surname
}

function typeTest(name: string): string {
  return name
}

// type aliases

const listTraits: PopularTrait[] = ['tall', 'fat', 'smart']

export {}
