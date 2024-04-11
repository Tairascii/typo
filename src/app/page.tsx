import styles from '@/styles/page.module.css'
import dynamic from 'next/dynamic'

const Words = dynamic(() => import('@/components/Words/Words'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className={styles.main}>
      <Words />
    </main>
  )
}
