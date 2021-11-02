import { Button as RNButton, ButtonProps as RNButtonProps } from 'react-native'

type Props = {} & RNButtonProps

const Button: React.FC<Props> = props => <RNButton {...props} />

export default Button
