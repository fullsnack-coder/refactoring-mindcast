export type StoreAction<P = unknown, T = string> = {
  payload?: P
  type: T
}

export type Topic = {
  id: string
  title: string
  description: string
  tag: string
  coverUrl: string
}

export type User = {
  id: string
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
  id: string
  firstName: string
  lastName?: string
  avatarUrl?: string
  description: string
  subjects: PodcastSubject[]
  podcasts: number
}

export type Podcast = {
  id: string
  author: Author
  averagePuntuation: number
  coverImage?: string
  description: string
  title: string
  subjects: PodcastSubject[]
}

export type Playlist = {
  id: string
  name: string
  description?: string
  coverImage?: string
  createdAt: Date
  ownerId: User['id']
  podcasts: Podcast[]
}

export type Episode = {
  artist?: string
  id: string
  coverUrl?: string
  podcastId: Podcast['id']
  title: string
  description: string
  duration: number
  url: string
  localUrl?: string
  createdAt: Date
  updatedAt: Date
}
