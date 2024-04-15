import clsx from 'clsx'
import styles from './Timer.module.css'
import { formatTime } from '@/utils/formatTime'

interface TimerProps {
  timeLeft: {
    minute: number
    seconds: number
  }
  started: boolean
}

function Timer({ timeLeft, started }: TimerProps): JSX.Element {
  return (
    <div
      className={clsx(styles.block, {
        [styles.red]: timeLeft.minute === 0 && timeLeft.seconds <= 3,
      })}
      style={{ opacity: started ? 1 : 0 }}
    >
      <span className={styles.timerText}>{formatTime(timeLeft.minute, timeLeft.seconds)}</span>
    </div>
  )
}

export default Timer
