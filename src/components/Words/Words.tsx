'use client'
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import styles from './Words.module.css'
import { generateRandomWords } from '@/utils/generateRandomWords'
import clsx from 'clsx'
import WarningIcon from '@/ui/Icons/Warning'

function Words(): JSX.Element {
  const { words, wordsAsString, wordsSplitted } = useMemo(
    () => generateRandomWords(),
    [],
  )
  const inputRef = useRef<HTMLInputElement>(null)
  const spyDivRef = useRef<HTMLDivElement>(null)
  const spySpanRef = useRef<HTMLSpanElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const correctIndexs = useMemo(() => new Set(), [])
  const incorrectIndexs = useMemo(() => new Set(), [])
  const lastWordsInLines = useMemo(() => new Set(), [])
  const [inputVal, setInputVal] = useState('')
  const [caretPos, setCaretPos] = useState({
    top: 0,
    left: 0,
  })
  const [wrapperTop, setWrapperTop] = useState(0)
  const [isMissingFocus, setIsMissingFocus] = useState(false)

  const moveToNextLine = (): void => {
    if (wrapperRef.current) {
      setWrapperTop((prev) => prev - 36)
      setCaretPos({ left: 0, top: caretPos.top + 36 })
    }
  }

  //todo move to store maybe
  //refactor seems like i can do it without whole string just by word by word
  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newInputVal = e.target.value
    const typedWords = newInputVal.split(' ')
    const lastTypedWord = typedWords[typedWords.length - 1]
    const beforeLastTypeWord = typedWords[typedWords.length - 2]
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
    if (lastWordsInLines.has(beforeLastTypeWord)) {
      lastWordsInLines.delete(beforeLastTypeWord)
      moveToNextLine()
    } else if (spySpanRef.current) {
      spySpanRef.current.innerHTML = typedWords.join('')
      const letterWidth =
        spySpanRef.current.offsetWidth + 8 * (typedWords.length - 1)
      setCaretPos({ left: letterWidth, top: caretPos.top })
    }
    setInputVal(e.target.value)
  }

  //get last words on each lines
  useLayoutEffect(() => {
    if (spyDivRef.current) {
      spyDivRef.current.innerHTML = words[0]
      let height = spyDivRef.current.clientHeight
      for (let i = 1; i < words.length; i++) {
        const span = document.createElement('span')
        span.innerHTML = words[i]
        spyDivRef.current.appendChild(span)
        if (spyDivRef.current.clientHeight > height) {
          height = spyDivRef.current.clientHeight
          lastWordsInLines.add(words[i - 1])
        }
      }
    }
  }, [])

  return (
    <div
      className={styles.block}
      onClick={() => {
        inputRef.current?.focus()
      }}
    >
      <div
        className={styles.spyWrapper}
        style={{ opacity: 0, position: 'absolute' }}
        ref={spyDivRef}
      />
      <span
        ref={spySpanRef}
        style={{ display: 'inline-block', position: 'absolute', opacity: 0 }}
      />
      <div
        className={clsx(styles.wrapper, { [styles.blurred]: isMissingFocus })}
        style={{ top: wrapperTop }}
        ref={wrapperRef}
      >
        <div
          className={clsx(styles.caret, { [styles.activeCaret]: !!inputVal })}
          style={{ top: `${caretPos.top}px`, left: `${caretPos.left}px` }}
        />
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
                    {letter === ' ' ? 'a&nbsp' : letter}
                  </span>
                )
              })}
            </span>
          )
        })}
      </div>
      <input
        type='text'
        value={inputVal}
        onChange={onInputChange}
        autoFocus
        className={styles.input}
        ref={inputRef}
        // onBlur={() => setIsMissingFocus(true)}
        onFocus={() => setIsMissingFocus(false)}
      />
      {isMissingFocus && (
        <div
          className={styles.startFocusing}
          onClick={() => inputRef.current?.focus()}
        >
          <WarningIcon width={24} height={24} borderColor='#fff' />
          <span>Looks like you lost your focus</span>
        </div>
      )}
    </div>
  )
}

export default Words
