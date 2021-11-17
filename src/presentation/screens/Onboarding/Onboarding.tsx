import { useAppTheme } from '@application/hooks'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import OnboardingSlider from '@presentation/containers/OnboardingSlider'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { StatusBar } from 'react-native'

type Navigation = NativeStackNavigationProp<AppStackParamList, 'onboarding'>

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>()
  const { colors } = useAppTheme()
  return (
    <>
      <StatusBar backgroundColor={colors.primaryBackground} translucent />
      <OnboardingSlider onComplete={() => navigation.navigate('auth')} />
    </>
  )
}

export default OnboardingScreen
