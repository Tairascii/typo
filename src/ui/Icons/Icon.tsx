import { ReactNode } from "react"

interface ParentIconProps {
    borderColor?: string
    color?: string
    colorOpacity?: number
    width: number
    height: number
    originalHeight: number
    originalWidth: number
    children: ReactNode
}

export type IconProps = Omit<ParentIconProps, 'children' | 'originalHeight' | 'originalWidth'>

function Icon({ width, height, children, originalHeight, originalWidth }: ParentIconProps): JSX.Element {
    return <svg width={width} height={height} viewBox={`0 0 ${originalWidth} ${originalHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">{children}</svg>
}

export default Icon