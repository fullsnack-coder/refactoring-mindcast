import { AppStackParamList } from '@application/navigation/AppNavigator'
import OnboardingScreen from '@presentation/screens/Onboarding'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = {} & NativeStackScreenProps<AppStackParamList, 'onboarding'>

const Onboarding: React.FC<Props> = () => {
  return <OnboardingScreen />
}

export default Onboarding
