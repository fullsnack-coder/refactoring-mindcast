import Box from '@system/atoms/Box'
import {
  Children,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FlatList, FlatListProps } from 'react-native'

import StepPanel from './StepPanel'

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
} & Omit<FlatListProps<any>, 'data' | 'renderItem'>

export type SliderHandle = {
  moveTo: (index: number) => void
  moveToEnd: () => void
  nextStep: () => void
  prevStep: () => void
}

const Slider = forwardRef<SliderHandle, Props>(
  ({ children, renderHeader, renderFooter, ...rest }, ref) => {
    const [itemsWith, setItemWidth] = useState(0)
    const arraySteps = Children.toArray(children).map((child, i) => ({
      id: i,
      child,
    }))
    const [currentIndex, setCurrentIndex] = useState(0)
    const flatListRef = useRef<FlatList>(null)

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
      <Box flex={1}>
        {renderHeader?.({
          currentIndex: currentIndex + 1,
          total: arraySteps.length,
          ...actions,
        })}
        <FlatList
          data={arraySteps}
          onScroll={({ nativeEvent }) => {
            const index =
              nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
            setCurrentIndex(Math.round(index))
          }}
          horizontal
          keyExtractor={({ id }) => id}
          keyboardShouldPersistTaps="handled"
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

export default Slider
