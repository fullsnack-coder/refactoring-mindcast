import { TextProps as RestyleTextProps, createText } from '@shopify/restyle'
import { Theme } from '@system/theme'

import { TextProps as RNTextProps } from 'react-native'

const BaseText = createText<Theme>()

type TextProps = RestyleTextProps<Theme> & RNTextProps

const Text: React.FC<TextProps> = props => (
  <BaseText color="primaryText" variant="paragraph" {...props} />
)

const Heading: React.FC<TextProps> = props => (
  <BaseText color="primaryText" variant="heading" {...props} />
)

const Link: React.FC<TextProps> = props => (
  <BaseText color="primary" variant="paragraph" {...props} />
)

const Typography = () => null

Typography.Heading = Heading
Typography.Text = Text
Typography.Link = Link

export default Typography
