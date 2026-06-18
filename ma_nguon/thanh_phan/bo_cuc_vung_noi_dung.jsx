/**
 * Giới hạn chiều rộng nội dung trên laptop/PC — căn giữa trang.
 */
import { View } from 'react-native';
import { useLayoutMode } from '../tien_ich/diem_anh_man_hinh';

export default function BoCucVungNoiDung({ children, style, contentStyle }) {
  const { maxContentWidth } = useLayoutMode();
  return (
    <View style={[{ flex: 1, width: '100%' }, style]}>
      <View
        style={[
          {
            flex: 1,
            width: '100%',
            alignSelf: 'center',
            maxWidth: maxContentWidth,
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
}
