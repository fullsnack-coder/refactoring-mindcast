import { BoxProps as RestyleBoxProps, createBox } from '@shopify/restyle'
import { Theme } from '@system/theme'

export type BoxProps = {} & RestyleBoxProps<Theme>

const Box = createBox<Theme>()

export default Box
