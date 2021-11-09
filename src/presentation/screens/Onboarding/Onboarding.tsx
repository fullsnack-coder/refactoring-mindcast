import { useNavigation } from '@react-navigation/native'

import OnboardingSlider from '@system/organisms/OnboardingSlider'

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation()
  return (
    <OnboardingSlider onComplete={() => navigation.navigate('auth' as never)} />
  )
}

export default OnboardingScreen
