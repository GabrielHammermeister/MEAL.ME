export type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export type Undefined<T> = {
  [K in keyof T]: T[K] | undefined
}
