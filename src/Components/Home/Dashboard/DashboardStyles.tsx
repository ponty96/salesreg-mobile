import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  redText: {
    color: 'red'
  },
  container: {
    marginVertical: 4,
    padding: 16,
    borderRadius: 4,
    marginHorizontal: 10,
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
    fontSize: 12
  },
  largeText: {
    marginTop: 2,
    fontSize: 20
  },
  productsText: {
    marginTop: 2,
    fontSize: 13,
    color: '#bdbdbd'
  },
  chartStyle: { marginLeft: -16, marginTop: 10 }
})

export default styles
