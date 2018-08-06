import { Dimensions, Platform } from 'react-native';

export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return Platform.OS === 'ios' && (dimen.height === 812 || dimen.width === 812);
};

export const ifIphoneX = (iphoneXStyle: any, regularStyle: any) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};
