import { useAppTheme } from '@application/hooks'
import Box, { BoxProps } from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import { Pressable, StyleSheet } from 'react-native'

const { Text } = Typography

type Props = {
  title: string
  renderRight?: JSX.Element | null
  renderLeft?: JSX.Element | null
  onPressRightButton?: () => void
  onPressLeftButton?: () => void
  containerProps?: BoxProps
}

const Ribbon: React.FC<Props> = ({
  containerProps,
  title,
  onPressLeftButton,
  onPressRightButton,
  renderLeft,
  renderRight,
}) => {
  const { textSize } = useAppTheme()
  return (
    <Box
      alignItems="center"
      flexDirection="row"
      bg="primaryBackground"
      elevation={1}
      height={58}
      position="relative"
      width="100%"
      {...containerProps}>
      {renderLeft ? (
        <Pressable
          hitSlop={{ bottom: 10, left: 10, top: 10, right: 10 }}
          onPress={onPressLeftButton}
          style={styles.buttonLeft}>
          {renderLeft}
        </Pressable>
      ) : null}
      <Box flex={1} flexDirection="row" justifyContent="center">
        <Text
          color="primaryText"
          textAlign="center"
          fontFamily="CircularStd-Bold"
          fontSize={textSize.md}
          fontWeight="600"
          numberOfLines={1}
          style={{
            maxWidth: '70%',
          }}>
          {title}
        </Text>
      </Box>
      {renderRight ? (
        <Pressable
          hitSlop={{ bottom: 10, top: 10, left: 10, right: 10 }}
          onPress={onPressRightButton}
          style={styles.buttonRight}>
          {renderRight}
        </Pressable>
      ) : null}
    </Box>
  )
}

const styles = StyleSheet.create({
  buttonLeft: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    zIndex: 9,
  },
  buttonRight: {
    zIndex: 9,
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})

export default Ribbon
