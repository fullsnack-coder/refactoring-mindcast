import { useNavigation } from '@react-navigation/native'
import { Button, Dimensions, FlatList, Text, View } from 'react-native'

const { width, height } = Dimensions.get('window')
const StepScreen: React.FC<{ text: string }> = ({ text }) => {
  return (
    <View
      style={{
        height,
        width,
      }}>
      <Text>{text}</Text>
    </View>
  )
}

const onboardingSteps = [
  {
    name: 'stepone',
    component: <StepScreen text="step 1" />,
  },
  { name: 'steptwo', component: <StepScreen text="step two" /> },
]

const Onboarding: React.FC = () => {
  const navigation = useNavigation()

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
      />
      <Button
        onPress={() => {
          navigation.navigate('auth' as never)
        }}
        title="auth"
      />
    </View>
  )
}

export default Onboarding
