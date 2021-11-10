import { AppStackParamList } from '@application/navigation/AppNavigator'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button, Text, View } from 'react-native'

type Navigation = NativeStackNavigationProp<AppStackParamList, 'auth'>

const AuthStack: React.FC = () => {
  const navigation = useNavigation<Navigation>()
  return (
    <View>
      <Text>Auth</Text>
      <Button title="home" onPress={() => navigation.navigate('home')} />
    </View>
  )
}

export default AuthStack
