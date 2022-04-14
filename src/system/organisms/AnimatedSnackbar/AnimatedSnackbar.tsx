import Snackbar, { SnackbarProps } from '@system/molecules/Snackbar'
import { memo, useEffect, useRef } from 'react'
import { Animated } from 'react-native'

type Props = {
  durationInMilliseconds?: number
  onAppear?: () => void
  onDismiss?: () => void
} & SnackbarProps

const AnimatedSnackbar: React.FC<Props> = memo(
  ({ onAppear, onDismiss, durationInMilliseconds = 300, ...rest }) => {
    const animatedValue = useRef(new Animated.Value(0)).current

    const animatedStyle = {
      opacity: animatedValue,
      transform: [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.95, 1],
          }),
        },
      ],
    }

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          onAppear?.()
          Animated.delay(durationInMilliseconds).start(({ finished }) => {
            if (finished) {
              Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start(({ finished }) => {
                if (finished) onDismiss?.()
              })
            }
          })
        }
      })
    }, [durationInMilliseconds, onDismiss, onAppear])

    return (
      <Animated.View style={[animatedStyle]}>
        <Snackbar {...rest} />
      </Animated.View>
    )
  },
)

export default AnimatedSnackbar
