import { useAppTheme } from '@application/hooks'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import OnboardingSlider from '@presentation/containers/OnboardingSlider'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useCallback } from 'react'

import { StatusBar } from 'react-native'

type Navigation = NativeStackNavigationProp<AppStackParamList, 'onboarding'>

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<Navigation>()
  const { colors } = useAppTheme()

  const handleNavigate = useCallback(() => {
    navigation.navigate('auth')
  }, [navigation])

  return (
    <>
      <StatusBar
        backgroundColor={colors.primaryBackground}
        barStyle="dark-content"
        translucent
      />
      <OnboardingSlider onSkip={handleNavigate} onComplete={handleNavigate} />
    </>
  )
}

export default OnboardingScreen
