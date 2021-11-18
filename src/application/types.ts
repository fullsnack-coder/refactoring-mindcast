export type StoreAction<T = unknown> = {
  payload?: T
  type: string
}

export type Topic = {
  id: string
  name: string
  description: string
}

export type User = {
  email?: string
  username: string
  description?: string
  avatarUrl?: string
  phoneNumber?: string
}

export type AuthLoginInput = {
  email: string
  password: string
}

export type AuthRegisterInput = {
  email: string
  password: string
  confirmPassword: string
}

export type PodcastSubject = {
  id: string
  description: string
  title: string
  tag: string
}

export type Author = {
  firsName: string
  lastName?: string
  avatarUrl?: string
  description: string
  subjects: PodcastSubject[]
  podcasts: number
}

export type Podcast = {
  author: Author
  averagePuntuation: number
  coverImage?: string
  description: string
  title: string
  subjects: PodcastSubject[]
}
