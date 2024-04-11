'use client'
import { ChangeEvent, useMemo, useRef, useState } from 'react'
import styles from './Words.module.css'
import { generateRandomWords } from '@/utils/generateRandomWords'
import clsx from 'clsx'

function Words(): JSX.Element {
  const { words, wordsAsString, wordsSplitted } = useMemo(
    () => generateRandomWords(),
    [],
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const correctIndexs = useMemo(() => new Set(), [])
  const incorrectIndexs = useMemo(() => new Set(), [])
  const [inputVal, setInputVal] = useState('')

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newInputVal = e.target.value
    const typedWords = newInputVal.split(' ')
    const lastTypedWord = typedWords[typedWords.length - 1]
    const wordLetterIndex = `${typedWords.length - 1}-${lastTypedWord.length - 1}`
    const lastInputValIndex = newInputVal.length - 1
    if (newInputVal.length < inputVal.length) {
      const prevState = `${typedWords.length - 1}-${lastTypedWord.length}`
      correctIndexs.delete(prevState)
      incorrectIndexs.delete(prevState)
    } else if (
      lastInputValIndex >= 0 &&
      wordsAsString[lastInputValIndex] === newInputVal[lastInputValIndex]
    ) {
      correctIndexs.add(wordLetterIndex)
    } else {
      incorrectIndexs.add(wordLetterIndex)
    }
    setInputVal(e.target.value)
  }

  return (
    <div
      className={styles.block}
      onClick={() => {
        inputRef.current?.focus()
      }}
    >
      <div className={styles.caret} />
      {wordsSplitted.map((word, wordIndex) => {
        return (
          <span className={styles.word} key={words[wordIndex]}>
            {word.map((letter, letterIndex) => {
              const wordLetterIndex = `${wordIndex}-${letterIndex}`
              return (
                <span
                  key={`${letter}-${letterIndex}-${wordIndex}`}
                  className={clsx({
                    [styles.correct]: correctIndexs.has(wordLetterIndex),
                    [styles.incorrect]: incorrectIndexs.has(wordLetterIndex),
                  })}
                >
                  {letter}
                </span>
              )
            })}
          </span>
        )
      })}
      <input
        type='text'
        value={inputVal}
        onChange={onInputChange}
        autoFocus
        className={styles.input}
        ref={inputRef}
      />
    </div>
  )
}

export default Words
