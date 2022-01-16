import { useAppTheme } from '@application/hooks'
import {
  HomeTabsParamList,
  LibraryStackParamList,
} from '@application/navigation/AppHome'
import { CompositeNavigationProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Ribbon from '@system/molecules/Ribbon'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import DownloadsCollection from '@presentation/containers/DownloadsCollection'
import { useCallback } from 'react'

type Props = {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<LibraryStackParamList, 'downloads'>,
    CompositeNavigationProp<
      BottomTabNavigationProp<HomeTabsParamList>,
      NativeStackNavigationProp<AppStackParamList>
    >
  >
}

const DownloadsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useAppTheme()

  const handleSelectEpisode = useCallback(
    ({ isPlaying }: { isPlaying: boolean }) => {
      if (isPlaying) navigation.navigate('player')
    },
    [navigation],
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Ribbon
        title="Downloads"
        onPressLeftButton={navigation.goBack}
        renderLeft={
          <Icon
            color={colors.primaryText}
            name="arrow-left"
            size="md"
            style={{ marginLeft: 16 }}
          />
        }
      />
      <Box flex={1} bg="primaryBackground">
        <DownloadsCollection onPlayEpisode={handleSelectEpisode} />
      </Box>
    </SafeAreaView>
  )
}

export default DownloadsScreen
