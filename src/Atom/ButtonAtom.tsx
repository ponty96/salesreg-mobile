import * as React from 'react'
import { Font, AppLoading } from 'expo'
import { Root, Button } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  btnText?: string
  transparent?: boolean
  disabled?: boolean
  onPress?: (a: string) => void
  funcValue?: string
  btnStyle?: any
  textStyle?: any
}

class ButtonAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    transparent: false,
    disabled: false
  }

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.funcValue)
    }
  }
  state = {
    loading: true
  }
  async componentDidMount() {
    await Font.loadAsync({
      SourceSansPro: require('../../Fonts/SourceSansPro-Regular.ttf'),
      SourceSansPro_Semibold: require('../../Fonts/SourceSansPro-Semibold.ttf'),
      SourceSansPro_Bold: require('../../Fonts/SourceSansPro-Bold.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <Button
        transparent={this.props.transparent ? this.props.transparent : false}
        disabled={this.props.disabled}
        light={this.props.disabled}
        style={[
          this.props.transparent ? styles.buttonTransparent : styles.buttonRed,
          this.props.disabled && styles.buttonDisabled,
          this.props.btnStyle
        ]}
        onPress={this.onPress}
      >
        <Text
          style={[
            this.props.transparent ? styles.textRed : styles.textTransparent,
            this.props.textStyle,
            { fontFamily: 'SourceSansPro' }
          ]}
        >
          {this.props.btnText}
        </Text>
      </Button>
    )
  }
}

export default ButtonAtom

const styles = StyleSheet.create({
  buttonTransparent: {
    backgroundColor: color.secondary,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 8
  },
  buttonRed: {
    backgroundColor: color.button,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 8,
    borderRadius: 3
  },
  buttonDisabled: {
    backgroundColor: color.inactive,
    paddingHorizontal: 32,
    alignSelf: 'center',
    marginVertical: 8
  },
  textRed: {
    color: color.primary
  },
  textTransparent: {
    color: color.secondary
  }
})
