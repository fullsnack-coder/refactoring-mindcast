import { AppStackParamList } from '@application/navigation/AppNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Typography from '@system/atoms/Typography'

type Props = {} & NativeStackScreenProps<AppStackParamList, 'about'>

const { Text } = Typography

const AboutScreen: React.FC<Props> = ({ navigation }) => (
  <Box>
    <Text>Hello from about screen</Text>
    <Button
      text="Go to search"
      onPress={() =>
        navigation.navigate('home', {
          screen: 'home-search',
          params: { screen: 'search' },
        })
      }
    />
  </Box>
)

export default AboutScreen
