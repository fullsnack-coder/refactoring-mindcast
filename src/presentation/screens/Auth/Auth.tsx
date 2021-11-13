import { AppStackParamList } from '@application/navigation/AppNavigator'
import { AuthStackParamList } from '@application/navigation/Auth'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import SocialButton from '@system/molecules/SocialButton'
import LoginForm from '@system/organisms/LoginForm'
import RegisterForm from '@system/organisms/RegisterForm'
import { ImageBackground } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

type Navigation = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'auth-forms'>,
  NativeStackNavigationProp<AppStackParamList>
>

const { Heading, Text } = Typography

//TODO: implement here the components
const AuthScreen: React.FC = () => {
  const { navigate } = useNavigation<Navigation>()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        resizeMode="cover"
        source={{ uri: 'https://wallpaperaccess.com/full/388104.jpg' }}
        style={{ flex: 1 }}>
        <Box
          flex={1}
          p="sm"
          justifyContent="space-evenly"
          bg="primaryTextTransparent">
          <Box>
            <Heading color="primaryBackground" textAlign="center">
              MINDCAST
            </Heading>
            <Heading
              color="primaryBackground"
              textAlign="center"
              variant="title">
              A new way to boost your knowledge
            </Heading>
          </Box>
          <RegisterForm />
          <Box>
            <SocialButton
              text="Register with"
              onPress={() => navigate('interests')}
              socialNetwork="facebook"
              fullWidth
            />
            <Separator y={12} />
            <SocialButton
              text="Register with"
              socialNetwork="google"
              fullWidth
            />
          </Box>
        </Box>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default AuthScreen
