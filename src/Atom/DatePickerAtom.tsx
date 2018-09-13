import * as React from 'react'
import DatePicker from 'react-native-datepicker'
import { StyleSheet, View } from 'react-native'
import { color } from '../Style/Color'
import { Item, Label, Text } from 'native-base'

interface IProps {
  error: string
  placeholder: string
  date: string
  handleDateSelection: (date: string) => void
  required?: boolean | false
  contStyle?: any
  label?: string
}
interface IState {
  bottomColor: string
  labelColor: string
}

export default class DatePickerAtom extends React.Component<IProps, IState> {
  state = {
    bottomColor: color.textBorderBottom,
    labelColor: color.label
  }

  changeUnderline = (newColor: string): void => {
    if (this.props.error) {
      this.setState({ bottomColor: 'red', labelColor: 'red' })
    } else {
      this.setState({ labelColor: newColor })
    }
  }
  render() {
    return (
      <View>
        <Item
          stackedLabel={true}
          style={{
            borderWidth: 0,
            marginLeft: 0,
            borderBottomWidth: 0,
            marginBottom: 0
          }}
        >
          <Label
            style={{
              color: this.state.labelColor,
              padding: 0,
              fontSize: 14,

              top: 3,
              paddingTop: 0,
              paddingBottom: 0
            }}
          >
            {this.props.required && <Text style={styles.required}>*</Text>}
            <Text style={[styles.labelText, { color: this.state.labelColor }]}>
              {this.props.label}
            </Text>
          </Label>
          <DatePicker
            style={styles.datepickerCont}
            date={this.props.date}
            mode="date"
            placeholder={this.props.placeholder}
            format="YYYY-MM-DD"
            minDate="1800-01-01"
            maxDate="2018-01-01"
            confirmBtnText="Save"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={this.props.handleDateSelection}
            customStyles={{
              dateTouchBody: styles.datepickerBody,
              dateInput: styles.datepickerInput,
              btnTextConfirm: styles.btnTextConfirm,
              btnTextCancel: styles.btnTextCancel,
              placeholderText: styles.placeholderText,
              dateText: styles.dateText
            }}
          />
        </Item>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  datepickerBody: {
    alignSelf: 'stretch',
    height: 50,
    marginLeft: 4,
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom
  },
  datepickerBodyNoMargin: {
    marginVertical: 0
  },
  datepickerInput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderWidth: 0,
    paddingHorizontal: 0
  },
  datepickerCont: {
    alignSelf: 'stretch',
    width: undefined
  },
  btnTextConfirm: {
    height: 20,
    color: '#666'
  },
  btnTextCancel: {
    height: 20
  },
  placeholderText: {
    color: color.inactive
  },
  dateText: {
    color: color.principal
  },
  labelText: {
    fontFamily: 'Source Sans Pro',
    padding: 0,
    fontSize: 16
  },
  required: {
    color: color.inactive,
    fontSize: 14
  }
})
