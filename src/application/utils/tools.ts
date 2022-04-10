import { PressableProps } from 'react-native'
import RNFS from 'react-native-fs'

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
