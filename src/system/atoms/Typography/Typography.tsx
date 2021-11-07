import { TextProps as RestyleTextProps, createText } from '@shopify/restyle'
import { Theme } from '@system/theme'

const BaseText = createText<Theme>()

type TextProps = RestyleTextProps<Theme>

const Text: React.FC<TextProps> = props => (
  <BaseText color="primaryText" variant="paragraph" {...props} />
)

const Heading: React.FC<TextProps> = props => (
  <BaseText color="primaryText" variant="heading" {...props} />
)

const Typography = () => null

Typography.Heading = Heading
Typography.Text = Text

export default Typography
