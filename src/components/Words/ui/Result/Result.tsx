import { calculateResult } from '@/utils/calculateResult'
import styles from './Result.module.css'

interface ResultProps {
  correctIndexs: Set<string>
  incorrectIndexs: Set<string>
  currentWordIndex: number
  seconds: number
}

function Result({
  correctIndexs,
  incorrectIndexs,
  currentWordIndex,
  seconds,
}: ResultProps): JSX.Element {
  const { wpm, acc } = calculateResult(
    correctIndexs.size,
    incorrectIndexs.size,
    currentWordIndex,
    seconds,
  )
  return (
    <div className={styles.block}>
      <div className={styles.resultBlock}>
        <span className={styles.resultBlockTitle}>wpm</span>
        <span className={styles.resultBlockResult}>{wpm}</span>
      </div>
      <div className={styles.resultBlock}>
        <span className={styles.resultBlockTitle}>acc</span>
        <span className={styles.resultBlockResult}>{acc}%</span>
      </div>
    </div>
  )
}

export default Result
