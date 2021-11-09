import { useTheme as useShopifyTheme } from '@shopify/restyle'
import { Theme } from '@system/theme'

const useAppTheme = () => useShopifyTheme<Theme>()

export default useAppTheme
