import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  headerText?: string
  firstHeader: string
  sideText1?: string
  sideText2?: string
  sideText3?: string
  sideText4?: string
}

class FormContainerHalfAtom extends React.Component<IProps, any> {
  getInput = (key: string) => {
    const child: any = this.props.children
    return child.filter((comp: any) => {
      return comp.key === key
    })
  }
  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.headerText}>{this.props.firstHeader}</Text>
        <View style={styles.inputViewForTwoAndMore}>
          <View style={styles.innerInputViewForTwo}>
            <View style={styles.sideTextWithInput}>
              <Text style={styles.blueSideText}>{this.props.sideText1}</Text>
            </View>
            <View style={styles.width70}>{this.getInput('phone')}</View>
          </View>
          <View style={styles.innerInputViewForTwo}>
            <View style={styles.sideTextWithInput}>
              <Text style={styles.blueSideText}>{this.props.sideText2}</Text>
            </View>
            <View style={styles.width70}>{this.getInput('mobile')}</View>
          </View>
          <View style={styles.innerInputViewForTwo}>
            <View style={styles.sideTextWithInput}>
              <Text style={styles.blueSideText}>{this.props.sideText3}</Text>
            </View>
            <View style={styles.width70}>{this.getInput('fax')}</View>
          </View>
          <View style={styles.innerInputViewForTwo}>
            <View style={styles.sideTextWithInput}>
              <Text style={styles.blueSideText}>{this.props.sideText4}</Text>
            </View>
            <View style={styles.width70}>{this.getInput('email')}</View>
          </View>
        </View>
      </View>
    )
  }
}

export default FormContainerHalfAtom

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  headerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  },
  innerInputViewForTwo: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputViewForTwoAndMore: {
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    padding: 3,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 3
  },
  sideTextWithInput: {
    width: '25%',
    alignItems: 'center'
  },
  width70: {
    width: '70%'
  },
  blueSideText: {
    fontSize: 16,
    paddingLeft: 16,
    color: color.button,
    fontFamily: 'SourceSansPro_Semibold'
  }
})
