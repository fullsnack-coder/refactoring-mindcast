import { useAppTheme } from '@application/hooks'
import { useAppDispatch } from '@application/hooks/store'
import { playlistStartCreatePlaylist } from '@application/store/modules/playlists'
import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Separator from '@system/atoms/Separator'
import TextInput from '@system/atoms/TextInput'
import Typography from '@system/atoms/Typography'
import Modal, { ModalProps, ModalRef } from '@system/molecules/Modal'
import { forwardRef, useCallback, useState } from 'react'

const { Heading } = Typography
export type CreatePlaylistModalRef = ModalRef

type Props = {
  onCreatePlaylist?: (name?: string) => void
} & Omit<ModalProps, 'children'>

const CreatePlaylistModal = forwardRef<ModalRef, Props>(
  ({ onCreatePlaylist, ...rest }, propRef) => {
    const dispatch = useAppDispatch()
    const { colors, textSize } = useAppTheme()
    const [playlistName, setPlaylistName] = useState('') // TODO: implement ref to get value of the text input

    const handleCreatePlaylist = useCallback(
      closeModal => {
        dispatch(
          playlistStartCreatePlaylist({
            info: {
              name: playlistName,
              ownerId: '',
            },
            onSuccess: () => {
              closeModal()
              onCreatePlaylist?.(playlistName)
            },
          }),
        )
      },
      [onCreatePlaylist, dispatch, playlistName],
    )

    return (
      <Modal {...rest} ref={propRef}>
        {({ hide }) => (
          <Box borderRadius="sm" bg="secondaryBackground" p="md">
            <Heading fontSize={textSize.lg}>Create Playlist</Heading>
            <TextInput
              containerProps={{ px: undefined }}
              onChangeText={setPlaylistName}
              placeholder="Type the name of the playlist"
              style={{
                borderBottomColor: colors.primary,
                borderBottomWidth: 2,
              }}
            />
            <Separator y={12} />
            <Box flexDirection="row" justifyContent="flex-end">
              <Button text="CANCEL" onPress={hide} />
              <Separator x={12} />
              <Button
                text="CREATE"
                type="primary"
                onPress={() => handleCreatePlaylist(hide)}
              />
            </Box>
          </Box>
        )}
      </Modal>
    )
  },
)

export default CreatePlaylistModal
