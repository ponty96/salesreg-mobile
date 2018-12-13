import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Content } from 'native-base'
import Header from '../Components/Header/DetailsScreenHeader'
import ListItemAtom from '../Atom/ListItem/ListItemAtom'
import { color } from '../Style/Color'

interface IProps {
  navigation: any
}

export default class InvoicesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Invoice"
          rightIconType="MaterialCommunityIcons"
          rightIconTitle="credit-card-multiple"
          rightText="Pay"
          rightIconStyle={{
            transform: [{ rotate: '0deg' }]
          }}
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() => null}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Content>
          <ListItemAtom
            label="Issued date"
            value="04/11/2018"
            labelStyle={styles.listLabel}
            rightTextStyle={[styles.greenText, { color: color.black }]}
            listItemStyle={styles.listWrapper}
          />
          <ListItemAtom
            label="Date due"
            value="04/12/2018"
            labelStyle={styles.listLabel}
            rightTextStyle={[styles.greenText, { color: color.black }]}
            listItemStyle={styles.listWrapper}
          />
          <ListItemAtom
            label="TOTAL"
            value="N 27,350.00"
            labelStyle={styles.whiteLabel}
            rightTextStyle={[styles.whiteLabel]}
            listItemStyle={styles.totalAmountListItem}
          />
          <ListItemAtom
            label="AMOUNT PAID"
            value="N 6,000"
            labelStyle={styles.listLabel}
            rightTextStyle={styles.greenText}
            listItemStyle={styles.listWrapper}
          />
          <ListItemAtom
            label="Balance due"
            value="N 21,000.00"
            labelStyle={styles.listLabel}
            rightTextStyle={[styles.greenText, { color: color.red }]}
            listItemStyle={styles.listWrapper}
          />
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  listLabel: {
    color: color.textColor,
    marginLeft: 2,
    fontFamily: 'AvenirNext-Regular'
  },
  listWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  greenText: {
    color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  },
  whiteLabel: {
    color: '#fff',
    fontFamily: 'AvenirNext-DemiBold'
  },
  totalAmountListItem: {
    backgroundColor: color.selling,
    paddingLeft: 24,
    paddingRight: 24
  }
})
