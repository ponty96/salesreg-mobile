import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Left } from 'native-base'
import Icon from '../../Atom/Icon'
import { color } from '../../Style/Color'

export interface IProps {
  onPressBackIcon: () => void
  currentStep: number
  totalSteps: number
  showBottomBorder?: boolean
}

export default class FormHeader extends React.PureComponent<IProps> {
  static defaultProps = {
    currentStep: 0,
    totalSteps: 1
  }
  progressIndicatorStyle = () => {
    const { currentStep, totalSteps } = this.props
    return {
      height: 5,
      backgroundColor: color.button,
      width: `${(currentStep / totalSteps) * 100} %`,
      marginTop: 16
    }
  }
  render = () => [
    <View
      style={this.progressIndicatorStyle()}
      key="FormHeader--component-1"
    />,
    <View
      style={[styles.header, this.props.showBottomBorder && styles.showBorder]}
      key="FormHeader--component-2"
    >
      {/* blue progress indicator line above header*/}
      <View style={styles.wrapper}>
        <Left style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name="md-arrow-back"
            onPress={this.props.onPressBackIcon}
            style={styles.headerIcon}
            type="Ionicons"
          />
        </Left>
      </View>
    </View>
  ]
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
  }
})
