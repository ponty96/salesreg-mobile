import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import OnboardingContainer from '../../Container/OnboardingContainer'
import ButtonAtom from '../../Atom/Form/ButtonAtom'
import Icon from '../../Atom/Icon'
import { color } from '../../Style/Color'

interface CheckedItemProps {
  isChecked?: boolean | false
  text: string
  isVisible?: boolean | true
}
interface IProps {
  checkedItems: CheckedItemProps[]
  header: string
  description: string
  ctaButtonText: string
  ctaButtonPress: any
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
          <Image
            source={require('../../../assets-v1/icons/small-logo.png')}
            style={styles.logo}
          />
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
    alignSelf: 'flex-start',
    width: 60,
    height: 60,
    marginLeft: -4
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
    marginBottom: 32
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
  }
})
