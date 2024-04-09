import Image from 'next/image'
import styles from './Header.module.css'

function Header(): JSX.Element {
  return (
    <header className={styles.block}>
      <div className={styles.leftSide}>
        <Image src={'/images/logo.svg'} alt={'logo'} width={100} height={60} />
        <Image
          src={'/images/icons/settings.svg'}
          alt={'logo'}
          width={20}
          height={20}
        />
        <Image
          src={'/images/icons/code.svg'}
          alt={'logo'}
          width={20}
          height={20}
        />
      </div>
      <div className={styles.rightSide}>
        <Image
          src={'/images/icons/user.svg'}
          alt={'logo'}
          width={20}
          height={20}
        />
      </div>
    </header>
  )
}

export default Header
