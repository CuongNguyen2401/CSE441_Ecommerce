module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@screens': './src/screens',
          },
        },
      ],
      ['@babel/plugin-transform-react-jsx', {runtime: 'automatic'}],
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: './tamagui.config.ts',
        },
      ],
      [
        'react-native-reanimated/plugin',
        {
          // These exclusions prevent Reanimated from processing modules that cause issues
          globals: ['__scanCodes'],
          disableInlineStylesWarning: true,
          excludeModules: [
            'expo-constants',
            'expo-application',
            'expo-asset',
            'expo-file-system',
            'expo-font',
            '@expo/vector-icons',
            'react-native-vector-icons',
          ],
        },
      ],
    ],
  };
};
