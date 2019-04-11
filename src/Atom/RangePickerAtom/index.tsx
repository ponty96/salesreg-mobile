import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Icon, Content } from 'native-base'
import moment from 'moment'

import { DemiBoldText } from '../TextAtom'
import DateRangePicker from './DateRangePicker'
import { color } from '../../Style/Color'

interface IProps {
  onRequestClose: () => void
  visible: boolean
  startDate: string
  endDate: string
  onSave: (start: string, end: string, groupBy: any) => void
}

interface IState {
  startDate: string | undefined
  endDate: string | undefined
  initialStartDateOnRender: string | undefined
  initialEndDateOnRender: string | undefined
}

export default class RangePickerAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    startDate: undefined,
    endDate: undefined,
    initialStartDateOnRender: undefined,
    initialEndDateOnRender: undefined
  }

  componentDidUpdate(prevProps) {
    let { startDate, endDate } = this.props
    if (prevProps.visible == false && this.props.visible == true) {
      this.setState({
        initialStartDateOnRender: startDate,
        initialEndDateOnRender: endDate
      })
    }
  }

  getGroupedby = duration => {
    if (duration <= 7) {
      return 'DAILY'
    } else if (duration > 7 && duration <= 30) {
      return 'WEEKLY'
    } else if (duration > 30 && duration <= 365) {
      return 'MONTHLY'
    }
    return 'YEARLY'
  }

  saveFilter = () => {
    let { startDate, endDate } = this.state,
      duration = moment(endDate).diff(moment(startDate), 'days'),
      groupBy = this.getGroupedby(duration)

    this.props.onRequestClose()
    this.props.onSave(startDate, endDate, groupBy)
  }

  renderHeader = () => (
    <React.Fragment>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          type="MaterialIcons"
          style={styles.icon}
          onPress={this.props.onRequestClose}
        />
        <DemiBoldText>Data Settings</DemiBoldText>
        <DemiBoldText onPress={this.saveFilter}>SAVE</DemiBoldText>
      </View>
      <View style={styles.header}>
        <DemiBoldText>
          From:{' '}
          {moment(this.state.startDate || this.props.startDate).format(
            'Do MMM, YYYY'
          )}
        </DemiBoldText>
        <DemiBoldText>
          To:{' '}
          {moment(this.state.endDate || this.props.endDate).format(
            'Do MMM, YYYY'
          )}
        </DemiBoldText>
      </View>
    </React.Fragment>
  )

  renderArrows = direction => {
    return direction == 'left' ? (
      <Icon
        name="md-arrow-back"
        type="Ionicons"
        style={[styles.icon, styles.calendarIcon]}
      />
    ) : (
      <Icon
        name="md-arrow-forward"
        type="Ionicons"
        style={[styles.icon, styles.calendarIcon]}
      />
    )
  }

  renderCalendar = () => (
    <DateRangePicker
      renderArrow={this.renderArrows}
      style={{
        marginHorizontal: -4
      }}
      initialRange={[
        this.state.initialStartDateOnRender || moment().format('YYYY-MM-DD'),
        this.state.initialEndDateOnRender || moment().format('YYYY-MM-DD')
      ]}
      monthFormat="MMMM yyyy"
      theme={{ markColor: color.green, markTextColor: 'white' }}
      onSuccess={(startDate, endDate) =>
        this.setState({
          startDate,
          endDate
        })
      }
    />
  )

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.container}>
          {this.renderHeader()}
          <Content>{this.renderCalendar()}</Content>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  icon: {
    fontSize: 25
  },
  calendarIcon: {
    color: color.green
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 16
  }
})
