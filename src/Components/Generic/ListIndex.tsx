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
import ErrorViewAtom from '../../Atom/ErrorViewAtom'
import { observableStore } from '../../client'

interface SubHeaderProps {
  screen: string
  rightLabel: string | any
  onPress: (sections?: any) => void
  iconName?: string
  iconType?: string
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
  forceUpdateID?: number
  emptyListText: string
  fabRouteName?: string
  fabIconName?: string
  sectionHeaderContainerStyle?: object
  fabIconType?: string
  subHeader?: SubHeaderProps
  shouldRenderFooter?: boolean
  showFab?: boolean
  showFabFn?: (val?: any) => any
  hideSeparator?: boolean
  user: any
  queryText?: string
}

interface IState {
  business: any
  queryText: String
  layoutHeight: number
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
  private IS_FETCHING: boolean = false
  state = {
    business: null,
    queryText: this.props.queryText,
    hasUserScrolled: false,
    layoutHeight: 0
  }

  static defaultProps = {
    subHeader: null,
    shouldRenderFooter: false,
    showFab: true,
    showFabFn: function() {
      return true
    },
    hideSeparator: false
  }

  private refetchQuery = (obj?: any) => obj
  private timerRef: any
  private networkStatus: number

  componentDidUpdate(prevProps) {
    if (
      this.props.forceUpdateID &&
      prevProps.forceUpdateID != this.props.forceUpdateID
    ) {
      this.refetchQuery()
    }

    if (this.props.queryText && this.props.queryText != prevProps.queryText) {
      this.timerRef && this.timerRef.unsubscribe()
      this.setState({
        queryText: this.props.queryText.trim()
      })
    } else if (
      typeof this.props.queryText == 'string' &&
      this.props.queryText.trim().length == 0 &&
      this.props.queryText != prevProps.queryText
    ) {
      this.setState({
        queryText: this.props.queryText.trim()
      })
    }
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
      <View
        style={StyleSheet.flatten([
          styles.footerWrapper,
          this.props.sectionHeaderContainerStyle
        ])}
      >
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
    this.IS_FETCHING = true
    let { variables, graphqlQueryResultKey } = this.props,
      { business } = this.state

    if (!hasNextPage || !this.state.hasUserScrolled) {
      this.IS_FETCHING = false
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

        this.IS_FETCHING = false
        return Object.assign({}, prev, {
          [graphqlQueryResultKey]: {
            ...fetchMoreResult[graphqlQueryResultKey],
            edges: [
              ...fetchMoreResult[graphqlQueryResultKey].edges,
              ...prev[graphqlQueryResultKey].edges
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
      subHeader,
      queryText
    } = this.props
    const { business } = this.state

    return (
      <Query
        query={graphqlQuery}
        notifyOnNetworkStatusChange={true}
        variables={{
          queryText: this.state.queryText,
          companyId: `${business && business.id}`,
          after: null,
          first: 10,
          ...variables
        }}
        context={{
          timeoutRef: (timerRef: any) => {
            this.timerRef = timerRef
          },
          onTimeOut: () => {
            if (
              this.networkStatus == 4 ||
              this.networkStatus == 8 ||
              this.networkStatus == 2
            ) {
              observableStore.dispatch('timeout', {
                id: Date.now(),
                messgae: 'A timeout error occurred'
              })
            }
          }
        }}
        fetchPolicy={fetchPolicy || 'cache-first'}
      >
        {({ loading, data, error, networkStatus, fetchMore, refetch }) => {
          this.refetchQuery = refetch
          this.networkStatus = networkStatus
          const sections =
            Object.keys(data || {}).length > 0 && data[graphqlQueryResultKey]
              ? this.parseSections(data[graphqlQueryResultKey])
              : []

          return (
            <View style={styles.container}>
              <AppSpinner
                visible={
                  Object.keys(data || {}).length == 0 &&
                  (networkStatus != 2 &&
                    networkStatus != 4 &&
                    networkStatus != 8) &&
                  loading
                }
              />
              {subHeader && (
                <SubHeaderAtom
                  total={
                    data && data[graphqlQueryResultKey]
                      ? data[graphqlQueryResultKey].edges.length
                      : 0
                  }
                  screen={subHeader.screen}
                  rightLabel={
                    typeof subHeader.rightLabel == 'function'
                      ? subHeader.rightLabel(sections)
                      : subHeader.rightLabel
                  }
                  iconType={subHeader.iconType}
                  onPressArrow={() => subHeader.onPress(sections)}
                  iconName={subHeader.iconName}
                />
              )}
              <SectionList
                renderItem={this.renderList}
                stickySectionHeadersEnabled={true}
                onRefresh={() =>
                  refetch({
                    variables: {
                      queryText: this.props.queryText
                        ? this.props.queryText.trim()
                        : '',
                      companyId: `${business && business.id}`,
                      after: null,
                      first: 5,
                      ...this.props.variables
                    }
                  })
                }
                contentContainerStyle={
                  error && Object.keys(data || {}).length == 0
                    ? {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    : {}
                }
                refreshing={
                  (error ||
                    (Object.keys(data || {}).length > 0 &&
                      data[graphqlQueryResultKey])) &&
                  (networkStatus == 4 ||
                    (this.state.layoutHeight <= 0 && networkStatus == 2))
                }
                onEndReachedThreshold={0.9}
                onScroll={({
                  nativeEvent: {
                    contentOffset: { y },
                    layoutMeasurement: { height }
                  }
                }) => {
                  if (y <= 0 || (y >= height - 15 && y <= height))
                    this.setState({ layoutHeight: height })
                  !this.state.hasUserScrolled &&
                    this.setState({ hasUserScrolled: true })
                }}
                onEndReached={() => {
                  !this.IS_FETCHING &&
                    this.fetchMore(
                      fetchMore,
                      data[graphqlQueryResultKey]
                        ? data[graphqlQueryResultKey].pageInfo.endCursor
                        : null,
                      data[graphqlQueryResultKey]
                        ? data[graphqlQueryResultKey].pageInfo.hasNextPage
                        : false
                    )
                }}
                ListEmptyComponent={
                  error && Object.keys(data || {}).length == 0 ? (
                    <ErrorViewAtom />
                  ) : (
                    ((sections.length == 0 && !loading) ||
                      (data && data[graphqlQueryResultKey] && loading)) && (
                      <EmptyList
                        type={{
                          Text:
                            queryText && queryText.trim().length > 0
                              ? `No search results found for "${queryText}"`
                              : emptyListText,
                          verifyMainList:
                            (this.props.showFab && !queryText) ||
                            (this.props.showFab &&
                              queryText &&
                              queryText.trim().length == 0)
                              ? 'main'
                              : '',
                          headerText:
                            queryText && queryText.trim().length > 0
                              ? `"${queryText}" not found`
                              : headerText
                        }}
                      />
                    )
                  )
                }
                sections={sections}
                keyExtractor={(item, index) => item.node.id + index}
                renderSectionHeader={this.renderSectionHeader}
                renderSectionFooter={({ section }) =>
                  this.renderSectionFooter(section, sections)
                }
              />
              {sections.length > 0 &&
                data[graphqlQueryResultKey] &&
                networkStatus == 3 && <LoadMoreSpinner />}
              {this.props.showFab && this.props.showFabFn(sections) ? (
                <FabAtom
                  routeName={fabRouteName}
                  navigation={navigation}
                  name={fabIconName}
                  type={fabIconType}
                />
              ) : (
                <View />
              )}
            </View>
          )
        }}
      </Query>
    )
  }

  parseSections = sections => {
    const grouped =
      _.groupBy(sections.edges, section =>
        moment(section.node.date).format('L')
      ) || {}

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
    borderRadius: 5,
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
