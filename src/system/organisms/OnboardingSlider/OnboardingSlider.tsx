import Box from '@system/atoms/Box'
import ButtonWithIcon from '@system/molecules/ButtonWithIcon'
import { FlatList, View } from 'react-native'

import OnboardingStep from './Step'

const onboardingSteps = [
  {
    name: 'stepone',
    component: <OnboardingStep text="step 1" />,
  },
  { name: 'steptwo', component: <OnboardingStep text="step two" /> },
]

type Props = {
  onComplete: () => void
  onSkip?: () => void
}

const OnboardingSlider: React.FC<Props> = ({ onComplete }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={onboardingSteps}
        keyExtractor={({ name }) => name}
        horizontal
        pagingEnabled
        renderItem={({ item: { component } }) => component}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      />
      <Box
        flexDirection="row"
        justifyContent="center"
        bg="primaryBackground"
        p="md">
        <Box>
          <ButtonWithIcon
            onPress={onComplete}
            text="Go to auth"
            leftIconName="login"
            type="primary"
          />
        </Box>
      </Box>
    </View>
  )
}

export default OnboardingSlider
