import { STORE_APP_SETTINGS } from '@application/constants'
import AsyncStorageLib from '@react-native-async-storage/async-storage'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

export type SettingKey =
  | 'autoplay'
  | 'offline-mode'
  | 'darkmode'
  | 'download-mobile-network'

export type SettingOption = {
  label: string
  description?: string
  value: any
}

type SettingsContext = {
  currentSettings: Record<SettingKey, SettingOption>
  updateSetting: <T>(settingKey: SettingKey, updatedValue: T) => void
}

const appSettingsContext = createContext<SettingsContext>({} as SettingsContext)

const initialSettings: SettingsContext['currentSettings'] = {
  darkmode: {
    description:
      'Activate the Dark theme (the Light Theme will be activated otherwise)',
    label: 'Dark Theme',
    value: false,
  },
  autoplay: {
    description:
      'Continue listening to similar podcasts when the current playlist ends',
    label: 'AutoPlay',
    value: false,
  },
  'download-mobile-network': {
    description:
      "Allows the App to performs downloads by using the device's network",
    label: 'Download with Mobile Network',
    value: false,
  },
  'offline-mode': {
    description:
      'When you goes offline, only will be possible to listen podcasts previously downloaded',
    label: 'Offline mode',
    value: false,
  },
}

const AppSettingsProvider: React.FC = ({ children }) => {
  const [currentSettings, setCurrentSettings] =
    useState<Record<SettingKey, SettingOption>>(initialSettings)

  const saveOnInternalStorage = useCallback(async settings => {
    await AsyncStorageLib.setItem(STORE_APP_SETTINGS, JSON.stringify(settings))
  }, [])

  const updateSetting = useCallback(
    async (settingKey: SettingKey, value) => {
      try {
        const nextSettings = {
          ...currentSettings,
          [settingKey]: {
            ...currentSettings[settingKey],
            value,
          },
        }
        setCurrentSettings(nextSettings)
        await saveOnInternalStorage(nextSettings)
      } catch (error) {
        if (__DEV__) console.error(error)
      }
    },
    [currentSettings, saveOnInternalStorage],
  )

  useEffect(() => {
    AsyncStorageLib.getItem(STORE_APP_SETTINGS).then(localSettings => {
      if (!localSettings) return
      const savedSettings = JSON.parse(localSettings)
      setCurrentSettings(savedSettings)
    })
  }, [])

  return (
    <appSettingsContext.Provider value={{ currentSettings, updateSetting }}>
      {children}
    </appSettingsContext.Provider>
  )
}

export const useAppSettings = () => useContext(appSettingsContext)

export default AppSettingsProvider
