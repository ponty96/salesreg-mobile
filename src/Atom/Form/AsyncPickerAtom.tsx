import * as React from 'react'
import { Query } from 'react-apollo'
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
    emptyText: string | any
  }
}

interface IState {
  queryText: string
  skip: boolean
}

class AsyncPickerAtom extends React.PureComponent<IProps, IState> {
  state = {
    queryText: '',
    skip: true
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
        skip={this.state.skip}
      >
        {({ loading, data, error, refetch, networkStatus }) => {
          const responseList = (data && data[graphqlQueryResultKey]) || []

          return (
            <View>
              {this.props.type == 'multi' ? (
                <MultiSelectPickerAtom
                  {...this.props}
                  loading={loading || networkStatus == 2 || networkStatus == 4}
                  onRefresh={refetch}
                  emptySection={
                    error && responseList.length == 0
                      ? {
                          emptyText:
                            'Oops!!! Error occurred while connecting, pull down to refresh'
                        }
                      : this.props.emptySection
                  }
                  list={this.getList(responseList)}
                  onSearch={text => this.setState({ queryText: text })}
                  selectedItems={this.getSelected()}
                  onHandleOpen={() => this.setState({ skip: false })}
                  handleSelection={itemIds =>
                    this.handleSelection(itemIds, responseList)
                  }
                />
              ) : (
                <PickerAtom
                  {...this.props}
                  loading={loading || networkStatus == 2 || networkStatus == 4}
                  onRefresh={refetch}
                  list={this.getList(responseList)}
                  onSearch={text => this.setState({ queryText: text })}
                  emptySection={
                    error && responseList.length == 0
                      ? {
                          emptyText:
                            'Error occurred while connecting, pull down to refresh'
                        }
                      : this.props.emptySection
                  }
                  handleSelection={itemId =>
                    this.handleSelection(itemId, responseList)
                  }
                  onHandleOpen={() => this.setState({ skip: false })}
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
