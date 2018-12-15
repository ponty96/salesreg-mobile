import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Content } from 'native-base'
import Header from '../Components/Header/DetailsScreenHeader'
import ListItemAtom from '../Atom/ListItem/ListItemAtom'
import { color } from '../Style/Color'
import moment from 'moment'
import { numberWithCommas } from '../Functions/numberWithCommas'

interface IProps {
  navigation: any
}

export default class InvoicesScreen extends React.Component<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  renderHeader = (amount, amountPaid, sales) => {
    return amount - amountPaid != 0 ? (
      <Header
        title="Invoice"
        rightIconType="MaterialCommunityIcons"
        rightIconTitle="credit-card-multiple"
        rightText="Pay"
        rightIconStyle={{
          transform: [{ rotate: '0deg' }]
        }}
        onPressLeftIcon={() => this.props.navigation.goBack()}
        onPressRightIcon={() =>
          this.props.navigation.navigate('UpsertInvoice', { sales })
        }
      />
    ) : (
      <Header
        title="Invoice"
        hideRightMenu
        onPressLeftIcon={() => this.props.navigation.goBack()}
      />
    )
  }

  render() {
    let {
      navigation: {
        state: {
          params: {
            sales: {
              amount,
              amountPaid,
              invoice: { dueDate },
              date
            },
            sales
          }
        }
      }
    } = this.props

    return (
      <React.Fragment>
        {this.renderHeader(amount, amountPaid, sales)}
        <View style={styles.container}>
          <Content>
            <ListItemAtom
              label="Issued date"
              value={moment(date).format('DD/MM/YYYY')}
              labelStyle={styles.listLabel}
              rightTextStyle={[styles.greenText, { color: color.black }]}
              listItemStyle={styles.listWrapper}
            />
            <ListItemAtom
              label="Date due"
              value={moment(dueDate).format('DD/MM/YYYY')}
              labelStyle={styles.listLabel}
              rightTextStyle={[styles.greenText, { color: color.black }]}
              listItemStyle={styles.listWrapper}
            />
            <ListItemAtom
              label="TOTAL"
              value={`N ${numberWithCommas(amount)}`}
              labelStyle={styles.whiteLabel}
              rightTextStyle={[styles.whiteLabel]}
              listItemStyle={styles.totalAmountListItem}
            />
            <ListItemAtom
              label="AMOUNT PAID"
              value={`N ${numberWithCommas(amountPaid)}`}
              labelStyle={styles.listLabel}
              rightTextStyle={styles.greenText}
              listItemStyle={styles.listWrapper}
            />
            <ListItemAtom
              label="Balance due"
              value={`N ${numberWithCommas(amount - amountPaid)}`}
              labelStyle={styles.listLabel}
              rightTextStyle={[styles.greenText, { color: color.red }]}
              listItemStyle={styles.listWrapper}
            />
          </Content>
        </View>
      </React.Fragment>
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
