import React from 'react'
import { View, FlatList } from 'react-native'
import ExportIconAtom from '../Atom/ExportIconAtom'
import ActivitiesAtom from '../Atom/ActivitiesAtom'
import EmptyList from './EmptyList'

interface IProps {
  screenText: string
  screenType: string
}

const CUS_ACTIVITIES = [
  {
    key: 1,
    status: 'paid',
    amount: 100000,
    dueDate: '10 day ago',
    title: 'Invoice #0025',
    details: 'Paid'
  },
  {
    key: 2,
    status: 'debt',
    amount: 204000,
    dueDate: '13 day ago',
    title: 'Invoice #0024',
    details: 'Due 28 - 06 - 2018'
  },
  {
    key: 3,
    status: 'invoice',
    amount: 250000,
    dueDate: '1 day ago',
    title: 'Invoice payment',
    details: ''
  },
  {
    key: 4,
    status: 'debt',
    amount: 15000,
    dueDate: '16 day ago',
    title: 'Invoice #0023',
    details: 'Due 25 - 06 - 2018'
  },
  {
    key: 5,
    status: 'paid',
    amount: 1000,
    dueDate: '16 day ago',
    title: 'Invoice #0022',
    details: 'Paid'
  },
  {
    key: 6,
    status: 'paid',
    amount: 13200,
    dueDate: '19 day ago',
    title: 'Invoice #0021',
    details: 'Paid'
  },
  {
    key: 7,
    status: 'debt',
    amount: 7500,
    dueDate: '20 day ago',
    title: 'Invoice #0020',
    details: 'Due 30 - 06 - 2018'
  },
  {
    key: 8,
    status: 'paid',
    amount: 80000,
    dueDate: '1 day ago',
    title: 'Invoice #0019',
    details: 'Paid'
  },
  {
    key: 9,
    status: 'invoice',
    amount: 3000,
    dueDate: '1 day ago',
    title: 'Invoice payment',
    details: ''
  },
  {
    key: 10,
    status: 'invoice',
    amount: 11000,
    dueDate: '1 day ago',
    title: 'Invoice payment',
    details: ''
  }
]

const VEN_ACTIVITIES = [
  {
    key: 1,
    status: 'paid',
    amount: 100000,
    dueDate: '10 day ago',
    title: 'Outstanding #0025',
    details: 'Paid'
  },
  {
    key: 2,
    status: 'debt',
    amount: 204000,
    dueDate: '13 day ago',
    title: 'Outstanding #0024',
    details: 'Due 28 - 06 - 2018'
  },
  {
    key: 3,
    status: 'invoice',
    amount: 250000,
    dueDate: '1 day ago',
    title: 'Expense #2343',
    details: ''
  },
  {
    key: 4,
    status: 'debt',
    amount: 15000,
    dueDate: '16 day ago',
    title: 'Outstanding #0023',
    details: 'Due 25 - 06 - 2018'
  },
  {
    key: 5,
    status: 'paid',
    amount: 1000,
    dueDate: '16 day ago',
    title: 'Outstanding #0022',
    details: 'Paid'
  },
  {
    key: 6,
    status: 'paid',
    amount: 13200,
    dueDate: '19 day ago',
    title: 'Outstanding #0021',
    details: 'Paid'
  },
  {
    key: 7,
    status: 'debt',
    amount: 7500,
    dueDate: '20 day ago',
    title: 'Outstanding #0020',
    details: 'Due 30 - 06 - 2018'
  },
  {
    key: 8,
    status: 'paid',
    amount: 80000,
    dueDate: '1 day ago',
    title: 'Outstanding #0019',
    details: 'Paid'
  },
  {
    key: 9,
    status: 'invoice',
    amount: 3000,
    dueDate: '1 day ago',
    title: 'Expense #2342',
    details: ''
  },
  {
    key: 10,
    status: 'invoice',
    amount: 11000,
    dueDate: '1 day ago',
    title: 'Expense #2341',
    details: ''
  }
]

export default class ActivitiesList extends React.Component<IProps, any> {
  renderItem = ({ item }: any) => {
    return (
      <View>
        <ExportIconAtom status={item.status} />
        <ActivitiesAtom
          dueDate={item.dueDate}
          amount={item.amount}
          status={item.status}
          bar={item.key}
          title={item.title}
          details={item.details}
        />
      </View>
    )
  }
  render() {
    return (
      <FlatList
        data={
          this.props.screenType === 'customer' ? CUS_ACTIVITIES : VEN_ACTIVITIES
        }
        renderItem={this.renderItem}
        ListEmptyComponent={
          <EmptyList
            type={{
              Text: this.props.screenText
            }}
          />
        }
      />
    )
  }
}