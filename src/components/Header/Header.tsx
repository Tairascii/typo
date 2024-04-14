import Image from 'next/image'
import styles from './Header.module.css'
import CodeIcon from '@/ui/Icons/CodeIcon'
import SettingsIcon from '@/ui/Icons/SettingsIcon'
import UserIcon from '@/ui/Icons/UserIcon'

function Header(): JSX.Element {
  return (
    <header className={styles.block}>
      <div className={styles.leftSide}>
        <Image src={'/images/logo.svg'} alt={'logo'} width={100} height={60} />
        <SettingsIcon width={20} height={20} borderColor='#fff' />
      </div>
      <div className={styles.rightSide}>
        <UserIcon width={20} height={20} borderColor='#fff' />
      </div>
    </header>
  )
}

export default Header
