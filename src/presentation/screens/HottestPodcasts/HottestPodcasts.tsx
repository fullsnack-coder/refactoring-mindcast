import { useAppTheme } from '@application/hooks'
import { useAppSelector } from '@application/hooks/store'
import {
  DiscoverStackParamList,
  HomeTabsParamList,
} from '@application/navigation/AppHome'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import PodcastListItem from '@system/molecules/PodcastListItem'
import Ribbon from '@system/molecules/Ribbon'

import { FlatList, Pressable, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { Text } = Typography

type Props = CompositeScreenProps<
  NativeStackScreenProps<DiscoverStackParamList, 'hottest-podcasts'>,
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabsParamList>,
    NativeStackScreenProps<AppStackParamList>
  >
>

const HottestsPodcastsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useAppTheme()
  const hottestPodcasts = useAppSelector(
    state => state.podcasts.hottestPodcasts,
  )

  return (
    <SafeAreaView style={styles.container}>
      <Box flex={1}>
        <Ribbon
          title="Hottests Podcasts"
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              color={colors.primaryText}
              name="arrow-left"
              size="md"
              style={{ paddingLeft: 16 }}
            />
          }
        />
        <FlatList
          data={hottestPodcasts}
          contentContainerStyle={[styles.itemsWrapper]}
          ItemSeparatorComponent={() => <Separator y={10} />}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('podcast-details', {
                  podcastId: item.id,
                })
              }>
              <PodcastListItem
                podcast={item}
                renderRightElement={
                  <Pressable
                    hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
                    onPress={() => {
                      console.log(
                        'go to player to play the most recent episode',
                      )
                    }}>
                    <Box justifyContent="center" alignItems="center" px="sm">
                      <Icon
                        color={colors.primaryText}
                        size="md"
                        name="headphones"
                      />
                    </Box>
                  </Pressable>
                }
                renderLeftItem={
                  <Box justifyContent="center" mr="sm">
                    <Text color="primaryText">{index + 1}</Text>
                  </Box>
                }
              />
            </Pressable>
          )}
        />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsWrapper: {
    paddingTop: 12,
    paddingBottom: 22,
  },
})

export default HottestsPodcastsScreen
