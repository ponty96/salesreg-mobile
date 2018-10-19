import * as React from 'react'
import { Label, Text } from 'native-base'
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native'
import { color } from '../../Style/Color'
import FormHeader from '../../Components/Header/FormHeader'

interface PickerData {
  icon?: any
  mainLabel: string
  subLabel?: string
  value: string
}
interface IProps {
  list: PickerData[] | any
  placeholder?: string
  selected?: string
  handleSelection?: (value: any) => void
  width?: string // delete later
  pickerStyle?: any // delete later
  style?: any // delete later
  required?: boolean | false
  label?: string
  underneathText?: string
  error?: any
}

interface IState {
  isOpen: boolean
}

interface PickerItem {
  icon?: any
  label: string
  value: string
  onPress: (val: string) => void
  isSelected: boolean
  subLabel?: string
}
const PickerItem = (props: PickerItem) => (
  <TouchableWithoutFeedback onPress={() => props.onPress(props.value)}>
    <View style={styles.pickerItem}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{ uri: props.icon }}
          style={{ width: 30, height: 25, marginRight: 24 }}
        />
        <Text style={styles.pickerItemLabel}>{props.label}</Text>
      </View>
      <Text style={styles.pickerItemLabel}>{props.subLabel}</Text>
    </View>
  </TouchableWithoutFeedback>
)

class PickerAtom extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleChange = (value: string) => {
    this.props.handleSelection(value)
    this.toggleOpenState()
  }

  toggleOpenState = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  getPlaceholder = () => {
    const { selected, placeholder, list } = this.props
    if (!selected) {
      return placeholder
    } else if (list.length > 0) {
      const item: any = list.find((item: any) => item.value == selected)
      if (item) {
        return item.mainLabel
      } else {
        return placeholder
      }
    } else {
      return 'Touch to choose'
    }
  }
  render() {
    return [
      <TouchableOpacity
        onPress={() => this.toggleOpenState()}
        key="1334334"
        style={styles.picker}
      >
        <Label
          style={{
            color: color.textColor,
            padding: 0
          }}
        >
          <Text style={styles.labelText}>
            {this.props.required && <Text style={styles.required}>*</Text>}
            {this.props.label}
          </Text>
        </Label>
        <Text style={styles.placeholderStyle}>{this.getPlaceholder()}</Text>
      </TouchableOpacity>,
      this.renderUnderNeathText(),
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isOpen}
        onRequestClose={this.toggleOpenState}
        key="133433445566446"
      >
        <FormHeader
          onPressBackIcon={this.toggleOpenState}
          iconName="md-close"
          currentStep={1}
          totalSteps={1}
          showStepper={false}
        />
        <FlatList
          data={this.props.list}
          renderItem={({ item }: any) => (
            <PickerItem
              onPress={this.handleChange}
              icon={item.icon}
              label={item.mainLabel}
              value={item.value}
              isSelected={this.props.selected == item.value}
              subLabel={item.subLabel}
            />
          )}
          keyExtractor={(item: any) => item.key}
        />
      </Modal>
    ]
  }
  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <Text
          style={[
            styles.underneathText,
            {
              fontFamily: 'AvenirNext-Regular',
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </Text>
      )
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    zIndex: 9999,
    marginTop: 24,
    height: 72,
    marginLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom,
    paddingBottom: 0
  },
  labelText: {
    fontFamily: 'AvenirNext-DemiBold',
    padding: 0,
    fontSize: 16,
    color: color.textColor
  },
  required: {
    color: color.inactive,
    fontSize: 14
  },
  placeholderStyle: {
    fontFamily: 'AvenirNext-Regular',
    color: color.principal,
    fontSize: 16,
    padding: 0,
    textAlign: 'left',
    marginTop: 17
  },
  pickerItem: {
    padding: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pickerItemLabel: {
    fontFamily: 'AvenirNext-Regular'
  },
  underneathText: {
    marginLeft: 0,
    color: color.textColor,
    fontSize: 14,
    marginBottom: 0,
    marginTop: 2,
    paddingLeft: 8,
    fontFamily: 'AvenirNext-Regular',
    paddingVertical: 12
  }
})

export default PickerAtom