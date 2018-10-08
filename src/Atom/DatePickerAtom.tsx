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

export default class DatePickerAtom extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Item
          stackedLabel={true}
          style={{
            borderWidth: 0,
            marginLeft: 0,
            borderBottomWidth: 0,
            marginTop: 24,
            height: 80
          }}
        >
          <Label
            style={{
              color: color.textColor,
              padding: 0,
              paddingTop: 0,
              paddingBottom: 0
            }}
          >
            {this.props.required && <Text style={styles.required}>*</Text>}
            <Text style={styles.labelText}>{this.props.label}</Text>
          </Label>
          <DatePicker
            style={styles.datepickerCont}
            date={this.props.date}
            mode="date"
            placeholder={this.props.placeholder}
            format="YYYY-MM-DD"
            minDate="1800-01-01"
            maxDate={`${Date.now()}`}
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
    color: color.textColor,
    fontFamily: 'AvenirNext-DemiBold'
  },
  btnTextCancel: {
    height: 20,
    color: color.inactive,
    fontFamily: 'AvenirNext-DemiBold'
  },
  placeholderText: {
    color: color.inactive,
    fontFamily: 'AvenirNext-Regular'
  },
  dateText: {
    color: color.principal,
    fontFamily: 'AvenirNext-Regular'
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
  }
})
