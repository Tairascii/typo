import { words } from '@/constants/words'

export const generateRandomWords = (): {
  words: string[]
  wordsSplitted: string[][]
} => {
  const result: string[][] = new Array(words.length)
  const fullWords: string[] = new Array(words.length)
  words.forEach((item, index) => {
    // const randomIndex = Math.floor(Math.random() * words.length)
    result[index] = item.split('')
    fullWords[index] = item.trim()
  })
  return {
    words: fullWords,
    wordsSplitted: result,
  }
}
