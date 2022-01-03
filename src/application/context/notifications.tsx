import Box from '@system/atoms/Box'
import AnimatedSnackbar from '@system/organisms/AnimatedSnackbar'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
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
}

type NotificationsContext = {
  showNotification: (options: ShowNotificationOptions) => void
}

export const NotificationsContext = createContext<NotificationsContext>(
  {} as NotificationsContext,
)

const NotificationsProvider: React.FC = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

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
          {notifications.map(({ id, ...notification }) => (
            <AnimatedSnackbar
              key={id}
              containerProps={{ mb: 'sm' }}
              onDismiss={() => {
                setNotifications(prevNotifications =>
                  prevNotifications.filter(not => not.id !== id),
                )
              }}
              {...notification}
            />
          ))}
        </Box>
      </Box>
    </NotificationsContext.Provider>
  )
}

export const useNotifications = () => useContext(NotificationsContext)

export default NotificationsProvider
