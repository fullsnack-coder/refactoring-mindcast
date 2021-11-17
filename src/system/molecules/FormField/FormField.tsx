import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import { Controller, ControllerProps } from 'react-hook-form'

type Props = {
  error?: string
  control?: any
} & Omit<ControllerProps, 'control'>

const { Text } = Typography

const FormField: React.FC<Props> = ({ error, ...rest }) => {
  return (
    <Box>
      <Controller {...rest} />
      {error ? (
        <Text color="primary" fontSize={14} p="xs">
          {error}
        </Text>
      ) : null}
    </Box>
  )
}

export default FormField
