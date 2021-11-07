import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'

type VectorIconProps = React.ComponentProps<typeof VectorIcon>

export type Props = {
  size?: 'sm' | 'md'
} & Omit<VectorIconProps, 'size'>

const Icon: React.FC<Props> = ({ size = 'sm', ...rest }) => {
  return <VectorIcon size={size === 'sm' ? 14 : 22} {...rest} />
}

export default Icon
