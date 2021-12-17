import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import TrackPlayer, {
  Track,
  usePlaybackState,
  State as PlaybackState,
  Capability,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player'

type PlayerStatus = 'playing' | 'paused' | 'stopped'

type AudioPlayerContextType = {
  actions: {
    play: () => void
    pause: () => void
    stop: () => void
    addTracks: (track: Track[]) => void
  }
  audioplayerStatus: PlayerStatus
  currentTrack: Track | null
  isInitialized: boolean
  infoPosition: {
    current: number
    isLast: boolean
    isFirst: boolean
  }
  tracks: Track[]
}

const AudioPlayerContext = createContext({} as AudioPlayerContextType)

export const useAudioPlayerContext = () => useContext(AudioPlayerContext)

export const AudioPlayerProvider: React.FC = ({ children }) => {
  const playbackState = usePlaybackState()
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [tracks, setTracks] = useState<Track[]>([])
  const [infoPosition, setInfoPosition] = useState<
    AudioPlayerContextType['infoPosition']
  >({
    current: 0,
    isLast: false,
    isFirst: false,
  })

  const actions = {
    play: () => TrackPlayer.play(),
    pause: () => TrackPlayer.pause(),
    stop: () => TrackPlayer.stop(),
    addTracks: (tracks: Track[]) => TrackPlayer.add(tracks),
  }

  const audioplayerStatus: PlayerStatus = useMemo(() => {
    if (playbackState === PlaybackState.Playing) {
      return 'playing'
    }
    if (playbackState === PlaybackState.Paused) {
      return 'paused'
    }
    return 'stopped'
  }, [playbackState])

  useTrackPlayerEvents([Event.PlaybackTrackChanged], ({ type, nextTrack }) => {
    if (type === Event.PlaybackTrackChanged) {
      TrackPlayer.getQueue().then(tracks => {
        const isLast = nextTrack === tracks.length - 1
        const isFirst = nextTrack === 0
        setCurrentTrack(tracks[nextTrack])
        setTracks(tracks)
        setInfoPosition({
          current: nextTrack,
          isLast,
          isFirst,
        })
      })
    }
  })

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      }).then(() => {
        setIsInitialized(true)
      })
    })
  }, [])

  return (
    <AudioPlayerContext.Provider
      value={{
        audioplayerStatus,
        actions,
        currentTrack,
        tracks,
        isInitialized,
        infoPosition,
      }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerContext
