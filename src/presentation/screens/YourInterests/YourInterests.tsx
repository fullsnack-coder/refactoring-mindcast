import { useAppTheme } from '@application/hooks'
import { useAppDispatch, useAppSelector } from '@application/hooks/store'
import useTopics from '@application/hooks/useTopics'
import { AppStackParamList } from '@application/navigation/AppNavigator'
import {
  getTopicsFromUser,
  saveTopicsToUserStart,
} from '@application/store/modules/topics'
import { Topic } from '@application/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import Separator from '@system/atoms/Separator'
import InterestOption from '@system/molecules/InterestOption'
import Ribbon from '@system/molecules/Ribbon'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Interest = Topic & { active: boolean }

type Props = NativeStackScreenProps<AppStackParamList, 'interests'>

const YourInterestsScreen: React.FC<Props> = ({ navigation }) => {
  const { colors, spacing } = useAppTheme()
  const { topics, isLoading } = useTopics()
  const userTopics = useAppSelector(state => state.userTopics)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const dispatch = useAppDispatch()

  const isPending = useMemo(() => {
    return userTopics.isLoading || isLoading
  }, [userTopics, isLoading])

  const interestsOptions = useMemo(() => {
    const result: Interest[] = topics.map(tp => {
      return {
        ...tp,
        active: selectedTopics.includes(tp.id),
      }
    })
    return result
  }, [selectedTopics, topics])

  const handleToggleTopic = useCallback(
    (id: string) => () => {
      setSelectedTopics(prevSelected => {
        if (prevSelected.includes(id))
          return prevSelected.filter(prev => prev !== id)
        return [...prevSelected, id]
      })
    },
    [],
  )

  const handleSaveInterests = useCallback(() => {
    if (selectedTopics.length <= 0 || isPending) return
    const parsedTopics = topics.filter(({ id }) => selectedTopics.includes(id))
    dispatch(
      saveTopicsToUserStart({
        topics: parsedTopics,
        userId: 'wathever',
        onSuccess: () => {
          navigation.navigate('home', {
            screen: 'home-discover',
            params: {
              screen: 'discover',
            },
          })
        },
      }),
    )
  }, [dispatch, navigation, selectedTopics, topics, isPending])

  useEffect(() => {
    //TODO: replace "whatever-id" with the user auth id
    dispatch(getTopicsFromUser('whatever-id'))
  }, [dispatch])

  useEffect(() => {
    if (userTopics.topics.length > 0) {
      setSelectedTopics(userTopics.topics.map(({ id }) => id))
    }
  }, [userTopics])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor={colors.primaryBackground} />
      <Ribbon
        title="Your Interests"
        onPressLeftButton={navigation.goBack}
        onPressRightButton={handleSaveInterests}
        renderRight={
          <Icon
            name="check-all"
            color={colors.primaryText}
            size="md"
            style={{
              marginRight: 16,
              opacity: !isPending && selectedTopics.length > 0 ? 1 : 0.3,
            }}
          />
        }
        renderLeft={
          <Icon
            name="arrow-left"
            size="md"
            style={{ marginLeft: 16 }}
            color={colors.primaryText}
          />
        }
      />
      {isPending ? (
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          bg="primaryBackground">
          <ActivityIndicator size="large" color={colors.primary} />
        </Box>
      ) : (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            padding: spacing.md,
            backgroundColor: colors.primaryBackground,
          }}
          data={interestsOptions}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <Separator y={15} />}
          renderItem={({ item: { coverUrl, title, id, active } }) => (
            <InterestOption
              isActive={active}
              interestCoverUrlImage={coverUrl}
              onPress={handleToggleTopic(id)}
              name={title}
            />
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default YourInterestsScreen
