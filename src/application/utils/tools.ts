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
