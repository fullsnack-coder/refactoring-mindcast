import Box from '@system/atoms/Box'
import Image from '@system/atoms/Image'
import Separator from '@system/atoms/Separator'
import TextInput from '@system/atoms/TextInput'
import Typography from '@system/atoms/Typography'
import Avatar from '@system/molecules/Avatar'
import ButtonWithIcon from '@system/molecules/ButtonWithIcon'
import InterestOption from '@system/molecules/InterestOption'
import PasswordInput from '@system/molecules/PasswordInput'

import { Dimensions } from 'react-native'

type Props = {
  text: string
}

const { width, height } = Dimensions.get('window')
const { Heading, Text } = Typography

//FIXME: screen to debug components, delete this code when start build the screen
const OnboardingStep: React.FC<Props> = ({ text }) => (
  <Box width={width} height={height} bg="primaryBackground" p="sm">
    <Heading variant="heading">Discover</Heading>
    <Heading variant="subheading">New Releases</Heading>
    <Text>{text}</Text>
    <Image
      style={{ borderRadius: 12 }}
      sourceUri="https://e.snmc.io/i/1200/s/5becc732cc639ee6ec2fccd2177690a4/1461674"
    />
    <Avatar
      size="small"
      sourceUri="https://e.snmc.io/i/1200/s/5becc732cc639ee6ec2fccd2177690a4/1461674"
    />
    <Avatar
      name="Manuel"
      size="small"
      sourceUri="https://e.snmc.io/i/1200/s/5becc732cc639ee6ec2fccd2177690a4/1461674"
    />
    <TextInput
      rightInput={<Text>H</Text>}
      placeholder="type your email"
      variant="outlined"
    />
    <Separator y={24} />
    <PasswordInput placeholder="type your password" variant="outlined" />
    <Separator y={20} />
    <Box alignItems="center">
      <ButtonWithIcon
        text="Press me"
        type="primary"
        iconSize="md"
        leftIconName="compass"
        rightIconName="magnify"
        onPress={() => console.log('jajaj')}
      />
    </Box>
    <InterestOption
      interestCoverUrlImage="https://e.snmc.io/i/1200/s/5becc732cc639ee6ec2fccd2177690a4/1461674"
      name="action"
    />
  </Box>
)

export default OnboardingStep
