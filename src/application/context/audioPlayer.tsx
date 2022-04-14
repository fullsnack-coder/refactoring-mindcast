import { addRecentlyEpisodesStart } from '@application/store/modules/episodes'
import { Author, Episode } from '@application/types'
import { getTrackFromEpisodeInfo } from '@application/utils/tools'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import TrackPlayer, {
  Track,
  usePlaybackState,
  State as PlaybackState,
  Capability,
  useTrackPlayerEvents,
  Event,
  useProgress,
} from 'react-native-track-player'
import { useDispatch } from 'react-redux'

type PlayerStatus = 'playing' | 'paused' | 'stopped'

type AudioPlayerContextType = {
  actions: {
    addTracks: (track: Track[]) => void
    goToPrevious: () => void
    goToNext: () => void
    play: () => void
    pause: () => void
    reset: () => void
    seekTo: (time: number) => void
    stop: () => void
    addEpisodes: (
      episodes: Episode[],
      author: Author,
      podcastTitle: string,
    ) => void
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
  progress: {
    duration: number
    position: number
  }
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

  const dispatch = useDispatch()

  const actions = {
    play: () => TrackPlayer.play(),
    pause: () => TrackPlayer.pause(),
    stop: () => TrackPlayer.stop(),
    addTracks: (tracks: Track[]) => TrackPlayer.add(tracks),
    seekTo: (time: number) => TrackPlayer.seekTo(time),
    reset: () => TrackPlayer.reset(),
    goToPrevious: () => TrackPlayer.skipToPrevious(),
    goToNext: () => TrackPlayer.skipToNext(),
    addEpisodes: (
      episodes: Episode[],
      author: Author,
      podcastTitle: string,
    ) => {
      const tracks = episodes.map(episode =>
        getTrackFromEpisodeInfo(episode, author, podcastTitle),
      )
      TrackPlayer.add(tracks)
      dispatch(addRecentlyEpisodesStart(episodes))
    },
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

  const { duration, position } = useProgress()

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
        progress: {
          duration,
          position,
        },
      }}>
      {children}
    </AudioPlayerContext.Provider>
  )
}

export default AudioPlayerContext
