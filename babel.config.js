module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@system': './src/system',
          '@application': './src/application',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
        },
      },
    ],
  ],
};
