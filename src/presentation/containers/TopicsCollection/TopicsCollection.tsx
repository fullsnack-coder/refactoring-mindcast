import { useAppTheme } from '@application/hooks'
import useTopics from '@application/hooks/useTopics'
import { Topic } from '@application/types'
import Box from '@system/atoms/Box'
import Separator from '@system/atoms/Separator'
import MessageScreen from '@system/molecules/MessageScreen'
import PressableTextWithOverlay, {
  RenderContentType,
} from '@system/molecules/PressableTextWithOverlay'
import { Theme } from '@system/theme'
import { useCallback } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

const getContentTopicButton =
  (item: Topic, fontColor?: keyof Theme['colors']): RenderContentType =>
  () => ({ text: item.title, color: fontColor })

type Props = {
  onTapTopic?: (topicTapped: Topic) => void
}

const TopicsCollection: React.FC<Props> = ({ onTapTopic }) => {
  const { isLoading, topics } = useTopics()
  const { colors } = useAppTheme()

  const handlePressTopic = useCallback(
    (topic: Topic) => () => {
      onTapTopic?.(topic)
    },
    [onTapTopic],
  )

  if (isLoading)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <ActivityIndicator color={colors.primary} size="large" />
      </Box>
    )

  return (
    <FlatList
      data={topics}
      numColumns={2}
      keyExtractor={({ id }) => id}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
        <Box pt="xxl" alignItems="center" justifyContent="center">
          <MessageScreen message="There is no topics at this moment" />
        </Box>
      }
      ItemSeparatorComponent={() => <Separator y={10} />}
      renderItem={({ item }) => (
        <PressableTextWithOverlay
          containerProps={{
            borderRadius: 'sm',
            aspectRatio: 1 / 1,
            width: '100%',
          }}
          overlaySource={item.coverUrl}
          pressableProps={{
            style: { width: '48%' },
            onPress: handlePressTopic(item),
          }}
          renderContent={getContentTopicButton(item, 'buttonTextPrimary')}
        />
      )}
    />
  )
}

export default TopicsCollection
