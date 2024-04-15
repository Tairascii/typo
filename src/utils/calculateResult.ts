export const calculateResult = (
  correctCnt: number,
  incorrectCnt: number,
  wordsCnt: number,
  seconds: number,
): { wpm: number; acc: number } => {
  const spaces = wordsCnt - 1
  const minutes = seconds / 60
  const totalChars = correctCnt + incorrectCnt + spaces
  const grossWpm = Math.round(totalChars / 5 / minutes)
  const netWpm = grossWpm - Math.round(incorrectCnt / minutes)
  const acc = 100 - Math.round((incorrectCnt * 100) / totalChars)
  return { wpm: netWpm, acc }
}
