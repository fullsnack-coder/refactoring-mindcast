import { PermissionsAndroid } from 'react-native'
import RNFS from 'react-native-fs'

type Headers = { [key: string]: string }
type DownloadOptions = {
  fileNameWithExtension: string
  url: string
  extraHeaders?: Headers
  onProgress?: (progress: number) => void
}

type InitializationOptions = {
  headers?: Headers
  progressInterval?: number
  progressSteps?: number
}

class Download {
  private downloadDirectory: string
  private downloadHeaders?: Headers
  private progressInterval?: number
  private progressSteps?: number

  constructor({
    headers,
    progressInterval = 100,
    progressSteps = 30,
  }: InitializationOptions) {
    this.downloadDirectory = RNFS.DocumentDirectoryPath
    this.downloadHeaders = headers
    this.progressInterval = progressInterval
    this.progressSteps = progressSteps
  }

  downloadFile = async ({
    extraHeaders = {},
    fileNameWithExtension,
    onProgress,
    url,
  }: DownloadOptions) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const downloadPath = `file://${this.downloadDirectory}/${fileNameWithExtension}`
        const { promise: downloadPromise } = RNFS.downloadFile({
          background: true,
          fromUrl: url,
          toFile: downloadPath,
          headers: { ...this.downloadHeaders, ...extraHeaders },
          cacheable: true,
          progressInterval: this.progressInterval,
          progressDivider: this.progressSteps,
          progress: ({ bytesWritten, contentLength }) => {
            const progressNumber = (bytesWritten / contentLength) * 100
            onProgress?.(Math.floor(progressNumber))
          },
        })

        const result = await downloadPromise
        if (`${result.statusCode}`.startsWith('4'))
          throw new Error('Something went wrong')

        return downloadPath
      }
      throw new Error('Permission denied')
    } catch (error) {}
  }
}

export default Download
