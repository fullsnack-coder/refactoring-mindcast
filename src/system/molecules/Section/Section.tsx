import { useAppTheme } from '@application/hooks'
import Box, { BoxProps } from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'

const { Heading } = Typography

export type Props = {
  title: string
  callToActionButton?: JSX.Element | null
} & BoxProps

const Section: React.FC<Props> = ({
  callToActionButton,
  title,
  children,
  ...rest
}) => {
  const { textSize } = useAppTheme()
  return (
    <Box {...rest}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        mb="sm"
        p="md">
        <Box>
          <Heading color="primaryText" fontSize={textSize.lg}>
            {title}
          </Heading>
          <Box bg="primary" mt="sm" borderRadius="xxl" height={5} width={60} />
        </Box>
        {callToActionButton}
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}

export default Section
