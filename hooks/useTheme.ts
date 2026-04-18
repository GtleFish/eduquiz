import { useColorScheme } from 'react-native';
import { lightTheme } from '../theme/light';
import { darkTheme } from '../theme/dark';

export function useTheme() {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
}
