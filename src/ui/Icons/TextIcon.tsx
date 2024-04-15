import Icon, { IconProps } from './Icon'

function TextIcon({ borderColor, width, height }: IconProps): JSX.Element {
  return (
    <Icon width={width} height={height} originalHeight={24} originalWidth={24}>
      <path
        d='M10 19H12M12 19H14M12 19V5M12 5H6V6M12 5H18V6'
        stroke={borderColor}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Icon>
  )
}

export default TextIcon
