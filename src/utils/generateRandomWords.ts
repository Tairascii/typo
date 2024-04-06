import { words } from "@/constants/words"

export const generateRandomWords = (): string[] => {
  const result = new Array(words.length)
  words.forEach((item) => {
    const randomIndex = Math.floor(Math.random() * words.length)
    result[randomIndex] = item
  })

  return words
}
