import { Author, Episode } from '@application/types'
import { PressableProps } from 'react-native'
import RNFS from 'react-native-fs'
import { Track } from 'react-native-track-player'

export const getTime = (time: number) => {
  return {
    seconds: `00${Math.floor(time % 60)}`.slice(-2),
    minutes: `00${Math.floor(time / 60)}`.slice(-2),
  }
}

export const fileManager = () => ({
  deleteFile: async (filePath: string) => {
    const url = `${RNFS.DocumentDirectoryPath}/${filePath}`
    await RNFS.unlink(url)
  },
})

export const getHitSlop = (): PressableProps['hitSlop'] => ({
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
})

// just for test purposes (use only in debug mode)
export const sleep = <TResponse = any>(time = 100, response?: TResponse) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(response), time)
  })
}

export const getTrackFromEpisodeInfo = (
  episode: Episode,
  author: Author,
  podcastTitle: string,
): Track => {
  return {
    ...episode,
    album: podcastTitle,
    title: episode.title,
    url: episode.url,
    artist: author.firstName,
    duration: episode.duration,
    artwork: episode.coverUrl,
  }
}

export const getErrorMessage = (response?: string): string => {
  if (
    response?.includes('auth/wrong-password') ||
    response?.includes('auth/user-not-found')
  )
    return 'Incorrect user or password'
  if (response?.includes('auth/email-already-in-use'))
    return 'Email already in use'
  if (response?.includes("password doesn't match"))
    return 'Both passwords must be equal'
  return 'Something went wrong'
}
