import { useAppTheme } from '@application/hooks'
import Button, { ButtonProps } from '@system/atoms/Button'
import Icon from '@system/atoms/Icon'

type Props = {
  socialNetwork: 'facebook' | 'google'
} & ButtonProps

const SocialButton: React.FC<Props> = ({ socialNetwork, ...rest }) => {
  const { colors } = useAppTheme()

  return (
    <Button
      contentProps={{
        bg: socialNetwork === 'google' ? 'googlePlus' : 'facebook',
      }}
      endIcon={
        socialNetwork === 'google' ? (
          <Icon size="md" name="google-plus" color={colors.primaryBackground} />
        ) : (
          <Icon name="facebook" size="md" color={colors.primaryBackground} />
        )
      }
      size="md"
      type="primary"
      {...rest}
    />
  )
}

export default SocialButton
