/**
 * Chân trang thống nhất — dòng tác giả (web & offline).
 */
import { Platform, Text, View } from 'react-native';
import { stylesTrichDanPhapLy } from '../giao_dien/kieu_chu';
import { useChuDe } from '../tien_ich/chu_de_giao_dien';

const DONG_TAC_GIA = 'Tác giả Ths.Bs.CKII Hồ Tấn Thịnh';

export default function ChanTrangUngDung({ style, children }) {
  const CD = useChuDe();
  const mau = CD.text?.muted || '#9E9E9E';

  return (
    <View
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          alignItems: 'center',
          ...Platform.select({ web: { maxWidth: 960, alignSelf: 'center', width: '100%' } }),
        },
        style,
      ]}
    >
      {children}
      <Text style={[stylesTrichDanPhapLy(mau), { textAlign: 'center' }]}>{DONG_TAC_GIA}</Text>
    </View>
  );
}
