import Icon, { IconProps } from "./Icon";

function CodeIcon({borderColor, width, height}: IconProps): JSX.Element {
  return (
    <Icon width={width} height={height} originalHeight={24} originalWidth={24}>
      <path d="M15 7L20 12L15 17M9 17L4 12L9 7" stroke={borderColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Icon>
  )
}

export default CodeIcon