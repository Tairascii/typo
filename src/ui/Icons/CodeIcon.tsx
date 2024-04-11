import Icon, { IconProps } from './Icon'

function CodeIcon({ borderColor, width, height }: IconProps): JSX.Element {
  return (
    <Icon width={width} height={height} originalHeight={24} originalWidth={24}>
      <path
        d='M15 7L20 12L15 17M9 17L4 12L9 7'
        stroke={borderColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}

export default CodeIcon
