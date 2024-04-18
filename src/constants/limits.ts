export interface Limit {
  key: string
  values: number[]
}

export const limits: Limit[] = [
  { key: 'time', values: [15, 30, 60, 120] },
  { key: 'words', values: [10, 25, 50, 100] },
]
