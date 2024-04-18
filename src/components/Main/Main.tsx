'use client'
import { limits } from '@/constants/limits'
import { useState } from 'react'
import { Settings } from '../Settings'
import { Words } from '../Words'
import styles from './Main.module.css'

function Main(): JSX.Element {
  const [activeLimitValue, setActiveLimitValue] = useState(limits[0].values[0])
  const [shouldHideSettings, setShouldHideSettings] = useState(false)
  return (
    <div className={styles.block}>
      <div
        style={{ opacity: shouldHideSettings ? 0 : 1 }}
        className={styles.settingsWrapper}
      >
        <Settings
          limits={limits}
          activeLimitValue={activeLimitValue}
          setActiveLimitValue={setActiveLimitValue}
        />
      </div>
      <Words
        seconds={activeLimitValue}
        setShouldHideSettings={setShouldHideSettings}
      />
    </div>
  )
}

export default Main
