import { useNavigation } from '@react-navigation/native'
import Button from '@system/atoms/Button'
import { Text, View } from 'react-native'

const DiscoverScreen: React.FC = () => {
  const { navigate } = useNavigation()
  return (
    <View>
      <Text>From Discover Screen</Text>
      <Button
        title="new releases"
        onPress={() => {
          navigate('new-releases' as never)
        }}
      />
    </View>
  )
}

export default DiscoverScreen
