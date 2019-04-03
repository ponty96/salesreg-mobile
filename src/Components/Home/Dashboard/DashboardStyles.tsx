import { StyleSheet } from 'react-native'
import { color } from '../../../Style/Color'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  redText: {
    color: 'red'
  },
  icon: {
    color: color.textColor,
    fontSize: 25
  },
  container: {
    marginVertical: 4,
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 0,
    backgroundColor: '#fff',
    shadowColor: '#e0e0e0',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0
  },
  smallText: {
    fontSize: 12,
    color: color.textColor
  },
  largeText: {
    marginTop: 2,
    fontSize: 20,
    color: color.textColor
  },
  productsText: {
    marginTop: 2,
    fontSize: 13,
    color: '#616161'
  },
  chartStyle: { marginLeft: -16, marginTop: 10 }
})

export default styles
