import { ACCENT_PRIMARY, BG_SECONDARY } from '@/constants/colors'
import { Limit } from '@/constants/limits'
import MailIcon from '@/ui/Icons/MailIcon'
import TextIcon from '@/ui/Icons/TextIcon'
import TimerIcon from '@/ui/Icons/TimerIcon'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './Settings.module.css'

interface SettingsProps {
  limits: Limit[]
  activeLimitValue: number
  setActiveLimitValue: (val: number) => void
}

function Settings({
  limits,
  activeLimitValue,
  setActiveLimitValue,
}: SettingsProps): JSX.Element {
  const [activeLimitType, setActiveLimitType] = useState(limits[0])

  const getLimitIcon = (key: string, isActive: boolean): JSX.Element | null => {
    switch (key) {
      case 'time':
        return (
          <TimerIcon
            borderColor={isActive ? ACCENT_PRIMARY : BG_SECONDARY}
            width={16}
            height={16}
          />
        )
      case 'words':
        return (
          <TextIcon
            borderColor={isActive ? ACCENT_PRIMARY : BG_SECONDARY}
            width={16}
            height={16}
          />
        )
      default:
        return null
    }
  }
  return (
    <div className={styles.block}>
      <div className={styles.addSymbolWrapper}>
        {/* TODO add map with other values beside numbers */}
        <button className={styles.addSymbol}>
          <span className={styles.addSymbolText}>numbers</span>
        </button>
      </div>
      <div className={styles.divider} />
      <div className={styles.limitTypeWrapper}>
        {limits.map((limit) => {
          const isActive = limit.key === activeLimitType.key
          return (
            <button
              className={styles.limitType}
              key={limit.key}
              onClick={() => {
                setActiveLimitValue(limit.values[0])
                setActiveLimitType(limit)
              }}
            >
              {getLimitIcon(limit.key, isActive)}
              <span
                className={clsx(styles.limitTypeText, {
                  [styles.isActive]: isActive,
                })}
              >
                {limit.key}
              </span>
            </button>
          )
        })}
      </div>
      <div className={styles.divider} />
      <div className={styles.limitCountWrapper}>
        {activeLimitType.values.map((value) => {
          return (
            <button
              className={styles.limitCount}
              key={`${activeLimitType.key}-${value}`}
              onClick={() => setActiveLimitValue(value)}
            >
              <span
                className={clsx(styles.limitCountText, {
                  [styles.isActive]: activeLimitValue === value,
                })}
              >
                {value}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Settings
