import { useAppSettings } from '@application/context/settings'
import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle'
import { darkTheme, lightTheme, Theme } from '@system/theme'
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react'

export interface ThemeContextInterface {
  currentTheme: Theme
  isDarkModeEnabled: boolean
  toggleDarkMode: () => void
}

export const ThemeContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface,
)

export const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider: React.FC = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true)
  const { getSetting } = useAppSettings()

  const toggleDarkMode = useCallback(() => {
    setIsDarkModeEnabled(prevMode => !prevMode)
  }, [])

  const currentTheme = useMemo(
    () => (isDarkModeEnabled ? darkTheme : lightTheme),
    [isDarkModeEnabled],
  )

  useLayoutEffect(() => {
    getSetting<boolean>('darkmode').then(appSetting => {
      if (appSetting) setIsDarkModeEnabled(appSetting.value)
    })
  }, [getSetting])

  return (
    <ThemeContext.Provider
      value={{ currentTheme, isDarkModeEnabled, toggleDarkMode }}>
      <ShopifyThemeProvider theme={currentTheme}>
        {children}
      </ShopifyThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
