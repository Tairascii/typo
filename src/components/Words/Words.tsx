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
  const { words, wordsSplitted } = useMemo(() => generateRandomWords(), [])
  const inputRef = useRef<HTMLInputElement>(null)
  const spyDivRef = useRef<HTMLDivElement>(null)
  const spySpanRef = useRef<HTMLSpanElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const correctIndexs = useMemo(() => new Set(), [])
  const incorrectIndexs = useMemo(() => new Set(), [])
  const lastWordsInLines = useMemo(() => new Set(), [])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
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

  const onSpacePressed = (): void => {
    const word = inputVal.trim()
    if (lastWordsInLines.has(word)) {
      lastWordsInLines.delete(word)
      moveToNextLine()
    } else {
      setCaretPos({ left: caretPos.left + 8, top: caretPos.top })
    }
    setInputVal('')
    setCurrentWordIndex(currentWordIndex + 1)
  }

  const changeCaretPosition = (lastIndex: number, isDelete: boolean): void => {
    if (spySpanRef.current) {
      const correctWord = words[currentWordIndex]
      const previousCorrectWordState = correctWord.slice(
        0,
        lastIndex + (isDelete ? 2 : 0),
      )
      const currentCorrectWordState = correctWord.slice(0, lastIndex + 1)
      spySpanRef.current.innerHTML = previousCorrectWordState
      const previousCorrectWordWidth =
        spySpanRef.current.getBoundingClientRect().width
      spySpanRef.current.innerHTML = currentCorrectWordState
      const currentCorrectWordWidth =
        spySpanRef.current.getBoundingClientRect().width
      const newLeftCaretPosition =
        caretPos.left + currentCorrectWordWidth - previousCorrectWordWidth
      setCaretPos({ left: newLeftCaretPosition, top: caretPos.top })
    }
  }

  const markCorrectIncorrect = (newInputVal: string): void => {
    const isDelete = newInputVal.length < inputVal.length
    const lastIndex = newInputVal.length - 1
    const wordLetterIndex = `${currentWordIndex}-${newInputVal.length - 1}`
    if (isDelete) {
      const prevState = `${currentWordIndex}-${lastIndex + 1}`
      correctIndexs.delete(prevState)
      incorrectIndexs.delete(prevState)
    } else if (newInputVal[lastIndex] === words[currentWordIndex][lastIndex]) {
      correctIndexs.add(wordLetterIndex)
    } else {
      incorrectIndexs.add(wordLetterIndex)
    }
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newInputVal = e.target.value
    const lastIndex = newInputVal.length - 1
    if (newInputVal[lastIndex] == ' ') {
      onSpacePressed()
      return
    }

    const isDelete = newInputVal.length < inputVal.length
   
    markCorrectIncorrect(newInputVal)

    changeCaretPosition(lastIndex, isDelete)

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
          className={clsx(styles.caret, {
            [styles.activeCaret]: !!inputVal && !currentWordIndex,
          })}
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
                    {letter}
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
