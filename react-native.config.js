const VECTOR_ICONS_FONTS_PATH = './node_modules/react-native-vector-icons/Fonts'
const VECTOR_FONTS = ['MaterialIcons.ttf', 'MaterialCommunityIcons.ttf']

module.exports = {
  assets: ['./assets/fonts'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
        android: null,
      },
      assets: VECTOR_FONTS.map(font => VECTOR_ICONS_FONTS_PATH + '/' + font),
    },
  },
}
