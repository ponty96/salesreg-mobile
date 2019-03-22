import * as React from 'react'
import { Label, Icon } from 'native-base'
import {
  Modal,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native'
import * as JsSearch from 'js-search'

import { DemiBoldText, MediumText, RegularText } from '../TextAtom'
import { color } from '../../Style/Color'
import FormHeader from '../../Components/Header/FormHeader'
import { SearchAtom } from '../SearchAtom'
import CachedImageAtom from '../CachedImageAtom'
import RefreshControlAtom from '../RefreshControlAtom'

export interface PickerData {
  icon?: any
  mainLabel: string
  subLabel?: string
  value: string
}

interface IEmptySection {
  emptyText: string | any
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
  disabled?: false
  label?: string
  onHandleOpen?: () => void
  underneathText?: string
  error?: any
  onRefresh?: () => void
  loading?: boolean
  onSearch?: (queryText: string) => void
  emptySection?: IEmptySection
}

interface IState {
  isOpen: boolean
  queryText: string
  list: any
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
        <CachedImageAtom
          uri={props.icon}
          style={{ width: 30, height: 25, marginRight: 24 }}
        />
        <RegularText>{props.label}</RegularText>
      </View>
      <RegularText>{props.subLabel}</RegularText>
    </View>
  </TouchableOpacity>
)

class PickerAtom extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      isOpen: false,
      queryText: '',
      list: this.props.list || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.list !== nextProps.list) {
      this.setState({
        list: nextProps.list
      })
    }
  }

  handleChange = (value: string) => {
    this.props.handleSelection(value)
    this.toggleOpenState()
  }

  toggleOpenState = () => {
    if (!this.state.isOpen && this.props.onHandleOpen) {
      this.props.onHandleOpen()
    }

    this.setState({ isOpen: !this.state.isOpen })
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
    const { selected, placeholder } = this.props,
      { list } = this.state

    if (!selected) {
      return placeholder
    } else if (list.length > 0) {
      const item: any = list.find((item: any) => {
        return item.value == selected
      })

      if (item) {
        return item.mainLabel
      } else {
        return placeholder
      }
    } else {
      return placeholder && placeholder.length > 0
        ? placeholder
        : 'Touch to choose'
    }
  }

  renderEmptyView = () => {
    return this.props.emptySection ? (
      <View style={styles.emptyView}>
        <MediumText style={styles.emptyText}>
          {this.props.emptySection.emptyText}
        </MediumText>
      </View>
    ) : null
  }

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => (!this.props.disabled ? this.toggleOpenState() : null)}
          key="1334334"
          style={styles.picker}
        >
          <Label
            style={{
              color: color.textColor,
              padding: 0
            }}
          >
            <DemiBoldText style={styles.labelText}>
              {this.props.required && (
                <RegularText style={styles.required}>*</RegularText>
              )}
              {this.props.label}
            </DemiBoldText>
          </Label>
          <View style={styles.caretContainer}>
            <RegularText style={styles.placeholderStyle}>
              {this.getPlaceholder()}
            </RegularText>
            <Icon
              name="arrow-down"
              type="SimpleLineIcons"
              style={styles.dropDown}
            />
          </View>
        </TouchableOpacity>
        {this.renderUnderNeathText()}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isOpen}
          onRequestClose={this.toggleOpenState}
          key="133433445566446"
        >
          <React.Fragment>
            <FormHeader
              onPressBackIcon={this.toggleOpenState}
              iconName="md-close"
              currentStep={1}
              totalSteps={1}
              showStepper={false}
              headerText={this.props.label}
            />
            <SearchAtom
              placeholder="Search"
              queryText={this.state.queryText}
              onSearch={this.onSearch}
              containerStyle={{ marginRight: 16 }}
            />
            {!this.props.loading && this.state.list.length > 0 ? (
              <FlatList
                data={this.state.list}
                renderItem={({ item }: any) => (
                  <PickerItem
                    icon={item.icon}
                    onPress={this.handleChange}
                    label={item.mainLabel}
                    value={item.value}
                    isSelected={this.props.selected == item.value}
                    subLabel={item.subLabel}
                  />
                )}
                keyExtractor={(item: any) => item.key}
              />
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                refreshControl={
                  <RefreshControlAtom onRefresh={this.props.onRefresh} />
                }
              >
                {this.renderEmptyView()}
              </ScrollView>
            )}
          </React.Fragment>
        </Modal>
      </React.Fragment>
    )
  }
  renderUnderNeathText = () => {
    if (this.props.error || this.props.underneathText) {
      return (
        <RegularText
          style={[
            styles.underneathText,
            {
              color: this.props.error ? 'red' : color.principal
            }
          ]}
        >
          {this.props.error || this.props.underneathText}
        </RegularText>
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
  labelText: {
    padding: 0,
    fontSize: 16,
    color: color.textColor
  },
  required: {
    color: color.inactive,
    fontSize: 14
  },
  placeholderStyle: {
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
  emptyView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'AvenirNext-Medium'
  }
})

export default PickerAtom
