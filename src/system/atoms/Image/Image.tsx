import FastImage, { FastImageProps, Source } from 'react-native-fast-image'

type ImagePriority = 'low' | 'normal' | 'high'

export type Props = {
  sourceUri?: string
  height?: string | number
  width?: string | number
  priority?: ImagePriority
  customSource?: FastImageProps['source']
} & Omit<FastImageProps, 'source'>

const Image: React.FC<Props> = ({
  customSource = {},
  height = 100,
  width = 100,
  style,
  priority = 'normal',
  resizeMode = FastImage.resizeMode.cover,
  sourceUri,
  ...rest
}) => {
  const sourceOptions: FastImageProps['source'] = {
    priority: FastImage.priority[priority],
    uri: sourceUri,
    ...(customSource as Source),
  }

  return (
    <FastImage
      source={sourceOptions}
      style={[{ height, width }, style]}
      resizeMode={resizeMode}
      {...rest}
    />
  )
}

export default Image
