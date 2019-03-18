import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Icon } from 'native-base'

import OnboardingContainer from '../../Container/OnboardingContainer'
import ButtonAtom from '../../Atom/Form/ButtonAtom'
import { color } from '../../Style/Color'
import ViewOverflow from 'react-native-view-overflow'

interface CheckedItemProps {
  isChecked?: boolean | false
  text: string
  isVisible?: boolean | true
}
interface IProps {
  checkedItems: CheckedItemProps[]
  header: string
  showLogin?: boolean
  description: string
  ctaButtonText: string
  ctaButtonPress: any
  onLoginPress?: () => void
}

const CheckBox = (props: { isChecked: boolean }): JSX.Element =>
  !props.isChecked ? (
    <View style={styles.checkBox} />
  ) : (
    <View style={[styles.checkBox, styles.checkedCheckBox]}>
      <Icon
        type="Ionicons"
        name="md-checkmark"
        style={{ color: color.button, fontSize: 30 }}
      />
    </View>
  )

const CheckedItem = (props: CheckedItemProps): JSX.Element => (
  <View style={styles.checkBoxWrapper}>
    {props.isVisible && <CheckBox isChecked={props.isChecked} />}
    <Text style={styles.checkItemText}>{props.text}</Text>
  </View>
)

export default class SignUpProcess extends React.PureComponent<IProps> {
  render() {
    return (
      <OnboardingContainer>
        <View style={styles.container}>
          <ViewOverflow
            style={{
              height: 41,
              width: 55,
              alignSelf: 'flex-end'
            }}
          >
            <Image
              source={require('../../../assets-v1/icons/logo.png')}
              style={styles.logo}
              resizeMode="stretch"
            />
          </ViewOverflow>
          <Text style={styles.header}>{this.props.header}</Text>
          <Text style={styles.description}>{this.props.description}</Text>
          {this.props.checkedItems.map((checkItem: CheckedItemProps, index) => (
            <CheckedItem
              key={index}
              isChecked={checkItem.isChecked}
              text={checkItem.text}
              isVisible={checkItem.isVisible}
            />
          ))}
          <View style={styles.buttonWrapper}>
            <ButtonAtom
              btnText={this.props.ctaButtonText}
              onPress={this.props.ctaButtonPress}
              type="primary"
            />
          </View>
          {this.props.showLogin && (
            <React.Fragment>
              <Text style={styles.haveAccount}>Already have an account?</Text>
              <ButtonAtom
                btnText="LOGIN"
                transparent={true}
                onPress={() => this.props.onLoginPress()}
                type="secondary"
                hideIcon={true}
              />
            </React.Fragment>
          )}
        </View>
      </OnboardingContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    paddingHorizontal: 50,
    paddingVertical: 32
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  header: {
    alignSelf: 'flex-start',
    fontSize: 26,
    color: '#fff',
    fontFamily: 'AvenirNext-Bold',
    paddingVertical: 28
  },
  description: {
    alignSelf: 'flex-start',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 18,
    color: '#fff',
    marginBottom: 15
  },
  checkBoxWrapper: {
    marginVertical: 22,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 0
  },
  checkBox: {
    borderWidth: 2,
    borderColor: '#fff',
    height: 36,
    width: 36,
    borderRadius: 18,
    marginLeft: 0,
    flexWrap: 'wrap',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkedCheckBox: {
    backgroundColor: '#fff'
  },
  checkItemText: {
    color: '#fff',
    fontSize: 24,
    marginTop: -3,
    fontFamily: 'AvenirNext-Bold',
    flexWrap: 'wrap',
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingRight: 10
  },
  buttonWrapper: {
    marginTop: 54,
    alignItems: 'center'
  },
  haveAccount: {
    marginTop: 32,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'AvenirNext-DemiBold'
  }
})
