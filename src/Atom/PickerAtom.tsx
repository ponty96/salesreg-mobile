import * as React from 'react'
import { Font, AppLoading } from 'expo'
import { Root, Picker, Icon } from 'native-base'

interface IProps {
  list: Array<any>
  style?: object
  placeholder: string
  selected?: string
  handleSelection?: (value: any) => void
}

interface IState {
  selected: string
  loading: boolean
}

class PickerAtom extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      selected: this.props.selected,
      loading: true
    }
  }
  handleChange(value: string) {
    this.setState({
      selected: value
    })
    this.props.handleSelection(value)
  }
  componentDidMount() {
    Font.loadAsync({
      SourceSansPro: require('../../Fonts/SourceSansPro-Regular.ttf'),
      SourceSansPro_Semibold: require('../../Fonts/SourceSansPro-Semibold.ttf'),
      SourceSansPro_Bold: require('../../Fonts/SourceSansPro-Bold.ttf')
    })
    this.setState({ loading: false })
  }

  render() {
    let list = this.props.list
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <Picker
        iosHeader="Select Gender"
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={this.props.style}
        selectedValue={this.state.selected}
        onValueChange={this.handleChange.bind(this)}
        placeholder={this.props.placeholder}
        textStyle={{
          fontFamily: 'SourceSansPro',
          textAlign: 'left',
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        {list.map((element, key) => (
          <Picker.Item label={element} value={element} key={key} />
        ))}
      </Picker>
    )
  }
}

export default PickerAtom
