import Box, { BoxProps } from '@system/atoms/Box'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Modal as RNModal, ModalProps, Pressable } from 'react-native'

type HiddenNativeProps = 'onDismiss' | 'onShow' | 'visible' | 'children'

export type Props = {
  containerProps?: BoxProps
  dismissable?: boolean
  onBackgroundPress?: () => void
  onClose?: () => void
  onShow?: () => void
  position?: 'top' | 'bottom' | 'center'
  children: React.ReactNode | ((api: HandleRef) => React.ReactNode)
} & Omit<ModalProps, HiddenNativeProps>

export type HandleRef = {
  isVisible: boolean
  hide: () => void
  show: () => void
}

const Modal = forwardRef<HandleRef, Props>(
  (
    {
      children,
      containerProps,
      dismissable = false,
      onBackgroundPress,
      onClose,
      onShow,
      position = 'center',
      ...rest
    },
    refProp,
  ) => {
    const [modalIsVisible, setModalIsVisible] = useState(false)

    useImperativeHandle(refProp, () => ({
      isVisible: modalIsVisible,
      show: () => {
        setModalIsVisible(true)
        onShow?.()
      },
      hide: () => {
        setModalIsVisible(false)
        onClose?.()
      },
    }))

    const handleBackgroundPress = useCallback(() => {
      if (dismissable) {
        setModalIsVisible(false)
        onBackgroundPress?.()
      }
    }, [dismissable, onBackgroundPress])

    return (
      <RNModal
        animationType="fade"
        transparent
        visible={modalIsVisible}
        {...rest}>
        <Pressable style={{ flex: 1 }} onPress={handleBackgroundPress}>
          <Box
            flex={1}
            bg="darkOverlay"
            flexDirection="column"
            justifyContent={
              position === 'bottom'
                ? 'flex-end'
                : position === 'center'
                ? 'center'
                : 'flex-start'
            }>
            <Box {...containerProps}>
              {typeof children === 'function'
                ? children({
                    isVisible: modalIsVisible,
                    hide: () => setModalIsVisible(false),
                    show: () => setModalIsVisible(true),
                  })
                : children}
            </Box>
          </Box>
        </Pressable>
      </RNModal>
    )
  },
)

export default Modal
