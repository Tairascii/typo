import styles from './Header.module.css'
import SettingsIcon from '@/ui/Icons/SettingsIcon'
import UserIcon from '@/ui/Icons/UserIcon'
import KeyboardIcon from '@/ui/Icons/KeyboardIcon'

function Header(): JSX.Element {
  return (
    <header className={styles.block}>
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <KeyboardIcon borderColor='#9067c6' width={36} height={36} />
          <span className={styles.logoTitle}>typo</span>
        </div>
        <SettingsIcon width={20} height={20} borderColor='#9067c6' />
      </div>
      <div className={styles.rightSide}>
        <UserIcon width={20} height={20} borderColor='#9067c6' />
      </div>
    </header>
  )
}

export default Header
