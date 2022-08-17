import PlaylistsScreen from '@presentation/screens/Playlists'
import PlaylistDetailsScreen from '@presentation/screens/PlaylistDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'
import { useThemeContext } from '@application/context/theme'

export type PlaylistStackParamList = {
  playlists: { renderAddPlaylistActionable?: boolean; podcastIdToAdd?: string }
  playlistDetails: { playlistId: string }
}

const Stack = createNativeStackNavigator<PlaylistStackParamList>()

const PlaylistStack: React.FC = () => {
  const {
    currentTheme: { colors },
  } = useThemeContext()
  return (
    <>
      <StatusBar backgroundColor={colors.secondaryBackground} />
      <Stack.Navigator
        initialRouteName="playlists"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="playlists" component={PlaylistsScreen} />
        <Stack.Screen
          name="playlistDetails"
          component={PlaylistDetailsScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </>
  )
}

export default PlaylistStack
