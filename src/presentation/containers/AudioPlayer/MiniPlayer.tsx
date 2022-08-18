import { useAudioPlayerContext } from '@application/context/audioPlayer'
import { useAppTheme } from '@application/hooks'
import { useNavigation, StackActions } from '@react-navigation/native'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import { useCallback } from 'react'
import { Pressable, PressableProps } from 'react-native'

const { Text } = Typography

const MiniPlayer: React.FC<PressableProps> = props => {
  const { progress, currentTrack, actions, audioplayerStatus, infoPosition } =
    useAudioPlayerContext()
  const { borderRadii, colors } = useAppTheme()
  const { artist, artwork, title } = currentTrack || {}
  const { isLast } = infoPosition || {}
  const navigation = useNavigation()

  const isPlaying = audioplayerStatus === 'playing'

  const handlePressMiniPlayer = useCallback(() => {
    navigation.dispatch(StackActions.push('player'))
  }, [navigation])

  if (!currentTrack) return null

  return (
    <Pressable onPress={handlePressMiniPlayer} {...props}>
      <Box width="100%" bg="secondaryBackground" height={2}>
        <Box
          width={`${Math.floor(
            (progress.position * 100) / progress.duration,
          )}%`}
          height="100%"
          bg="primary"
        />
      </Box>
      <Box alignItems="center" bg="secondaryBackground" flexDirection="row">
        <Image
          sourceUri={artwork as string}
          style={{ borderRadius: borderRadii.xs }}
          height={70}
          width={70}
        />
        <Box flex={1} px="md" justifyContent="center">
          <Text color="primaryText" fontWeight="600">
            {title}
          </Text>
          <Text color="primaryTextTransparent">{artist}</Text>
        </Box>
        <Box px="md" flexDirection="row">
          <Pressable onPress={isPlaying ? actions.pause : actions.play}>
            <Box p="sm" borderRadius="xxl" bg="primaryText">
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                size="md"
                color={colors.primaryBackground}
              />
            </Box>
          </Pressable>
          {!isLast ? (
            <>
              <Separator x={6} />
              <Pressable
                onPress={actions.goToNext}
                hitSlop={{
                  bottom: 10,
                  left: 10,
                  right: 10,
                  top: 10,
                }}>
                <Box p="sm">
                  <Icon name="skip-next" size="md" color={colors.primaryText} />
                </Box>
              </Pressable>
            </>
          ) : null}
          <>
            <Separator x={6} />
            <Pressable
              hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
              onPress={actions.stop}>
              <Box p="sm">
                <Icon name="close" size="md" color={colors.primaryText} />
              </Box>
            </Pressable>
          </>
        </Box>
      </Box>
    </Pressable>
  )
}

export default MiniPlayer
