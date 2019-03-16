const basicColors = {
  green: '#189D7A',
  black: '#000000',
  yellow: '#F8E71C',
  orange: '#FBA518',
  blue: '#3668D3',
  cyan: '#4dd0e1',
  purple: '#ba68c8',
  pink: '#ad1457',
  red: '#D00000',
  grey: '#F6F6F6',
  active: '#00C8FB',
  inactive: '#999999'
}
export const color = {
  ...basicColors,
  primary: '#1F2E50',
  label: '#32559F',
  limit: '#D03302',
  selling: '#189D7A',
  menu: '#2C3A5A',
  warning: '#FF9630',
  searchBoxActive: '#f6f6f6',
  searchBoxPassive: '#eee',
  principal: '#444444',
  textBorderBottom: '#E0E0E0',
  button: '#3668D3',
  link: '#3668D3',
  dropdown: '#D0D0D0',
  trashContainer: '#eee',
  trashIcon: '#616161',
  list: '#F3F3F3',
  subHeader: '#DDDDDD',
  modal: '#F6F6F6',
  check: '#27CBD3',
  listBorderColor: '#EEE',
  secondary: '#FFFFFF',
  textColor: '#444444',
  errorIcon: '#8594a3',
  amountSummaryBg: '#36A5B1',

  /// order status
  pendingBorderIndicator: basicColors.yellow,
  processedBorderIndicator: basicColors.orange,
  deliveringBorderIndicator: basicColors.active,
  deliveredBorderIndicator: basicColors.green,
  recalledBorderIndicator: basicColors.red,

  /// notifications
  orderCreated: basicColors.yellow,
  orderStatus_change: basicColors.blue,
  invoiceCreated: basicColors.cyan,
  paymentMade: basicColors.green,
  invoiceDue: basicColors.red,
  restock: basicColors.yellow,
  specialofferCreated: basicColors.pink,
  orderonSpecialOffer: basicColors.purple,
  expiredoffer: basicColors.black,
  defaultNotificationColor: basicColors.orange,

  pendingBgColor: '#F3F6D2',
  processedBgColor: '#FFEFD6',
  deliveringBgColor: '#D8F4FC',
  deliveredBgColor: '#CAF1E7',
  recalledBgColor: '#FFDFDF'
}
