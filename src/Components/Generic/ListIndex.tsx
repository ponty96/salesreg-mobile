import * as React from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import FabAtom from '../../Atom/FabAtom'
import EmptyList from '../../Components/EmptyList'
import SalesOrderListAtom, { DataProps } from '../../Atom/SalesOrderListAtom'
import { color } from '../../Style/Color'
import { Query } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import Auth from '../../services/auth'
import * as _ from 'lodash'
import moment from 'moment'
import { FetchPolicy } from 'apollo-client'
import { DocumentNode } from 'graphql'

interface IProps {
  navigation: any
  graphqlQuery: DocumentNode
  fetchPolicy?: FetchPolicy
  graphqlQueryResultKey: string
  parseItemData: (item: any) => DataProps
  onItemPress: (item: any) => void
  variables?: any
  headerText: string
  emptyListText: string
  fabRouteName: string
  fabIconName: string
  fabIconType: string
}

interface IState {
  business: any
}

export default class GenericListIndex extends React.Component<IProps, IState> {
  state = {
    business: null
  }
  componentDidMount() {
    this.updateState()
  }
  updateState = async () => {
    const user = JSON.parse(await Auth.getCurrentUser())
    console.log('user', user)
    this.setState({
      business: user.company
    })
  }

  renderList = ({ item }: any): JSX.Element => {
    const { parseItemData, onItemPress } = this.props
    return (
      <SalesOrderListAtom
        {...parseItemData(item)}
        onPress={() => onItemPress(item)}
      />
    )
  }

  renderSectionHeader = ({ section }: any): JSX.Element => {
    return (
      <View style={styles.footerWrapper}>
        <Text style={styles.footerText}>{moment(section.date).calendar()}</Text>
      </View>
    )
  }

  render() {
    const {
      navigation,
      variables,
      graphqlQuery,
      graphqlQueryResultKey,
      headerText,
      emptyListText,
      fetchPolicy,
      fabRouteName,
      fabIconName,
      fabIconType
    } = this.props
    const { business } = this.state
    return (
      <Query
        query={graphqlQuery}
        variables={{ companyId: `${business && business.id}`, ...variables }}
        fetchPolicy={fetchPolicy || 'cache-and-network'}
      >
        {({ loading, data }) => {
          return (
            <View style={styles.container}>
              <AppSpinner visible={loading} />
              <SectionList
                renderItem={this.renderList}
                ListEmptyComponent={
                  <EmptyList
                    type={{
                      Text: emptyListText,
                      verifyMainList: 'main',
                      headerText: headerText
                    }}
                  />
                }
                sections={
                  data[graphqlQueryResultKey]
                    ? this.parseSections(data[graphqlQueryResultKey])
                    : []
                }
                keyExtractor={(item, index) => item.id + index}
                renderSectionHeader={this.renderSectionHeader}
              />
              <FabAtom
                routeName={fabRouteName}
                navigation={navigation}
                name={fabIconName}
                type={fabIconType}
              />
            </View>
          )
        }}
      </Query>
    )
  }

  parseSections = sections => {
    const grouped = _.groupBy(sections, section => section.date) || {}

    const sectionList = Object.keys(grouped).map(key => ({
      date: key,
      data: grouped[key]
    }))
    const sortedSection = sectionList.sort((sectionA, sectionB) => {
      const a = new Date(sectionA.date)
      const b = new Date(sectionB.date)
      return a > b ? -1 : a < b ? 1 : 0
    })
    return sortedSection
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  footerText: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 12,
    textAlign: 'center',
    borderRadius: 5
  },
  footerWrapper: {
    backgroundColor: color.grey,
    marginHorizontal: 10,
    paddingVertical: 6
  },
  amount: {
    color: color.selling,
    marginTop: 0
  },
  headerRight: {
    marginRight: 32,
    width: 30
  }
})
