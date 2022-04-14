import Box, { BoxProps } from '@system/atoms/Box'

type Props = BoxProps

const StepPanel: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Box flexGrow={1} {...rest}>
      {children}
    </Box>
  )
}

export default StepPanel
