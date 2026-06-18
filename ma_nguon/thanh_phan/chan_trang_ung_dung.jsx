/**
 * Chân trang thống nhất — dòng tác giả (web & offline).
 */
import { Text, View } from 'react-native';
import { useLayoutMode } from '../tien_ich/diem_anh_man_hinh';
import { stylesTrichDanPhapLy } from '../giao_dien/kieu_chu';
import { useChuDe } from '../tien_ich/chu_de_giao_dien';

const DONG_TAC_GIA = 'Tác giả Ths.Bs.CKII Hồ Tấn Thịnh';

export default function ChanTrangUngDung({ style, children }) {
  const CD = useChuDe();
  const { maxContentWidth } = useLayoutMode();
  const mau = CD.text?.secondary || '#64748B';

  return (
    <View
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
          alignItems: 'center',
          width: '100%',
          alignSelf: 'center',
          maxWidth: maxContentWidth || 960,
        },
        style,
      ]}
    >
      {children}
      <Text style={[stylesTrichDanPhapLy(mau), { textAlign: 'center' }]}>{DONG_TAC_GIA}</Text>
    </View>
  );
}
