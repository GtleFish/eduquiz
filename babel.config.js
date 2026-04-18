module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // NOTE: react-native-reanimated/plugin is auto-included by babel-preset-expo
    // in Expo SDK 52+. Do NOT add it manually here — causes worklets conflict.
  };
};
