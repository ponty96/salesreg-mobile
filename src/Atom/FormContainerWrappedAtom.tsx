import * as React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  headerText?: string
}

class FormContainerWrappedAtom extends React.Component<IProps, any> {
  getInput = (key: string) => {
    const child: any = this.props.children
    return child.filter((comp: any) => {
      return comp.key === key
    })
  }
  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.headerText}>{this.props.headerText}</Text>
        <View style={styles.inputViewForTwoAndMore}>
          <View style={styles.innerInputViewForTwo}>
            {this.getInput('birthday')}
            {this.getInput('maritalStatus')}
          </View>
          <View style={styles.innerInputViewForTwo}>
            {this.getInput('marriageAnn')}
          </View>
        </View>
      </View>
    )
  }
}

export default FormContainerWrappedAtom

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
  }
})
