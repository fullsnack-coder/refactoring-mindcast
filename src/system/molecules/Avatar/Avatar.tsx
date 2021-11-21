import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Image, { ImageProps } from '@system/atoms/Image'
import Typography from '@system/atoms/Typography'
import { useState } from 'react'

type AvatarSize = 'small' | 'default'

type Props = {
  avatarUri?: string
  name?: string
  size?: AvatarSize
} & Omit<ImageProps, 'sourceUri'>

const { Text } = Typography

const Avatar: React.FC<Props> = ({
  avatarUri = '',
  name = '',
  size = 'default',
  ...rest
}) => {
  const [showName, setShownName] = useState(!avatarUri)
  const { colors } = useAppTheme()
  const [nameInitial] = name
  const isDefaultSize = size === 'default'

  return (
    <>
      {showName || !avatarUri ? (
        <Box
          bg="secondaryBackground"
          borderRadius="xxl"
          alignItems="center"
          justifyContent="center"
          height={isDefaultSize ? 80 : 50}
          width={isDefaultSize ? 80 : 50}>
          {!!name ? (
            <Text color="secondaryText" fontSize={32}>
              {nameInitial.toUpperCase()}
            </Text>
          ) : (
            <Icon name="account" size="lg" color={colors.secondaryText} />
          )}
        </Box>
      ) : (
        <Image
          width={isDefaultSize ? 80 : 50}
          height={isDefaultSize ? 80 : 50}
          onError={() => setShownName(true)}
          style={{ borderRadius: 999 }}
          sourceUri={avatarUri}
          {...rest}
        />
      )}
    </>
  )
}

export default Avatar
