import Box from '@system/atoms/Box'

type Props = {
  x?: number
  y?: number
}

const Separator: React.FC<Props> = ({ x = 0, y = 0 }) => {
  return <Box width={x} height={y} />
}

export default Separator
