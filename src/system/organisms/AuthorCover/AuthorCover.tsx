import { PLACEHOLDER_AVATAR_URI } from '@application/constants'
import { useAppTheme } from '@application/hooks'
import Box, { BoxProps } from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Typography from '@system/atoms/Typography'
import { Dimensions, StyleSheet } from 'react-native'
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient'

const { Heading } = Typography

type Props = {
  avatar: string
  containerProps?: BoxProps
  gradientProps?: LinearGradientProps
  name: string
}

const AuthorCover: React.FC<Props> = ({
  name,
  avatar,
  containerProps,
  gradientProps,
}) => {
  const { colors, spacing } = useAppTheme()

  return (
    <Box
      position="relative"
      height={Dimensions.get('window').height * 0.3}
      width="100%"
      flexDirection="column"
      justifyContent="flex-end"
      bg="darkOverlay"
      {...containerProps}>
      <Image
        sourceUri={avatar || PLACEHOLDER_AVATAR_URI}
        style={styles.imageCover}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[colors.darkOverlay, colors.primaryBackground]}
        style={[
          styles.linearGradient,
          { paddingBottom: spacing.md, paddingLeft: spacing.md },
        ]}
        {...gradientProps}>
        <Heading color="primaryText" variant="subheading">
          {name}
        </Heading>
      </LinearGradient>
    </Box>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
  },
  imageCover: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
})

export default AuthorCover
