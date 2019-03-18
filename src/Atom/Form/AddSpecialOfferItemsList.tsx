import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon } from 'native-base'

import InputAtom from './InputAtom'
import AsyncPickerAtom from './AsyncPickerAtom'
import ButtonAtom from './ButtonAtom'
import { SearchProductsByName } from '../../graphql/queries/store'
import { color } from '../../Style/Color'

interface IOfferInput {
  productId?: string
  maxQuantity: string
  name?: string
  priceSlashTo: string
}

interface IProps {
  offerItems: IOfferInput[]
  error: string
  onUpdateItems: (items: IOfferInput[]) => void
}

interface OfferItem {
  item: IOfferInput
  index: number
  handleValueChange: (index: number, key: string, value: any) => void
  onTrashItem: (index: number) => void
}

const AddOfferItem = (props: OfferItem) => {
  return (
    <View style={styles.offerItemWrapper}>
      <Icon
        name="md-close"
        type="Ionicons"
        style={styles.closeIcon}
        onPress={() => props.onTrashItem(props.index)}
      />
      <AsyncPickerAtom
        graphqlQuery={SearchProductsByName}
        graphqlQueryResultKey="searchProductsByName"
        label={`Item ${props.index + 1}`}
        type="single"
        placeholder={
          props.item.name && props.item.name.length > 0
            ? props.item.name
            : 'Touch to choose'
        }
        selected={{
          id: props.item.productId
        }}
        handleSelection={val => {
          props.handleValueChange(props.index, 'item', val)
        }}
        emptySection={{
          emptyText:
            'At least one product needs to be created to make a sales order'
        }}
      />
      <View style={styles.offerInputRow}>
        <InputAtom
          label={`Price(\u20A6)`}
          placeholder="0.00"
          defaultValue={props.item.priceSlashTo}
          getValue={val =>
            props.handleValueChange(props.index, 'priceSlashTo', val)
          }
          containerStyle={{ flex: 1 }}
          contStyle={StyleSheet.flatten([
            styles.offerInput,
            { marginLeft: 0, marginRight: 0 }
          ])}
        />
        <InputAtom
          label="Max. Quantity"
          placeholder="0"
          defaultValue={props.item.maxQuantity}
          getValue={val =>
            props.handleValueChange(props.index, 'maxQuantity', val)
          }
          contStyle={styles.offerInput}
          containerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  )
}

export default class AddSpecialOfferItemsList extends React.PureComponent<
  IProps
> {
  handleValueChange = (index: number, key: string, value: any) => {
    const { offerItems } = this.props
    let items = []

    let _item =
      key == 'item'
        ? {
            name: value.name,
            productId: value.id
          }
        : { [key]: value }

    items = [
      ...offerItems.slice(0, index),
      { ...offerItems[index], ..._item },
      ...offerItems.slice(index + 1)
    ]

    this.props.onUpdateItems(items)
  }

  addAnotherItem = () => {
    const offerItems = this.props.offerItems.concat([
      {
        productId: null,
        name: '',
        priceSlashTo: '0.00',
        maxQuantity: ''
      }
    ])
    this.props.onUpdateItems(offerItems)
  }

  trashItem = index => {
    const { offerItems } = this.props
    const items =
      offerItems.length == 1
        ? []
        : [...offerItems.slice(0, index), ...offerItems.slice(index + 1)]
    this.props.onUpdateItems(items)
  }

  renderErrorText = () => {
    return this.props.error ? (
      <Text style={styles.errorText}>{this.props.error}</Text>
    ) : null
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderErrorText()}
        {this.props.offerItems.map((item, index) => (
          <AddOfferItem
            key={index}
            index={index}
            item={item}
            handleValueChange={this.handleValueChange}
            onTrashItem={this.trashItem}
          />
        ))}
        <View style={styles.buttonWrapper}>
          <ButtonAtom
            btnText="Another Item"
            type="primary"
            onPress={this.addAnotherItem}
            icon="md-add"
            btnStyle={{
              borderWidth: 1.5,
              borderColor: color.button
            }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  offerItemWrapper: {
    borderWidth: 1,
    borderColor: color.textBorderBottom,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 5,
    marginTop: 24,
    paddingTop: 8
  },
  errorText: {
    marginLeft: 0,
    fontSize: 14,
    marginBottom: 2,
    marginTop: 0,
    fontFamily: 'AvenirNext-Regular',
    color: 'red',
    paddingVertical: 12
  },
  closeIcon: {
    color: color.textColor,
    fontSize: 22,
    textAlign: 'right'
  },
  offerInputRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: '100%'
  },
  buttonWrapper: {
    alignSelf: 'flex-start',
    marginTop: 8
  },
  itemPicker: {
    marginTop: 0
  },
  offerInput: {
    marginLeft: 10,
    marginTop: 0
  },
  text: {
    fontSize: 15,
    color: color.textColor,
    fontFamily: 'AvenirNext-DemiBold'
  }
})
