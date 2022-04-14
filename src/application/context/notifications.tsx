import { useAppTheme } from '@application/hooks'
import Box from '@system/atoms/Box'
import Icon from '@system/atoms/Icon'
import AnimatedSnackbar from '@system/organisms/AnimatedSnackbar'
import { createContext, useCallback, useContext, useState } from 'react'
import 'react-native-get-random-values'
import { v4 as uuidV4 } from 'uuid'

type Notification = {
  id: string
  content: string | JSX.Element
  durationInMilliseconds?: number
  type: 'success' | 'info' | 'warning' | 'error'
}

type ShowNotificationOptions = {
  content: string | JSX.Element
  durationInMilliseconds?: number
  // stack?: boolean // TODO: implement stack option
  type?: Notification['type']
  lefIcon?: JSX.Element
  rightIcon?: JSX.Element
}

type NotificationsContext = {
  showNotification: (options: ShowNotificationOptions) => void
}

export const NotificationsContext = createContext<NotificationsContext>(
  {} as NotificationsContext,
)

const NotificationsProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { colors } = useAppTheme()

  const showNotification = useCallback((options: ShowNotificationOptions) => {
    const { content, type = 'info', durationInMilliseconds = 2000 } = options

    setNotifications([
      {
        id: uuidV4(),
        content,
        durationInMilliseconds,
        type,
      },
    ])
  }, [])

  const notificationIcon = useCallback(
    (type: Notification['type']) => {
      if (type === 'error')
        return { color: colors.primary, name: 'alert-octagon' }
      if (type === 'info')
        return { color: colors.facebook, name: 'information' }
      if (type === 'success')
        return { color: colors.success, name: 'check-circle-outline' }
      return { color: colors.warning, name: 'alert' }
    },
    [colors],
  )

  return (
    <NotificationsContext.Provider
      value={{
        showNotification,
      }}>
      <Box flex={1} position="relative">
        {children}
        <Box
          bg="transparent"
          bottom={60}
          left={0}
          position="absolute"
          width="100%"
          zIndex={100}>
          {notifications.map(({ id, ...notification }) => {
            const { color, name } = notificationIcon(notification.type)
            return (
              <AnimatedSnackbar
                key={id}
                containerProps={{ mb: 'sm' }}
                onDismiss={() => {
                  setNotifications(prevNotifications =>
                    prevNotifications.filter(not => not.id !== id),
                  )
                }}
                left={<Icon color={color} name={name} size="md" />}
                {...notification}
              />
            )
          })}
        </Box>
      </Box>
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationsContext)

export default NotificationsProvider
