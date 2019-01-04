import * as React from 'react'
import { Label, Text, Icon } from 'native-base'
import {
  Modal,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import { color } from '../../Style/Color'
import FormHeader from '../../Components/Header/FormHeader'
import * as JsSearch from 'js-search'
import { SearchAtom } from '../SearchAtom'

interface PickerData {
  icon?: any
  mainLabel: string
  subLabel?: string
  value: string
}

interface IProps {
  list: PickerData[] | any
  placeholder?: string
  selectedItems?: string[]
  handleSelection?: (value: any) => void
  width?: string // delete later
  pickerStyle?: any // delete later
  style?: any // delete later
  required?: boolean | false
  label?: string
  loading?: boolean
  underneathText?: string
  error?: any
  onSearch?: (queryText: string) => void
  onHandleOpen?: () => void
  emptySection?: {
    emptyText: string
  }
}

interface IState {
  isOpen: boolean
  queryText: string
  list: any
  selectedItems?: string[]
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
  <TouchableOpacity onPress={() => props.onPress(props.value)}>
    <View style={styles.pickerItem}>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={[styles.checkBox, props.isSelected && styles.isSelected]}
        />
        <Text style={styles.pickerItemLabel}>{props.label}</Text>
      </View>
      <Text style={styles.pickerItemLabel}>{props.subLabel}</Text>
    </View>
  </TouchableOpacity>
)

class PickerAtom extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isOpen: false,
      queryText: '',
      list: this.props.list || [],
      selectedItems: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({
        list: nextProps.list
      })
    }
    if (this.props.selectedItems !== nextProps.selectedItems) {
      this.setState({
        selectedItems: nextProps.selectedItems
      })
    }
  }

  handleChange = (value: string) => {
    let selectedItems = []
    const valueAlreadySelected = this.state.selectedItems.find(
      item => item == value
    )
    if (valueAlreadySelected) {
      selectedItems = this.state.selectedItems.filter(item => item != value)
    } else {
      selectedItems = [...this.state.selectedItems, value]
    }
    this.setState({
      selectedItems
    })
  }

  toggleOpenState = () => {
    if (!this.state.isOpen && this.props.onHandleOpen) {
      this.props.onHandleOpen()
    }

    this.setState({ isOpen: !this.state.isOpen })
  }

  closePicker = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      this.props.handleSelection(this.state.selectedItems)
    })
  }

  onSearch = text => {
    if (this.props.onSearch) {
      this.setState({ queryText: text }, () => this.props.onSearch(text))
    } else {
      let items = this.props.list
      if (text && text.length >= 3) {
        let search = new JsSearch.Search('value')
        search.addIndex('mainLabel')
        search.addIndex('subLabel')
        search.addIndex('value')
        search.addDocuments(items)
        items = search.search(text)
      }
      this.setState({ list: items, queryText: text })
    }
  }

  getPlaceholder = () => {
    const { selectedItems, placeholder } = this.props
    if (selectedItems) {
      return `${selectedItems.length} selected, touch to update`
    } else {
      return placeholder || 'Touch to add'
    }
  }

  renderEmptyView = () => {
    return this.props.emptySection ? (
      <View style={styles.emptyView}>
        <Text style={styles.emptyText}>
          {this.props.emptySection.emptyText}
        </Text>
      </View>
    ) : null
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
        <View style={styles.caretContainer}>
          <Text style={styles.placeholderStyle}>{this.getPlaceholder()}</Text>
          <Icon
            name="arrow-down"
            type="SimpleLineIcons"
            style={styles.dropDown}
          />
        </View>
      </TouchableOpacity>,
      this.renderUnderNeathText(),
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isOpen}
        onRequestClose={this.closePicker}
        key="133433445566446"
      >
        <React.Fragment>
          <FormHeader
            onPressBackIcon={this.closePicker}
            iconName="md-close"
            currentStep={1}
            totalSteps={1}
            showStepper={false}
            showTickIcon={true}
            onPressTickIcon={this.closePicker}
            headerText={this.props.label}
          />
          <SearchAtom
            placeholder="Search"
            queryText={this.state.queryText}
            onSearch={this.onSearch}
            containerStyle={{ marginRight: 16 }}
          />
          {!this.props.loading && this.state.list.length > 0 ? (
            <ScrollView>
              {this.state.list.map((item: any, index: number) => (
                <PickerItem
                  onPress={this.handleChange}
                  icon={item.icon}
                  label={item.mainLabel}
                  value={item.value}
                  isSelected={this.getSelected(item.value)}
                  subLabel={item.subLabel}
                  key={`${item.value}-${index}`}
                />
              ))}
            </ScrollView>
          ) : this.props.loading ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator
                color={color.black}
                size={Platform.OS === 'android' ? 30 : 'large'}
              />
            </View>
          ) : (
            this.renderEmptyView()
          )}
        </React.Fragment>
      </Modal>
    ]
  }

  getSelected = (val): boolean => {
    const item = this.state.selectedItems.find(
      selectedItem => selectedItem == val
    )
    return item ? true : false
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
    justifyContent: 'space-between',
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
  caretContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8
  },
  dropDown: {
    color: color.black,
    fontSize: 13
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
    paddingVertical: 20,
    paddingHorizontal: 16,
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
    paddingLeft: 3,
    fontFamily: 'AvenirNext-Regular',
    paddingVertical: 12
  },
  checkBox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: color.textBorderBottom,
    marginRight: 10
  },
  isSelected: {
    backgroundColor: color.selling, // amountSummaryBg,
    borderColor: color.selling
  },
  emptyView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'AvenirNext-Medium'
  }
})

export default PickerAtom
