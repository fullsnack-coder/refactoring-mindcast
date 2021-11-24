import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'

import { StatusBar } from 'react-native'

const { Text } = Typography

const YourInterestsScreen: React.FC = () => {
  const { colors } = useAppTheme()
  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg="primaryBackground">
      <StatusBar translucent backgroundColor={colors.primaryBackground} />
      <Text>Hello from your interests screen</Text>
    </Box>
  )
}

export default YourInterestsScreen
