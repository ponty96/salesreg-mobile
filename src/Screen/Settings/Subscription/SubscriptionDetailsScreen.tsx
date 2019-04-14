import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import Header from '../../../Components/Header/DetailsScreenHeader'
import { DemiBoldText, MediumText } from '../../../Atom/TextAtom'
import { color } from '../../../Style/Color'
import ButtonAtom from '../../../Atom/Form/ButtonAtom'

export default class Subscription extends React.PureComponent {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Subscription"
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    }
  }

  renderOtherDetails = () => {
    return (
      <React.Fragment>
        <View style={styles.addMarginTop}>
          <MediumText style={[styles.gray80, styles.addBottomMargin]}>
            {'\u20A6'}1440/month
          </MediumText>
          <MediumText style={styles.gray60}>Monthly Plan</MediumText>
        </View>
        <View style={styles.addMarginTop}>
          <MediumText style={[styles.gray80, styles.addBottomMargin]}>
            13 May, 2019
          </MediumText>
          <MediumText style={styles.gray60}>Next Billing</MediumText>
        </View>
        <View style={styles.addMarginTop}>
          <MediumText style={[styles.gray80, styles.addBottomMargin]}>
            23 Days
          </MediumText>
          <MediumText style={styles.gray60}>Days Remaining</MediumText>
        </View>
      </React.Fragment>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.overview}>
            <Image
              style={{ width: 130, height: 130 }}
              source={require('../../../../assets-v1/images/onboardingScreen/launcher.png')}
            />
            <View style={{ marginLeft: 20, width: '55%' }}>
              <DemiBoldText style={[styles.planTitle, styles.addBottomMargin]}>
                Lite Plan
              </DemiBoldText>
              <MediumText style={[styles.gray80, styles.addBottomMargin]}>
                ajosepaul@gmail.com
              </MediumText>
              <View style={[styles.row, styles.addBottomMargin]}>
                <MediumText style={styles.gray60}>Start</MediumText>
                <MediumText style={styles.gray80}>11 April, 2019</MediumText>
              </View>
              <View style={[styles.row, styles.addBottomMargin]}>
                <MediumText style={styles.gray60}>Expiry</MediumText>
                <MediumText style={styles.gray80}>12 May, 2019</MediumText>
              </View>
              <MediumText style={{ color: color.green, fontSize: 15 }}>
                Paid
              </MediumText>
            </View>
          </View>
          {this.renderOtherDetails()}
        </View>
        <ButtonAtom
          btnText="Renew Subscription"
          onPress={() => null}
          hideIcon
          type="secondary"
          btnStyle={{ width: '100%' }}
          textStyle={{ color: '#fff' }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  overview: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d8d8d8',
    paddingBottom: 15
  },
  planTitle: {
    fontSize: 25
  },
  gray80: {
    color: '#333',
    fontSize: 15
  },
  gray60: {
    color: '#999',
    fontSize: 15
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  addBottomMargin: {
    marginBottom: 5
  },
  addMarginTop: {
    marginTop: 30
  }
})
