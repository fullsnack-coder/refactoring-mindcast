import { useNotifications } from '@application/context/notifications'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import { AuthStackParamList } from '@application/navigation/Auth'
import { LoginStart, RegisterStart } from '@application/store/modules/auth'
import { getErrorMessage } from '@application/utils/tools'
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
import StepsPanelSlider, {
  SliderHandle,
} from '@system/organisms/StepsPanelSlider'

import { useCallback, useRef } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Navigation = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'auth-forms'>,
  NativeStackNavigationProp<AppStackParamList>
>

const { Heading } = Typography

const AuthScreen: React.FC = () => {
  const { navigate } = useNavigation<Navigation>()
  const notification = useNotifications()
  const panelSliderRef = useRef<SliderHandle>(null)

  const { authStatus } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const showFormError = useCallback(
    (error?: Error) => {
      console.log({ error })
      notification.showNotification({
        type: 'error',
        content: getErrorMessage(error?.message),
      })
    },
    [notification],
  )

  const handleSubmitLogin = useCallback(
    values => {
      dispatch(
        LoginStart(
          values,
          () =>
            navigate('home', {
              screen: 'home-discover',
              params: {
                screen: 'discover',
              },
            }),
          showFormError,
        ),
      )
    },
    [dispatch, navigate, showFormError],
  )

  const handleSubmitRegister = useCallback(
    values => {
      dispatch(
        RegisterStart(values, () => navigate('interests'), showFormError),
      )
    },
    [dispatch, navigate, showFormError],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <Box p="sm" justifyContent="space-between" bg="primaryText" flex={1}>
          <Box justifyContent="center" flex={1} minHeight={200}>
            <Heading color="primaryBackground" textAlign="center">
              MIND<Heading color="primary">CAST</Heading>
            </Heading>
            <Heading
              color="primaryBackground"
              textAlign="center"
              variant="title">
              A new way to boost your knowledge
            </Heading>
          </Box>
          <StepsPanelSlider ref={panelSliderRef} scrollEnabled={false}>
            <Box flex={1}>
              <LoginForm
                isSubmittingForm={authStatus === 'started'}
                onRegisterTap={() => panelSliderRef.current?.nextStep()}
                onSubmitForm={handleSubmitLogin}
              />
              <Box pt="lg" flex={1} justifyContent="flex-end" pb="xl">
                <Box
                  mb="xl"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center">
                  <Box bg="secondaryBackground" width={60} height={2} mr="md" />
                  <Heading color="primary" fontSize={22} textAlign="center">
                    OR
                  </Heading>
                  <Box bg="secondaryBackground" width={60} height={2} ml="md" />
                </Box>
                <Box>
                  <SocialButton
                    text="Login with"
                    socialNetwork="facebook"
                    fullWidth
                  />
                  <Separator y={12} />
                  <SocialButton
                    text="Login with"
                    socialNetwork="google"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
            <Box flex={1}>
              <RegisterForm
                onLoginTap={() => panelSliderRef.current?.prevStep()}
                onSubmitForm={handleSubmitRegister}
                isSubmittingForm={authStatus === 'started'}
              />
              <Box pt="lg" flex={1} justifyContent="flex-end" pb="xl">
                <Box
                  mb="xl"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center">
                  <Box bg="secondaryBackground" width={60} height={2} mr="md" />
                  <Heading color="primary" fontSize={22} textAlign="center">
                    OR
                  </Heading>
                  <Box bg="secondaryBackground" width={60} height={2} ml="md" />
                </Box>
                <Box>
                  <SocialButton
                    text="Register with"
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
            </Box>
          </StepsPanelSlider>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AuthScreen
