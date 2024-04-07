"use client"
import { useMemo, useState } from 'react'
import styles from './Words.module.css'
import { generateRandomWords } from '@/utils/generateRandomWords'

function Words(): JSX.Element {
  const words = useMemo(() => generateRandomWords(), [])
  const [inputVal, setInputVal] = useState('')
  return (
    <div className={styles.block}>
      <div className={styles.carret} />
      {words.map((word) => {
        return <span className={styles.word}>{word}</span>
      })}
      <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value) }/>
    </div>
  )
}

export default Words
