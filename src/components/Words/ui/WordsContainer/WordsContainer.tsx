import clsx from 'clsx'
import styles from './WordsContainer.module.css'

interface WordsContainerProps {
  isMissingFocus: boolean
  wrapperTop: number
  inputVal: string
  wordsSplitted: string[][]
  skippedWords: Set<string>
  currentWordIndex: number
  words: string[]
  correctIndexs: Set<string>
  incorrectIndexs: Set<string>
  caretPos: { top: number; left: number }
}

function WordsContainer({
  isMissingFocus,
  wrapperTop,
  inputVal,
  wordsSplitted,
  skippedWords,
  currentWordIndex,
  words,
  correctIndexs,
  incorrectIndexs,
  caretPos,
}: WordsContainerProps): JSX.Element {
  return (
    <div
      className={clsx(styles.block, { [styles.blurred]: isMissingFocus })}
      style={{ top: wrapperTop }}
    >
      <div
        className={clsx(styles.caret, {
          [styles.activeCaret]: !!inputVal && !currentWordIndex,
        })}
        style={{ top: `${caretPos.top}px`, left: `${caretPos.left}px` }}
      />
      {wordsSplitted.map((word, wordIndex) => {
        return (
          <span
            className={clsx(styles.word, {
              [styles.skipped]: skippedWords.has(words[wordIndex]),
            })}
            key={words[wordIndex]}
          >
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
  )
}

export default WordsContainer
