import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  FlatList,
  FlatListProps,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native'

import StepPanel from './StepPanel'
import StepPanelThumbs, { Props as ThumbsProps } from './StepPanelThumbs'

type RenderProps = {
  currentIndex: number
  total: number
  goNext: () => void
  goPrev: () => void
  goEnd: () => void
  goToIndex: (idx: number) => void
}

type Props = {
  renderFooter?: (options: RenderProps) => JSX.Element | null | boolean
  renderHeader?: (options: RenderProps) => JSX.Element | null | boolean
  thumb?: {
    config: ThumbsProps['thumbsConfig']
  }
} & Omit<FlatListProps<any>, 'data' | 'renderItem'>

export type SliderHandle = {
  moveTo: (index: number) => void
  moveToEnd: () => void
  nextStep: () => void
  prevStep: () => void
}

const Slider = forwardRef<SliderHandle, Props>(
  ({ children, renderHeader, renderFooter, thumb, ...rest }, ref) => {
    const [itemsWith, setItemWidth] = useState(0)
    const arraySteps = Children.toArray(children).map((child, i) => ({
      id: i,
      child,
    }))
    const [currentIndex, setCurrentIndex] = useState(0)
    const flatListRef = useRef<FlatList>(null)
    const { colors } = useAppTheme()

    useEffect(() => {
      const subscription = Dimensions.addEventListener('change', () =>
        flatListRef.current?.scrollToIndex({ index: 0 }),
      )
      return () => subscription.remove()
    }, [currentIndex])

    const actions = useMemo(() => {
      const lastIndex = arraySteps.length - 1
      return {
        goNext: () => {
          const nextIndex =
            currentIndex < lastIndex ? currentIndex + 1 : currentIndex
          flatListRef.current?.scrollToOffset({ offset: itemsWith * nextIndex })
        },
        goPrev: () => {
          const nextIndex = currentIndex === 0 ? 0 : currentIndex - 1
          flatListRef.current?.scrollToOffset({ offset: itemsWith * nextIndex })
        },
        goEnd: () => {
          flatListRef.current?.scrollToEnd({ animated: true })
        },
        goToIndex: (index: number) => {
          const nextIndex = Math.max(0, index)
          flatListRef.current?.scrollToIndex({
            index: Math.min(lastIndex, nextIndex),
            animated: true,
          })
        },
      }
    }, [arraySteps, currentIndex])

    useImperativeHandle(ref, () => ({
      moveToEnd: actions.goEnd,
      moveTo: actions.goToIndex,
      nextStep: actions.goNext,
      prevStep: actions.goPrev,
    }))

    return (
      <Box flexGrow={1}>
        {renderHeader?.({
          currentIndex: currentIndex + 1,
          total: arraySteps.length,
          ...actions,
        })}
        {thumb ? (
          <ScrollView
            contentContainerStyle={sliderStyles.sliderThumbWrapper}
            horizontal
            style={{
              flexGrow: 0,
              backgroundColor: colors.primaryBackground,
            }}>
            <StepPanelThumbs
              activeThumbIndex={currentIndex}
              thumbsConfig={thumb.config}
              onPressThumb={actions.goToIndex}
            />
          </ScrollView>
        ) : null}
        <FlatList
          data={arraySteps}
          keyExtractor={({ id }) => id}
          keyboardShouldPersistTaps="handled"
          onScroll={({ nativeEvent }) => {
            const index =
              nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
            setCurrentIndex(Math.round(index))
          }}
          horizontal
          onLayout={({ nativeEvent }) => setItemWidth(nativeEvent.layout.width)}
          pagingEnabled
          ref={flatListRef}
          renderItem={({ item }) => (
            <StepPanel width={itemsWith} p="xs">
              {item.child}
            </StepPanel>
          )}
          showsHorizontalScrollIndicator={false}
          {...rest}
        />
        {renderFooter?.({
          currentIndex: currentIndex + 1,
          total: arraySteps.length,
          ...actions,
        })}
      </Box>
    )
  },
)

const sliderStyles = StyleSheet.create({
  sliderThumbWrapper: {
    minWidth: '100%',
  },
})

export default Slider
