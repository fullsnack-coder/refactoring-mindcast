import Box from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Typography from '@system/atoms/Typography'
import { Pressable, PressableProps } from 'react-native'

type Props = {
  interestCoverUrlImage: string
  name: string
  isActive?: boolean
} & PressableProps

const { Heading } = Typography

const InterestOption: React.FC<Props> = ({
  interestCoverUrlImage,
  isActive = false,
  name,
  ...rest
}) => {
  return (
    <Pressable {...rest}>
      <Box
        width="100%"
        height={150}
        position="relative"
        alignItems="center"
        borderRadius="sm"
        overflow="hidden"
        justifyContent="center">
        <Image
          sourceUri={interestCoverUrlImage}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <Box
          position="absolute"
          width="100%"
          height="100%"
          bg={isActive ? 'primaryTransparent' : 'primaryTextTransparent'}
        />
        <Heading color="buttonTextPrimary">{name}</Heading>
      </Box>
    </Pressable>
  )
}

export default InterestOption
