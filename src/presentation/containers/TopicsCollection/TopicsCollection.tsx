import useTopics from '@application/hooks/useTopics'
import { Topic } from '@application/types'
import Separator from '@system/atoms/Separator'
import PressableTextWithOverlay, {
  RenderContentType,
} from '@system/molecules/PressableTextWithOverlay'
import { useCallback } from 'react'
import { FlatList } from 'react-native'

const getContentTopicButton =
  (item: Topic): RenderContentType =>
  () => ({ text: item.title })

type Props = {
  onTapTopic?: (topicTapped: Topic) => void
}

const TopicsCollection: React.FC<Props> = ({ onTapTopic }) => {
  const { error, isLoading, topics } = useTopics()

  const handlePressTopic = useCallback(
    (topic: Topic) => () => {
      onTapTopic?.(topic)
    },
    [onTapTopic],
  )

  if (isLoading || error) return null

  return (
    <FlatList
      data={topics}
      numColumns={2}
      keyExtractor={({ id }) => id}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
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
          renderContent={getContentTopicButton(item)}
        />
      )}
    />
  )
}

export default TopicsCollection
