import styles from './Header.module.css'
import SettingsIcon from '@/ui/Icons/SettingsIcon'
import UserIcon from '@/ui/Icons/UserIcon'
import KeyboardIcon from '@/ui/Icons/KeyboardIcon'
import { ACCENT_PRIMARY, BG_SECONDARY } from '@/constants/colors'

function Header(): JSX.Element {
  return (
    <header className={styles.block}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <KeyboardIcon borderColor={ACCENT_PRIMARY} width={36} height={36} />
          <span className={styles.logoTitle}>typo</span>
        </div>
        <SettingsIcon width={20} height={20} borderColor={BG_SECONDARY} />
      </div>
      <div className={styles.rightSide}>
        <UserIcon width={20} height={20} borderColor={BG_SECONDARY} />
      </div>
    </header>
  )
}

export default Header
