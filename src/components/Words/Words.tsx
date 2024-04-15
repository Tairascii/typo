'use client'
import clsx from 'clsx'
import WarningIcon from '@/ui/Icons/Warning'
import { useWordsTest } from './useWordsTest'
import { formatTime } from '@/utils/formatTime'
import RedoIcon from '@/ui/Icons/RedoIcon'
import { BG_SECONDARY } from '@/constants/colors'
import styles from './Words.module.css'

interface WordsProps {
  seconds: number
}
function Words({ seconds }: WordsProps): JSX.Element {
  const {
    wordsSplitted,
    words,
    inputRef,
    spyDivRef,
    spySpanRef,
    inputVal,
    wrapperTop,
    isMissingFocus,
    setIsMissingFocus,
    onInputChange,
    currentWordIndex,
    caretPos,
    skippedWords,
    correctIndexs,
    incorrectIndexs,
    timeLeft,
    started,
    onRestart,
  } = useWordsTest({ seconds })

  return (
    <div className={styles.block}>
      <div
        className={clsx(styles.timer, {
          [styles.timerRed]: timeLeft.minute === 0 && timeLeft.seconds <= 3,
        })}
        style={{ opacity: started ? 1 : 0 }}
      >
        <span>{formatTime(timeLeft.minute, timeLeft.seconds)}</span>
      </div>
      <div
        className={styles.words}
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
                        [styles.incorrect]:
                          incorrectIndexs.has(wordLetterIndex),
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
          style={{ position: 'absolute', opacity: 0, top: 0, left: 0 }}
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
      <button className={styles.restart} onClick={onRestart}>
        <RedoIcon borderColor={BG_SECONDARY} width={24} height={24} />
      </button>
    </div>
  )
}

export default Words
