import {
  DiscoverStackParamList,
  HomeTabsParamList,
} from '@application/navigation/AppHome'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import Button from '@system/atoms/Button'
import { Text, View } from 'react-native'

type Navigation = CompositeNavigationProp<
  NativeStackNavigationProp<DiscoverStackParamList, 'discover'>,
  BottomTabNavigationProp<HomeTabsParamList>
>

const DiscoverScreen: React.FC = () => {
  const { navigate } = useNavigation<Navigation>()
  return (
    <View>
      <Text>From Discover Screen</Text>
      <Button
        text="new releases"
        onPress={() => {
          navigate('new-releases')
        }}
      />
    </View>
  )
}

export default DiscoverScreen
