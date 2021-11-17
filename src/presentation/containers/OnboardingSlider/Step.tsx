import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import Typography from '@system/atoms/Typography'

type Props = {
  title: string
  iconName: string
  description: string
}

const { Heading, Text } = Typography

const OnboardingStep: React.FC<Props> = ({ title, iconName, description }) => {
  const { colors } = useAppTheme()
  return (
    <Box
      bg="primaryBackground"
      p="sm"
      alignItems="center"
      justifyContent="center"
      flex={1}>
      <Box
        borderColor="primary"
        borderRadius="xxl"
        borderWidth={2}
        alignItems="center"
        justifyContent="center"
        width={120}
        height={120}>
        <Icon color={colors.primary} size="lg" name={iconName} />
      </Box>
      <Separator y={12} />
      <Heading>{title.toUpperCase()}</Heading>
      <Separator y={12} />
      <Text color="secondaryText" textAlign="center">
        {description}
      </Text>
    </Box>
  )
}

export default OnboardingStep
