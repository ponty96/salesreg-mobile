import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Left, Right, Title, Icon } from 'native-base'

import { color } from '../../Style/Color'

export interface IProps {
  onPressBackIcon: () => void
  currentStep: number
  totalSteps: number
  showBottomBorder?: boolean
  iconName?: string
  body?: JSX.Element
  showStepper?: boolean
  showTickIcon?: boolean
  onPressTickIcon?: () => void
  headerText?: string
}

export default class FormHeader extends React.PureComponent<IProps> {
  static defaultProps = {
    currentStep: 1,
    totalSteps: 1,
    showStepper: true
  }
  progressIndicatorStyle = () => {
    const { currentStep, totalSteps } = this.props
    return {
      height: 5,
      backgroundColor: color.button,
      width: `${(currentStep / totalSteps) * 100} %`
      // marginTop: 16
    }
  }
  render() {
    return [
      this.props.showStepper && (
        <View
          style={this.progressIndicatorStyle()}
          key="FormHeader--component-1"
        />
      ),
      <View
        style={[
          styles.header,
          this.props.showBottomBorder && styles.showBorder
        ]}
        key="FormHeader--component-2"
      >
        {/* blue progress indicator line above header*/}
        <View style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={this.props.onPressBackIcon}>
            <Left
              style={{ flexDirection: 'row', width: 20, alignItems: 'center' }}
            >
              <Icon
                name={this.props.iconName || 'md-arrow-back'}
                style={styles.headerIcon}
                type="Ionicons"
              />
            </Left>
          </TouchableWithoutFeedback>

          {this.props.headerText && (
            <Title style={styles.title}>{this.props.headerText}</Title>
          )}
          {this.props.showTickIcon ? (
            <TouchableWithoutFeedback onPress={this.props.onPressTickIcon}>
              <Right
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}
              >
                <Icon
                  name="md-checkmark"
                  style={styles.tickIcon}
                  type="Ionicons"
                />
              </Right>
            </TouchableWithoutFeedback>
          ) : (
            <Right />
          )}
        </View>
      </View>
    ]
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16
  },
  showBorder: {
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom
  },
  wrapper: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  headerIcon: {
    fontSize: 26,
    color: '#000'
  },
  tickIcon: {
    fontSize: 26,
    color: color.button
  },
  title: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 18,
    color: '#000'
  }
})
