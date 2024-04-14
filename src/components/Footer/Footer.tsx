import CoffeeIcon from '@/ui/Icons/CoffeeIcon'
import styles from './Footer.module.css'
import MailIcon from '@/ui/Icons/MailIcon'
import CodeIcon from '@/ui/Icons/CodeIcon'
import { BG_SECONDARY } from '@/constants/colors'

function Footer(): JSX.Element {
  return (
    <footer className={styles.block}>
      <div className={styles.links}>
        <div className={styles.link}>
          <MailIcon width={16} height={16} borderColor={BG_SECONDARY} />
          <span className={styles.linkTitle}>Contacts</span>
        </div>
        <a className={styles.link} href='https://github.com/Tairascii/typo'>
          <CodeIcon width={16} height={16} borderColor={BG_SECONDARY} />
          <span className={styles.linkTitle}>Code</span>
        </a>
      </div>
      <div className={styles.creator}>
        <CoffeeIcon width={16} height={16} borderColor={BG_SECONDARY} />
        <span className={styles.name}>Tair Sairanbekov</span>
      </div>
    </footer>
  )
}

export default Footer
