import { useAppTheme } from '@application/hooks'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import Authors from '@presentation/containers/Authors'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Ribbon from '@system/molecules/Ribbon'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Props = {} & NativeStackScreenProps<AppStackParamList, 'about'>

const AboutScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, spacing } = useAppTheme()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} bg="primaryBackground">
        <Ribbon
          title="About"
          onPressLeftButton={navigation.goBack}
          renderLeft={
            <Icon
              name="arrow-left"
              color={colors.primaryText}
              size="md"
              style={{ marginLeft: spacing.md }}
            />
          }
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: spacing.md,
            paddingBottom: 20,
          }}>
          <Authors />
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}

export default AboutScreen
