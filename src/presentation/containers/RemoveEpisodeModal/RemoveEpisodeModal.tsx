import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'
import Modal, {
  ModalProps,
  ModalRef as BaseModalRef,
} from '@system/molecules/Modal'
import { forwardRef } from 'react'

const { Heading, Text } = Typography

export type ModalRef = BaseModalRef

type Props = Omit<ModalProps, 'children'> & {
  onRemove: () => void
}

const RemoveEpisodeModal = forwardRef<ModalRef, Props>(
  ({ onRemove, ...rest }, innerRef) => {
    const { textSize } = useAppTheme()

    return (
      <Modal ref={innerRef} {...rest}>
        {({ hide }) => (
          <Box borderRadius="sm" bg="primaryBackground" p="md" mx="md">
            <Heading variant="subheading" color="primaryText">
              Remove Episode
            </Heading>
            <Separator y={12} />
            <Text color="secondaryText">
              Are you sure you want to remove this episode from your library?
            </Text>
            <Separator y={16} />
            <Box flexDirection="row" justifyContent="flex-end">
              <Button text="CANCEL" onPress={hide} />
              <Separator x={12} />
              <Button
                text="REMOVE"
                type="primary"
                onPress={() => {
                  hide()
                  onRemove()
                }}
              />
            </Box>
          </Box>
        )}
      </Modal>
    )
  },
)

export default RemoveEpisodeModal
