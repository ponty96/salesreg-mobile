import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Linking,
  Easing,
  Animated
} from 'react-native'
import { Query } from 'react-apollo'
import React from 'react'
import { Icon } from 'native-base'

import { color } from '../../Style/Color'
import { SearchAtom } from '../../Atom/SearchAtom'
import { UserContext } from '../../context/UserContext'
import { GetUnreadCompanyNotificationsCount } from '../../graphql/queries/business'
import { DemiBoldText, BoldText } from '../../Atom/TextAtom'

export interface IProps {
  title: string
  leftIconTitle?: string
  leftIconType?:
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  rightIconTitle?: string
  rightIconType?:
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Zocial'
  onPressLeftIcon?: () => void
  onPressRightIcon?: () => void
  rightIconStyle?: any
  rightText?: string
  hideRightMenu?: boolean
  showSearchBar?: boolean
  searchBar?: {
    queryText?: string
    placeholder: string
    onSearch: (text) => void
  }
  user?: any
}

class BaseHeader extends React.PureComponent<IProps> {
  isImagePoped: boolean = true

  state = {
    scale: new Animated.Value(1)
  }

  static defaultProps = {
    leftIconTitle: 'md-menu',
    leftIconType: 'Ionicons',
    hideRightMenu: false
  }

  componentDidMount() {
    // this.animateRocket()
  }

  animateRocket = () => {
    Animated.timing(this.state.scale, {
      toValue: this.isImagePoped ? 1 : 1.4,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.linear)
    }).start(animation => {
      this.isImagePoped = !this.isImagePoped
      if (animation.finished) {
        this.animateRocket()
      }
    })
  }

  openSite = () => {
    let {
      user: {
        company: { shareLink }
      }
    } = this.props
    Linking.canOpenURL(shareLink).then(supported => {
      if (supported) {
        Linking.openURL(shareLink).catch(() => null)
      }
    })
  }

  renderNotificationIcon = () => {
    return (
      <Query
        query={GetUnreadCompanyNotificationsCount}
        notifyOnNetworkStatusChange={true}
        variables={{
          companyId:
            this.props.user &&
            this.props.user.company &&
            this.props.user.company.id
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data }) => {
          return (
            <View>
              <Icon name="bell-o" type="FontAwesome" style={styles.bell} />
              {data &&
              data.getUnreadCompanyNotificationsCount &&
              data.getUnreadCompanyNotificationsCount.data.count &&
              data.getUnreadCompanyNotificationsCount.data.count > 0 ? (
                <View style={styles.notificationContainer}>
                  <BoldText style={styles.notificationText}>
                    {data.getUnreadCompanyNotificationsCount.data.count}
                  </BoldText>
                </View>
              ) : null}
            </View>
          )
        }}
      </Query>
    )
  }

  render() {
    const props = this.props
    return (
      <View style={styles.header}>
        <View style={styles.wrapper}>
          <TouchableWithoutFeedback onPress={this.props.onPressLeftIcon}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Icon
                name={this.props.leftIconTitle}
                style={styles.headerIcon}
                type={this.props.leftIconType}
              />

              <DemiBoldText style={styles.title}>{props.title}</DemiBoldText>
            </View>
          </TouchableWithoutFeedback>
          {!this.props.hideRightMenu ? (
            <View>
              <TouchableWithoutFeedback onPress={this.props.onPressRightIcon}>
                <View style={[styles.rightWrapper, this.props.rightIconStyle]}>
                  {!this.props.rightIconTitle ? (
                    this.renderNotificationIcon()
                  ) : (
                    //   <Animated.Image
                    //   source={require('../../../assets-v1/rocket.png')}
                    //   style={{
                    //     height: 25,
                    //     width: 25,
                    //     transform: [
                    //       {
                    //         scale: this.state.scale
                    //       }
                    //     ]
                    //   }}
                    // />
                    <Icon
                      name={this.props.rightIconTitle}
                      style={styles.searchIcon}
                      type={this.props.rightIconType}
                    />
                  )}
                  {this.props.rightText && (
                    <DemiBoldText style={styles.rightText}>
                      {this.props.rightText}
                    </DemiBoldText>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View />
          )}
        </View>
        {this.props.showSearchBar && <SearchAtom {...this.props.searchBar} />}
      </View>
    )
  }
}

const _BaseHeader: any = props => (
  <UserContext.Consumer>
    {({ user }) => <BaseHeader {...props} user={user} />}
  </UserContext.Consumer>
)

_BaseHeader.defaultProps = BaseHeader.defaultProps

export default _BaseHeader

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom
  },
  wrapper: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center'
  },
  headerIcon: {
    fontSize: 26,
    color: '#000'
  },
  title: {
    fontSize: 18,
    color: '#000',
    marginLeft: 20
  },
  rightText: {
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 17,
    marginLeft: 8
  },
  rightWrapper: {
    flexDirection: 'row',
    marginRight: 0,
    alignItems: 'center'
  },
  searchIcon: {
    color: '#000',
    width: 25,
    // left: 20,
    fontSize: 26
  },
  bell: {
    fontSize: 23,
    color: color.black
  },
  notificationContainer: {
    backgroundColor: color.blue,
    borderRadius: 12.5,
    width: 23,
    height: 23,
    position: 'absolute',
    top: -7,
    right: -10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  notificationText: {
    color: color.secondary,
    fontFamily: 'AvenirNext-Bold',
    fontSize: 12
  }
})
