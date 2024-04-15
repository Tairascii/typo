'use client'
import WarningIcon from '@/ui/Icons/Warning'
import { useWordsTest } from './useWordsTest'
import RedoIcon from '@/ui/Icons/RedoIcon'
import { BG_SECONDARY } from '@/constants/colors'
import { WordsContainer } from './ui/WordsContainer'
import styles from './Words.module.css'
import { Timer } from './ui/Timer'
import { Result } from './ui/Result'

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
    shouldShowResult,
  } = useWordsTest({ seconds })

  return (
    <div className={styles.block}>
      <Timer timeLeft={timeLeft} started={started} />
      <div
        className={styles.words}
        onClick={() => {
          if(!shouldShowResult) {
            inputRef.current?.focus()
          }
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
        {shouldShowResult && (
          <Result
            correctIndexs={correctIndexs}
            incorrectIndexs={incorrectIndexs}
            currentWordIndex={currentWordIndex}
            seconds={seconds}
          />
        )}
        {!shouldShowResult && (
          <WordsContainer
            isMissingFocus={isMissingFocus}
            wrapperTop={wrapperTop}
            inputVal={inputVal}
            wordsSplitted={wordsSplitted}
            skippedWords={skippedWords}
            currentWordIndex={currentWordIndex}
            words={words}
            correctIndexs={correctIndexs}
            incorrectIndexs={incorrectIndexs}
            caretPos={caretPos}
          />
        )}
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
