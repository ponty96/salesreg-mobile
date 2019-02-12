import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity
} from 'react-native'
import { ActionSheet } from 'native-base'
import ListItemAtom from '../../Atom/ListItem/ListItemAtom'
import { color } from '../../Style/Color'
import Icon from '../../Atom/Icon'
import { GreenCanvas } from '../../Atom/GreenCanvas'
import FabAtom from '../../Atom/FabAtom'
import { DocumentNode } from 'graphql'
import { Mutation } from 'react-apollo'
import AppSpinner from '../Spinner'
var BUTTONS = ['Yes, delete', 'Cancel']
var DESTRUCTIVE_INDEX = 0
var CANCEL_INDEX = 1

interface Item {
  itemTitle: string
  itemValue: string
  isTotalAmount?: boolean
  itemQuantity?: string
}

interface IProps {
  title: string
  totalAmount: string
  items: Item[]
  shouldShowStatus?: boolean
  status?: string
  onPressStatus?: () => void
  onTrash?: () => void
  hideTotal?: boolean
  fabRouteParams?: any
  hideNairaSymbolInGreenCanvas?: boolean
  showFab?: boolean
  fabRouteName?: string
  navigation?: any
  fabIconName?: string
  fabIconType?: string
  fabOnPress?: () => void
  graphqlDeleteMutation?: DocumentNode
  graphqlRefetchQueries?: any[]
  graphqlDeleteVariables?: {}
  graphqlDeleteMutationResultKey?: string
  enableDelete?: boolean
  onSuccessfulDeletion?: () => void
}

const renderStatusIndicator = (bottomRightText: string): any => {
  let borderStyle: any = {
    borderLeftWidth: 4
  }
  switch (bottomRightText) {
    case 'pending':
    case 'delivered':
    case 'delivering':
    case 'recalled':
    case 'processed':
      borderStyle = {
        ...borderStyle,
        borderLeftColor: color[`${bottomRightText}BorderIndicator`]
      }
      break
    default:
      borderStyle = {}
      break
  }
  return borderStyle
}

export default class GenericDetailsComponent extends Component<IProps> {
  static defaultProps = {
    hideTotal: false,
    showFab: false,
    enableDelete: true
  }

  getItems = () => {
    const { items, totalAmount } = this.props
    if (this.props.hideTotal) {
      return items
    } else {
      return items.concat([
        {
          itemTitle: 'TOTAL',
          itemValue: totalAmount,
          isTotalAmount: true
        }
      ])
    }
  }
  renderItem = ({ item }: any) =>
    item.itemTitle == 'Status' ? (
      this.statusListItem(item)
    ) : (
      <ListItemAtom
        label={item.itemTitle}
        value={item.itemValue}
        quantity={item.itemQuantity}
        labelStyle={item.isTotalAmount ? styles.whiteLabel : styles.listLabel}
        rightTextStyle={
          item.isTotalAmount
            ? styles.whiteLabel
            : StyleSheet.flatten([
                styles.greenText,
                { fontFamily: 'AvenirNext-Regular' }
              ])
        }
        listItemStyle={
          item.isTotalAmount ? styles.totalAmountListItem : styles.listWrapper
        }
      />
    )

  statusListItem = item => {
    return (
      <TouchableOpacity onPress={this.props.onPressStatus}>
        <ListItemAtom
          label={item.itemTitle}
          value={item.itemValue}
          quantity={item.itemQuantity}
          labelStyle={styles.listLabel}
          rightTextStyle={styles.blueText}
          listItemStyle={[
            styles.listWrapper,
            renderStatusIndicator(item.itemValue)
          ]}
          icon={
            <Icon
              name="chevron-small-right"
              type="Entypo"
              style={{ color: color.button, fontSize: 20, marginTop: 8 }}
            />
          }
        />
      </TouchableOpacity>
    )
  }

  renderDetailsUI = (deleteFn?: (variables: any) => void) => {
    const {
      title,
      totalAmount,
      fabRouteName,
      navigation,
      fabIconName,
      fabIconType,
      fabOnPress
    } = this.props

    return (
      <View style={styles.container}>
        <GreenCanvas
          hideNairaSymbolInGreenCanvas={this.props.hideNairaSymbolInGreenCanvas}
          title={title}
          subText={totalAmount}
        />
        <FlatList
          data={this.getItems()}
          style={{ height: 310 }}
          renderItem={this.renderItem}
          keyExtractor={(item: any) => item.id}
        />
        {this.props.enableDelete && (
          <TouchableOpacity
            style={{
              backgroundColor: color.trashContainer,
              justifyContent: 'center',
              alignItems: 'flex-end'
            }}
            onPress={() =>
              this.handleDelete(() =>
                deleteFn({ variables: this.props.graphqlDeleteVariables })
              )
            }
          >
            <Icon
              type="EvilIcons"
              name="trash"
              style={{ color: color.trashIcon, fontSize: 60 }}
            />
          </TouchableOpacity>
        )}
        {this.props.showFab && (
          <FabAtom
            routeName={fabRouteName}
            navigation={navigation}
            onPress={fabOnPress}
            goto={this.props.fabRouteParams || {}}
            name={fabIconName}
            type={fabIconType}
          />
        )}
      </View>
    )
  }

  handleDelete = cb => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Delete?'
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          cb()
        }
      }
    )
  }

  onDeleteCompleted = async res => {
    const {
      [this.props.graphqlDeleteMutationResultKey]: { success, fieldErrors }
    } = res
    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            'Error',
            fieldErrors[0].message,
            [{ text: 'Ok', onPress: () => null }],
            { cancelable: false }
          ),
        100
      )
    } else {
      console.log('This was successful ', success)
      this.props.onSuccessfulDeletion()
    }
  }

  render() {
    let {
      enableDelete,
      graphqlDeleteMutation,
      graphqlRefetchQueries
    } = this.props
    if (enableDelete) {
      return (
        <Mutation
          mutation={graphqlDeleteMutation}
          onCompleted={this.onDeleteCompleted}
          refetchQueries={graphqlRefetchQueries || []}
          awaitRefetchQueries={true}
        >
          {(deleteDetails, { loading }) => (
            <React.Fragment>
              <AppSpinner visible={loading} />
              {this.renderDetailsUI(deleteDetails)}
            </React.Fragment>
          )}
        </Mutation>
      )
    }
    return this.renderDetailsUI()
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  listLabel: {
    color: color.textColor,
    marginLeft: 2,
    fontFamily: 'AvenirNext-DemiBold'
  },
  listWrapper: {
    borderBottomColor: color.listBorderColor,
    borderBottomWidth: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  greenText: {
    color: color.selling,
    fontFamily: 'AvenirNext-Regular'
  },
  totalAmountListItem: {
    backgroundColor: color.selling,
    paddingLeft: 24,
    paddingRight: 24
  },
  whiteLabel: {
    color: '#fff',
    fontFamily: 'AvenirNext-DemiBold'
  },
  blueText: {
    color: color.button,
    fontFamily: 'AvenirNext-Regular'
  }
})
