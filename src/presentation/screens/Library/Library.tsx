import { useAppTheme } from '@application/hooks'
import { LibraryStackParamList } from '@application/navigation/AppHome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Typography from '@system/atoms/Typography'
import OptionWithIcons from '@system/molecules/OptionWithIcons'

import { useCallback } from 'react'
import { Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { getLibraryOptions } from './utils'

const { Heading } = Typography
const libraryOptions = getLibraryOptions()

type Props = NativeStackScreenProps<LibraryStackParamList, 'library'>

const LibraryScreen: React.FC<Props> = ({ navigation }) => {
  const redirectToOption = useCallback(
    route => () => {
      navigation.navigate(route)
    },
    [navigation],
  )
  const { colors } = useAppTheme()

  return (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView
        style={{ flexGrow: 1, backgroundColor: colors.primaryBackground }}>
        <Box flexGrow={1} bg="primaryBackground">
          <Box p="md">
            <Heading>Library</Heading>
          </Box>
          {libraryOptions.map(({ iconName, label, route }, idx) => (
            <Pressable onPress={redirectToOption(route)} key={idx}>
              <OptionWithIcons
                leftIconProps={{ name: iconName }}
                rightIconProps={{ name: 'chevron-right' }}
                optionLabel={label}
              />
            </Pressable>
          ))}
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LibraryScreen
