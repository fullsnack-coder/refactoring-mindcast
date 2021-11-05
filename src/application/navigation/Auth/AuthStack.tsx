import { useNavigation } from '@react-navigation/native'
import { Button, Text, View } from 'react-native'

const AuthStack: React.FC = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>Auth</Text>
      <Button
        title="home"
        onPress={() => navigation.navigate('home' as never)}
      />
    </View>
  )
}

export default AuthStack
