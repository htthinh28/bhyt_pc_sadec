export const quayLaiAnToan = (navigation, manHinhDuPhong = 'TongQuan', params = undefined) => {
  if (!navigation) return;
  if (typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
    navigation.goBack();
    return;
  }
  if (typeof navigation.navigate === 'function' && manHinhDuPhong) {
    navigation.navigate(manHinhDuPhong, params);
  }
};

