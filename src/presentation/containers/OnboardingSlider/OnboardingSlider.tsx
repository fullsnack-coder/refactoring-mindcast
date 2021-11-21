import Box from '@system/atoms/Box'
import Button from '@system/atoms/Button'
import Separator from '@system/atoms/Separator'
import StepsPanelSlider from '@system/organisms/StepsPanelSlider'

import Step from './Step'

type Props = {
  onComplete: () => void
  onSkip?: () => void
}

const onboardingSteps = [
  {
    title: 'Discover',
    iconName: 'compass',
    description: 'Find a new way to sharp your knowledge about the world.',
  },
  {
    title: 'Learn',
    iconName: 'brain',
    description:
      'Learn about a new subject everyday and start to see the world with a new perspective.',
  },
  {
    title: 'Listen any time',
    iconName: 'headset',
    description:
      'Download your favorite podcasts and playliststo listen offline.',
  },
]

const OnboardingSlider: React.FC<Props> = ({ onComplete, onSkip }) => {
  return (
    <StepsPanelSlider
      renderFooter={({ goNext, goPrev, currentIndex, total }) => (
        <Box flexDirection="row">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            p="md"
            width="100%">
            {currentIndex === total ? (
              <Button
                text="GET STARTED"
                onPress={onComplete}
                fullWidth
                size="md"
                type="primary"
              />
            ) : (
              <>
                {currentIndex === 1 ? (
                  <Button text="SKIP" onPress={onSkip} fullWidth size="md" />
                ) : (
                  <Button text="PREV" onPress={goPrev} fullWidth size="md" />
                )}
                <Separator x={12} />
                <Button
                  text="NEXT"
                  type="primary"
                  onPress={goNext}
                  fullWidth
                  size="md"
                />
              </>
            )}
          </Box>
        </Box>
      )}>
      {onboardingSteps.map((step, i) => {
        return <Step key={i} {...step} />
      })}
    </StepsPanelSlider>
  )
}

export default OnboardingSlider
