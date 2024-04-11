import Icon, { IconProps } from './Icon'

function UserIcon({ borderColor, width, height }: IconProps): JSX.Element {
  return (
    <Icon width={width} height={height} originalHeight={24} originalWidth={24}>
      <path
        d='M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z'
        stroke={borderColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}

export default UserIcon
