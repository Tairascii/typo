import styles from '@/styles/page.module.css'
import dynamic from 'next/dynamic'

const Main = dynamic(() => import('@/components/Main/Main'), {
  ssr: false,
})

export default function Home() {
  return (
    <main className={styles.main}>
      <Main />
    </main>
  )
}
