import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Content } from 'native-base'
import Header from '../Components/Header/DetailsScreenHeader'
import ListItemAtom from '../Atom/ListItem/ListItemAtom'
import { color } from '../Style/Color'
import moment from 'moment'
import { numberWithCommas } from '../Functions/numberWithCommas'
import ProfileListAtom from '../Atom/ListItem/ExpandableListItemAtom'

interface IProps {
  navigation: any
}

export default class InvoicesScreen extends React.Component<IProps> {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  onPressEditInvoice = () => {
    let {
      navigation: {
        state: {
          params: {
            sales: {
              invoice: { id, dueDate }
            },
            from
          }
        }
      }
    } = this.props

    this.props.navigation.navigate('UpdateInvoiceDueDate', {
      invoice: { id, dueDate },
      from
    })
  }

  renderHeader = (amount, amountPaid, sales, from) => {
    return Number(amount) - amountPaid > 0 ? (
      <Header
        title="Invoice Details"
        rightIconType="MaterialCommunityIcons"
        rightIconTitle="credit-card-multiple"
        rightText="Pay"
        rightIconStyle={{
          transform: [{ rotate: '0deg' }]
        }}
        onPressLeftIcon={() => this.props.navigation.goBack()}
        onPressRightIcon={() =>
          this.props.navigation.navigate('UpsertInvoice', { sales, from })
        }
      />
    ) : (
      <Header
        title="Invoice Details"
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
                items,
                discount,
                invoice: { dueDate },
                date
              },
              sales,
              from
            }
          }
        }
      } = this.props,
      total = parseFloat(
        (Number(amount) - Number(discount)).toString()
      ).toFixed(2)

    return (
      <React.Fragment>
        {this.renderHeader(total, amountPaid, sales, from)}
        <View style={styles.container}>
          <Content>
            <ListItemAtom
              label="Issued date"
              value={moment(date).format('DD/MM/YYYY')}
              labelStyle={styles.listLabel}
              rightTextStyle={[styles.greenText, { color: color.black }]}
              listItemStyle={styles.listWrapper}
            />
            <ProfileListAtom
              section={`Date due: ${moment(dueDate).format('DD/MM/YYYY')}`}
              value={
                Number(total) - amountPaid > 0 ? 'Edit' : 'Payment Completed'
              }
              type={Number(total) - amountPaid > 0 ? 'button' : ''}
              onPress={this.onPressEditInvoice}
            />
            {items.map((item, i) => (
              <ListItemAtom
                key={i}
                label={item.product ? item.product.name : item.service.name}
                value={`\u20A6 ${item.unitPrice}`}
                quantity={item.quantity}
                labelStyle={styles.listLabel}
                rightTextStyle={styles.greenText}
                listItemStyle={styles.listWrapper}
              />
            ))}
            <ListItemAtom
              label="Discount"
              value={`\u20A6 ${discount}`}
              labelStyle={styles.listLabel}
              rightTextStyle={[styles.greenText, { color: color.black }]}
              listItemStyle={styles.listWrapper}
            />
            <ListItemAtom
              label="TOTAL"
              value={`N ${numberWithCommas(total)}`}
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
              value={`N ${numberWithCommas(Number(total) - amountPaid)}`}
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
    fontFamily: 'AvenirNext-DemiBold'
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
