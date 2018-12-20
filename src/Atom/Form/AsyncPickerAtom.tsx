import * as React from 'react'
import { Query } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import { DocumentNode } from 'graphql'
import { UserContext } from '../../context/UserContext'
import PickerAtom, { PickerData } from '../Form/PickerAtom'
import MultiSelectPickerAtom from '../Form/MultiSelectPicker'
import { View } from 'react-native'

interface IProps {
  graphqlQuery: DocumentNode
  placeholder?: string
  selected?: any
  handleSelection?: (value: any) => void
  required?: boolean | false
  label?: string
  underneathText?: string
  graphqlQueryResultKey: string
  error?: any
  user?: any
  type?: 'multi' | any
  emptySection?: {
    emptyText: string
    actionButtonLabel?: string
    actionButtonOnPress?: () => void
  }
}

interface IState {
  queryText: string
}

class AsyncPickerAtom extends React.PureComponent<IProps, IState> {
  state = {
    queryText: ''
  }
  render() {
    const { graphqlQuery, user, graphqlQueryResultKey } = this.props
    return (
      <Query
        variables={{
          queryText: this.state.queryText,
          companyId: user.company.id
        }}
        query={graphqlQuery}
        fetchPolicy="cache-and-network"
      >
        {({ loading, data }) => {
          const responseList = data[graphqlQueryResultKey] || []
          return (
            <View>
              <AppSpinner visible={loading} />
              {this.props.type == 'multi' ? (
                <MultiSelectPickerAtom
                  {...this.props}
                  list={this.getList(responseList)}
                  onSearch={text => this.setState({ queryText: text })}
                  selectedItems={this.getSelected()}
                  handleSelection={itemIds =>
                    this.handleSelection(itemIds, responseList)
                  }
                />
              ) : (
                <PickerAtom
                  {...this.props}
                  list={this.getList(responseList)}
                  onSearch={text => this.setState({ queryText: text })}
                  emptySection={this.props.emptySection}
                  handleSelection={itemId =>
                    this.handleSelection(itemId, responseList)
                  }
                  selected={this.getSelected()}
                />
              )}
            </View>
          )
        }}
      </Query>
    )
  }

  getSelected = () => {
    if (this.props.type == 'multi') {
      return this.props.selected.map(item => item.id)
    } else {
      return this.props.selected ? this.props.selected.id : ''
    }
  }

  getList = (responseList): PickerData[] => {
    return responseList.map(item => ({
      mainLabel: item.title || item.name || item.contactName,
      value: item.id
    }))
  }

  handleSelection = (selected, list) => {
    if (this.props.type == 'multi') {
      this.handleMultipleSelection(selected, list)
    } else {
      this.handleSingleSelection(selected, list)
    }
  }

  handleMultipleSelection = (itemIds, list) => {
    const items = list.filter(item => itemIds.includes(item.id))
    this.props.handleSelection(items)
  }

  handleSingleSelection = (itemId = [], list) => {
    const item = list.find(item => itemId == item.id)
    this.props.handleSelection(item)
  }
}

const _AsyncPickerAtom = (props: IProps) => (
  <UserContext.Consumer>
    {({ user }) => <AsyncPickerAtom {...props} user={user} />}
  </UserContext.Consumer>
)

export default _AsyncPickerAtom
