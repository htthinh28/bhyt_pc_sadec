import { Platform, Text, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DieuHuongChinh from './ma_nguon/dieu_huong/tuyen_duong';
import { ChuDeProvider } from './ma_nguon/tien_ich/chu_de_giao_dien';

const FONT_VI_SAFE = Platform.OS === 'web'
  ? "'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Roboto', 'Helvetica Neue', Arial, sans-serif"
  : 'Arial';
if (!Text.defaultProps) Text.defaultProps = {};
if (!TextInput.defaultProps) TextInput.defaultProps = {};
Text.defaultProps.style = [{ fontFamily: FONT_VI_SAFE }, Text.defaultProps.style];
TextInput.defaultProps.style = [{ fontFamily: FONT_VI_SAFE }, TextInput.defaultProps.style];

export default function App() {
  return (
    <SafeAreaProvider>
      <ChuDeProvider>
        <DieuHuongChinh />
      </ChuDeProvider>
    </SafeAreaProvider>
  );
}
