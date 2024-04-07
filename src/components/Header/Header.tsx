import Image from 'next/image'

function Header(): JSX.Element {
  return (
    <header>
      <Image
        src={'/images/logo.svg'}
        alt={''}
        width={100}
        height={60}
      />
    </header>
  )
}

export default Header
