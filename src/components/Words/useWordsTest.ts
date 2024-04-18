import { generateRandomWords } from '@/utils/generateRandomWords'
import {
  ChangeEvent,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

interface UseWordsTestParams {
  seconds: number
}

export const useWordsTest = ({ seconds }: UseWordsTestParams) => {
  const { words, wordsSplitted } = useMemo(() => generateRandomWords(), [])
  const initTimeLeft = {
    minute: Math.floor(seconds / 60),
    seconds: seconds % 60,
  }
  const correctIndexs = useMemo(() => new Set<string>(), [])
  const incorrectIndexs = useMemo(() => new Set<string>(), [])
  const lastWordsInLines = useMemo(() => new Set<string>(), [])
  const skippedWords = useMemo(() => new Set<string>(), [])
  const [started, setStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(initTimeLeft)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [inputVal, setInputVal] = useState('')
  const [caretPos, setCaretPos] = useState({
    top: 0,
    left: 0,
  })
  const [wrapperTop, setWrapperTop] = useState(0)
  const [isMissingFocus, setIsMissingFocus] = useState(false)
  const [shouldShowResult, setShouldShowResult] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const spyDivRef = useRef<HTMLDivElement>(null)
  const spySpanRef = useRef<HTMLSpanElement>(null)

  const moveToNextLine = (): void => {
    setWrapperTop((prev) => prev - 36)
    setCaretPos({ left: 0, top: caretPos.top + 36 })
  }

  const onSpacePressed = (lastIndex: number): void => {
    const word = words[currentWordIndex]
    if (lastWordsInLines.has(word)) {
      lastWordsInLines.delete(word)
      moveToNextLine()
    } else {
      changeCaretPositionOnSpace(lastIndex)
    }

    if (word !== word.slice(0, lastIndex)) {
      skippedWords.add(word)
    }

    setInputVal('')
    setCurrentWordIndex(currentWordIndex + 1)
  }

  const changeCaretPositionOnSpace = (lastIndex: number): void => {
    if (spySpanRef.current) {
      const word = words[currentWordIndex]
      const previousCorrectWordState = word.slice(0, lastIndex)
      spySpanRef.current.innerHTML = previousCorrectWordState
      const previousCorrectWordWidth =
        spySpanRef.current.getBoundingClientRect().width
      spySpanRef.current.innerHTML = word
      const currentCorrectWordWidth =
        spySpanRef.current.getBoundingClientRect().width
      const newLeftCaretPosition =
        caretPos.left + currentCorrectWordWidth - previousCorrectWordWidth + 8
      setCaretPos({ left: newLeftCaretPosition, top: caretPos.top })
    }
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
    if (!started) {
      setStarted(true)
    }

    const newInputVal = e.target.value
    const lastIndex = newInputVal.length - 1
    if (newInputVal[lastIndex] == ' ') {
      onSpacePressed(lastIndex)
      return
    }

    const isDelete = newInputVal.length < inputVal.length

    markCorrectIncorrect(newInputVal)

    changeCaretPosition(lastIndex, isDelete)

    setInputVal(e.target.value)
  }

  const onRestart = (): void => {
    correctIndexs.clear()
    incorrectIndexs.clear()
    skippedWords.clear()
    setInputVal('')
    setWrapperTop(0)
    setCaretPos({ left: 0, top: 0 })
    setStarted(false)
    setTimeLeft({
      minute: Math.floor(seconds / 60),
      seconds: seconds % 60,
    })
    setCurrentWordIndex(0)
    setShouldShowResult(false)
    inputRef.current?.focus()
  }

  const onFinish = (): void => {
    setStarted(false)
    inputRef.current?.blur()
    setShouldShowResult(true)
  }

  useLayoutEffect(() => {
    const getLastWordsInEachLine = (): void => {
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
    }
    getLastWordsInEachLine()
  }, [])

  useEffect(() => {
    if (!started) return
    let timer: ReturnType<typeof setInterval>
    timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minute === 0 && prev.seconds === 1) {
          clearInterval(timer)
          onFinish()
          return {
            minute: Math.floor(seconds / 60),
            seconds: seconds % 60,
          }
        } else if (prev.seconds === 0) {
          return { minute: prev.minute - 1, seconds: 59 }
        } else {
          return {
            minute: prev.minute,
            seconds: prev.seconds - 1,
          }
        }
      })
    }, 1000)

    return (): void => clearInterval(timer)
  }, [started])

  useEffect(() => {
    onRestart()
  }, [seconds])

  return {
    // * CORE *
    words,
    wordsSplitted,
    currentWordIndex,
    skippedWords,
    correctIndexs,
    incorrectIndexs,
    timeLeft,
    onRestart,
    // * INPUT *
    inputVal,
    onInputChange,
    isMissingFocus,
    setIsMissingFocus,
    // * REFS *
    inputRef,
    spyDivRef,
    spySpanRef,
    // * UI *
    wrapperTop,
    caretPos,
    started,
    shouldShowResult,
  }
}
