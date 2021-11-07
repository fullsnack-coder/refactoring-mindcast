export type StoreAction<T = unknown> = {
  payload?: T
  type: string
}

export type Topic = {
  id: string
  name: string
  description: string
}
