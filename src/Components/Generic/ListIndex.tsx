import * as React from 'react'
import {
  View,
  StyleSheet,
  SectionList,
  Text,
  ActivityIndicator,
  Platform
} from 'react-native'
import FabAtom from '../../Atom/FabAtom'
import EmptyList from '../../Components/EmptyList'
import SalesOrderListAtom, {
  DataProps
} from '../../Atom/ListItem/SalesOrderListAtom'
import { color } from '../../Style/Color'
import { Query } from 'react-apollo'
import AppSpinner from '../../Components/Spinner'
import * as _ from 'lodash'
import moment from 'moment'
import { FetchPolicy } from 'apollo-client'
import { DocumentNode } from 'graphql'
import SubHeaderAtom from '../Header/SubHeaderAtom'
import { UserContext } from '../../context/UserContext'

interface SubHeaderProps {
  screen: string
  rightLabel: string
  onPress: () => void
  iconName?: string
}
interface IProps {
  navigation: any
  graphqlQuery: DocumentNode
  fetchPolicy?: FetchPolicy
  graphqlQueryResultKey: string
  parseItemData: (item: any) => DataProps[]
  onItemPress: (item: any) => void
  variables?: any
  headerText: string
  emptyListText: string
  fabRouteName?: string
  fabIconName?: string
  fabIconType?: string
  subHeader?: SubHeaderProps
  shouldRenderFooter?: boolean
  showFab?: boolean
  hideSeparator?: boolean
  user: any
}

interface IState {
  business: any
  hasUserScrolled: boolean
}

const LoadMoreSpinner = () => (
  <ActivityIndicator
    style={styles.loadMore}
    animating={true}
    size={Platform.OS == 'android' ? 20 : 'small'}
    color="#000"
  />
)

class GenericListIndex extends React.Component<IProps, IState> {
  state = {
    business: null,
    hasUserScrolled: false
  }

  static defaultProps = {
    subHeader: null,
    shouldRenderFooter: false,
    showFab: true,
    hideSeparator: false
  }
  componentWillMount() {
    this.updateState()
  }

  updateState = async () => {
    const { user } = this.props
    this.setState({
      business: user.company
    })
  }

  renderList = ({ item: { node } }: any): any => {
    const { parseItemData, onItemPress } = this.props
    const parsedItems = parseItemData(node)
    return parsedItems.map((data: DataProps, index) => (
      <SalesOrderListAtom
        {...data}
        onPress={() => onItemPress(node)}
        key={index}
      />
    ))
  }

  renderSectionHeader = ({ section }: any): JSX.Element => {
    return this.props.hideSeparator ? (
      <View />
    ) : (
      <View style={styles.footerWrapper}>
        <Text style={styles.footerText}>{moment(section.date).calendar()}</Text>
      </View>
    )
  }

  renderSectionFooter = (section, sections): JSX.Element => {
    if (this.props.shouldRenderFooter) {
      const ordersWithinSectionRange = sections.find(
        sec => sec.date == section.date
      )
      const totalSales = this.getSectionTotalSales(
        ordersWithinSectionRange.data
      )
      return (
        <View>
          <View style={styles.footerPallete}>
            <Text style={styles.footerPalleteText}>TOTAL SALES</Text>
            <Text style={styles.footerPalleteText}>
              {`\u20A6 ${totalSales}`}
            </Text>
          </View>
          {/* TODO Calculate profit, considering service */}
        </View>
      )
    } else return <View />
  }

  getSectionTotalSales = (sections): number => {
    return sections.reduce(
      (acc, currentSection) =>
        parseFloat(acc) + parseFloat(currentSection.node.amount),
      '0'
    )
  }

  fetchMore = (fetchMore, after, hasNextPage): void => {
    let { variables, graphqlQueryResultKey } = this.props,
      { business } = this.state

    if (!hasNextPage || !this.state.hasUserScrolled) {
      return
    }

    fetchMore({
      variables: {
        companyId: `${business && business.id}`,
        after,
        first: 10,
        ...variables
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev
        return Object.assign({}, prev, {
          [graphqlQueryResultKey]: {
            ...fetchMoreResult[graphqlQueryResultKey],
            edges: [
              ...prev[graphqlQueryResultKey].edges,
              ...fetchMoreResult[graphqlQueryResultKey].edges
            ]
          }
        })
      }
    })
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
      fabIconType,
      subHeader
    } = this.props
    const { business } = this.state
    return (
      <Query
        query={graphqlQuery}
        variables={{
          companyId: `${business && business.id}`,
          after: null,
          first: 10,
          ...variables
        }}
        fetchPolicy={fetchPolicy || 'cache-first'}
      >
        {({ loading, data, fetchMore }) => {
          const sections = data[graphqlQueryResultKey]
            ? this.parseSections(data[graphqlQueryResultKey])
            : []
          return (
            <View style={styles.container}>
              <AppSpinner visible={!data[graphqlQueryResultKey] && loading} />
              {subHeader && (
                <SubHeaderAtom
                  total={
                    data[graphqlQueryResultKey]
                      ? data[graphqlQueryResultKey].edges.length
                      : 0
                  }
                  screen={subHeader.screen}
                  rightLabel={subHeader.rightLabel}
                  onPressArrow={subHeader.onPress}
                  iconName={subHeader.iconName}
                />
              )}
              <SectionList
                renderItem={this.renderList}
                onEndReachedThreshold={0.99}
                onScroll={() => {
                  !this.state.hasUserScrolled &&
                    this.setState({ hasUserScrolled: true })
                }}
                onEndReached={() =>
                  this.fetchMore(
                    fetchMore,
                    data[graphqlQueryResultKey]
                      ? data[graphqlQueryResultKey].pageInfo.endCursor
                      : null,
                    data[graphqlQueryResultKey]
                      ? data[graphqlQueryResultKey].pageInfo.hasNextPage
                      : false
                  )
                }
                ListEmptyComponent={
                  <EmptyList
                    type={{
                      Text: emptyListText,
                      verifyMainList: 'main',
                      headerText: headerText
                    }}
                  />
                }
                sections={sections}
                keyExtractor={(item, index) => item.node.id + index}
                renderSectionHeader={this.renderSectionHeader}
                renderSectionFooter={({ section }) =>
                  this.renderSectionFooter(section, sections)
                }
              />
              {data[graphqlQueryResultKey] && loading && <LoadMoreSpinner />}
              {this.props.showFab && (
                <FabAtom
                  routeName={fabRouteName}
                  navigation={navigation}
                  name={fabIconName}
                  type={fabIconType}
                />
              )}
            </View>
          )
        }}
      </Query>
    )
  }

  parseSections = sections => {
    const grouped =
      _.groupBy(sections.edges, section => section.node.date) || {}

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

const _GenericListIndex = props => (
  <UserContext.Consumer>
    {({ user }) => <GenericListIndex {...props} user={user} />}
  </UserContext.Consumer>
)

export default _GenericListIndex

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
  },
  footerPallete: {
    backgroundColor: color.selling,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerPalleteText: {
    color: '#fff',
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 16
  },
  loadMore: {
    alignSelf: 'center',
    marginVertical: 10
  }
})
