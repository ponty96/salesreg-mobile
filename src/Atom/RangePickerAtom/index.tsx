import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Icon, Content } from 'native-base'

import { DemiBoldText } from '../TextAtom'
import DateRangePicker from './DateRangePicker'
import { color } from '../../Style/Color'
import RadioAtom from '../RadioAtom'

interface IProps {
  onRequestClose: () => void
  visible: boolean
  onSave: (start: string, end: string, groupBy: any) => void
}

interface IState {
  groupBy: any
  startDate: string | undefined
  endDate: string | undefined
}

export default class RangePickerAtom extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    groupBy: 'DAILY',
    startDate: undefined,
    endDate: undefined
  }

  setGroupBy = (groupBy: string) => {
    this.setState({
      groupBy
    })
  }

  saveFilter = () => {
    let { startDate, endDate, groupBy } = this.state
    this.props.onRequestClose()
    this.props.onSave(startDate, endDate, groupBy)
  }

  renderHeader = () => (
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

  renderGroupBys = () => (
    <View style={styles.groupByContainer}>
      <DemiBoldText style={styles.groupbyTitle}>GROUP BY</DemiBoldText>
      <RadioAtom
        option="Daily"
        onPress={() => this.setGroupBy('Daily')}
        isSelected={this.state.groupBy == 'Daily'}
        containerStyle={{ paddingVertical: 10 }}
      />
      <RadioAtom
        option="Weekly"
        onPress={() => this.setGroupBy('Weekly')}
        isSelected={this.state.groupBy == 'Weekly'}
        containerStyle={{ paddingVertical: 10 }}
      />
      <RadioAtom
        option="Monthly"
        onPress={() => this.setGroupBy('Monthly')}
        isSelected={this.state.groupBy == 'Monthly'}
        containerStyle={{ paddingVertical: 10 }}
      />
      <RadioAtom
        option="Yearly"
        onPress={() => this.setGroupBy('Yearly')}
        isSelected={this.state.groupBy == 'Yearly'}
        containerStyle={{ paddingVertical: 10 }}
      />
    </View>
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
          <Content>
            {this.renderCalendar()}
            {this.renderGroupBys()}
          </Content>
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
  },
  groupByContainer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 16
  },
  groupbyTitle: {
    marginVertical: 15,
    color: color.principal,
    fontSize: 16
  }
})