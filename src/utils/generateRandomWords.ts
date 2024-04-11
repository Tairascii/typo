import { words } from '@/constants/words'

export const generateRandomWords = (): {
  words: string[]
  wordsAsString: string
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
    wordsAsString: fullWords.join(' ').trim(),
    wordsSplitted: result,
  }
}
