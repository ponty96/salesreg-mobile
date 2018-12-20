import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { color } from '../../Style/Color'
import Header from '../../Components/Header/DetailsScreenHeader'
import GenericProfileDetails from '../../Components/Generic/ProfileDetails'
// import Icon from '../../Atom/Icon'
import { Chip } from '../../Atom/Chip'
import { DeleteServiceGQL } from '../../graphql/mutations/store'
import { ListCompanyServicesGQL } from '../../graphql/queries/store'
import { UserContext } from '../../context/UserContext'

interface IProps {
  navigation?: any
  user?: any
}

class ServiceDetailsScreen extends PureComponent<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const service = navigation.getParam('service', {})
    return {
      header: (
        <Header
          title="Service Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate('UpsertService', { service })
          }
        />
      )
    }
  }

  sections = (): any => {
    const service = this.props.navigation.getParam('service', {})
    return [
      {
        section: 'Total Services Rendered',
        value: `${service.totalTimesOrdered || 0}`
      },
      { section: 'Price', value: `\u20A6 ${service.price}` },
      {
        section: 'Categories',
        value: service.categories.map(cat => cat.title)
      },
      // open tags screen, which shows list of products and services attached to the tag
      {
        section: 'Tags',
        body: (
          <View style={styles.tags}>
            {service.tags.map(tag => (
              <Chip text={tag.name} />
            ))}
          </View>
        )
      }, // logic for showing tags here
      { section: 'Images', value: null } // logic for rendering images here
    ]
  }
  render() {
    // do change the list to the appropriate molecule
    const service = this.props.navigation.getParam('service', {})
    return [
      // <View style={styles.topHeader} key="dddd-334">
      //   <View style={{ flexDirection: 'row' }} />
      //   <TouchableOpacity
      //     style={{ flexDirection: 'row', alignItems: 'center' }}
      //   >
      //     <Icon
      //       type="Ionicons"
      //       name="md-share"
      //       style={{ fontSize: 27, color: color.textColor, marginRight: 8 }}
      //     />
      //     <Text style={styles.rightNavText}>Share</Text>
      //   </TouchableOpacity>
      // </View>,
      <GenericProfileDetails
        sections={this.sections()}
        enableDelete={true}
        graphqlDeleteMutation={DeleteServiceGQL}
        graphqlDeleteMutationResultKey="deleteService"
        graphqlDeleteVariables={{ serviceId: service.id }}
        graphqlRefetchQueries={[
          {
            query: ListCompanyServicesGQL,
            variables: {
              companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() => this.props.navigation.navigate('Services')}
        image={service.featuredImage}
        headerText={service.name}
        imageCategory="item"
      />
    ]
  }
}

const _ServiceDetailsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <ServiceDetailsScreen {...props} user={user} />}
  </UserContext.Consumer>
)

_ServiceDetailsScreen.navigationOptions = ServiceDetailsScreen.navigationOptions

export default _ServiceDetailsScreen

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 999,
    backgroundColor: '#ffffffc7',
    width: '100%',
    paddingVertical: 8,
    justifyContent: 'space-between',
    paddingRight: 16
  },
  rightNavText: {
    color: color.button,
    fontSize: 16,
    fontFamily: 'AvenirNext-Medium',
    marginLeft: 8
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary
  },
  headerIcon: {
    color: color.secondary,
    padding: 16,
    fontSize: 28
  },
  headerText: {
    color: color.secondary,
    fontWeight: 'bold',
    paddingRight: 16,
    fontSize: 18
  },
  headerIconLogout: {
    color: color.secondary,
    padding: 8,
    fontSize: 28
  },
  headerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ababa: {
    flex: 1,
    backgroundColor: '#fff'
  },
  foota: {
    height: 80,
    padding: 16
  },
  btnP: {
    alignSelf: 'flex-end'
  },
  txtP: {
    color: '#fff',
    fontSize: 16
  },
  aboveAccordionContainerP: {
    flexDirection: 'row',
    flex: 0,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: '#f0f0f0',
    borderBottomColor: '#c0c0c0'
  },
  aboveAccordionPictureViewP: {
    flexDirection: 'column',
    width: '50%',
    height: 170,
    alignItems: 'flex-start',
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  aboveAccordiondpP: {
    height: 60,
    width: 60
  },
  aboveAccordionBoldFont: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 20,
    textAlign: 'right'
  },
  aboveAccordionWhiteList: {
    height: 65,
    width: '100%',
    backgroundColor: '#FFF',
    paddingLeft: 0,
    marginLeft: 0
  },
  aboveAccordionBlackTextL: {
    fontSize: 16,
    color: color.dropdown,
    paddingLeft: 16,
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionBlackTextR: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionGreenTextR: {
    fontSize: 16,
    color: color.selling,
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionRedTextR: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionGreyText: {
    fontSize: 16,
    color: color.dropdown,
    paddingLeft: 16,
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionGreyFont: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionRedText: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionPictureText: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '400',
    color: color.menu,
    fontFamily: 'Source Sans Pro'
  },
  aboveAccordionMoneyView: {
    width: '50%',
    height: 170,
    alignItems: 'flex-end',
    justifyContent: 'center'
    // backgroundColor: '#FFF',
  },
  viewMarginRight: {
    marginRight: 16
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
})
