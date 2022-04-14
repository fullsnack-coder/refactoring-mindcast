import { SettingOption as Option } from '@application/context/settings'
import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import { Switch } from 'react-native-gesture-handler'

const { Text } = Typography

type Props = {
  setting: Option
  onUpdateOption: (newValue: any) => void
}

const SettingOption: React.FC<Props> = ({ setting, onUpdateOption }) => {
  const { description, label, value } = setting

  return (
    <Box alignItems="center" flexDirection="row">
      <Box flex={1} mr="md">
        <Text color="primaryText" fontFamily="CircularStd-Bold" fontSize={20}>
          {label}
        </Text>
        <Text color="primaryTextTransparent" fontSize={16}>
          {description}
        </Text>
      </Box>
      {typeof value === 'boolean' ? (
        <Switch
          accessibilityLabel={label}
          value={value}
          onValueChange={onUpdateOption}
        />
      ) : null}
    </Box>
  )
}

export default SettingOption
