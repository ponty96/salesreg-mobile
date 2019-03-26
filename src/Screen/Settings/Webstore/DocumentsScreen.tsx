import React from 'react'
import { Mutation } from 'react-apollo'
import { TouchableOpacity, Linking, View, Alert } from 'react-native'
import { Content, ActionSheet, Icon } from 'native-base'

import Header from '../../../Components/Header/DetailsScreenHeader'
import { UserContext } from '../../../context/UserContext'
import SalesOrderListAtom from '../../../Atom/ListItem/SalesOrderListAtom'
import FabAtom from '../../../Atom/FabAtom'
import EmptyList from '../../../Components/EmptyList'
import { color } from '../../../Style/Color'
import { DeleteLegalDocument } from '../../../graphql/mutations/business'
import AppSpinner from '../../../Components/Spinner'
import Auth from '../../../services/auth'
import { NotificationBanner } from '../../../Components/NotificationBanner'
import configureNotificationBanner from '../../../Functions/configureNotificationBanner'

let BUTTONS = ['Yes, delete', 'Cancel']
let DESTRUCTIVE_INDEX = 0
let CANCEL_INDEX = 1

interface IProps {
  user: any
  navigation: any
  resetUserContext: (user?: any) => void
  setNotificationBanner: (obj: any) => void
}

interface IState {
  deletedDocumentName: string
  deletedDocumentType: string
}

class DocumentsScreen extends React.PureComponent<IProps, IState> {
  state = {
    deletedDocumentName: '',
    deletedDocumentType: ''
  }

  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Documents"
          hideRightMenu={true}
          onPressLeftIcon={() => navigation.goBack()}
        />
      )
    }
  }

  getSize = (pdfUrl: string): number => {
    let size = pdfUrl
      .match(/%2Fdocument\S+/gi)[0]
      .replace(/%2Fdocument%2F|.pdf/gi, '')
      .split('%7C')[1]
    return Number(size) / 1000
  }

  deleteLegalDocument = (docs, deleteLegalDocument) => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: 'Delete?'
      },
      buttonIndex => {
        if (buttonIndex == 0) {
          this.setState(
            {
              deletedDocumentName: docs.name,
              deletedDocumentType: docs.type
            },
            () =>
              deleteLegalDocument({ variables: { legalDocumentId: docs.id } })
          )
        }
      }
    )
  }

  onCompleted = async res => {
    const {
      deleteLegalDocument: { success, fieldErrors, data }
    } = res

    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            'Error',
            fieldErrors[0].message,
            [{ text: 'Ok', onPress: () => null }],
            { cancelable: false }
          ),
        100
      )
    } else {
      let {
          user: { company },
          user
        } = this.props,
        updatedUser = {
          ...user,
          company: { ...company, legalDocuments: data.legalDocuments }
        }

      await Auth.setCurrentUser(updatedUser)
      this.props.resetUserContext(updatedUser)

      let banner = NotificationBanner(
        configureNotificationBanner('DeleteLegalDocument', {
          name: this.state.deletedDocumentName,
          type: this.state.deletedDocumentType
        })
      )
      banner.show({ bannerPosition: 'bottom' })
    }
  }

  render() {
    let {
      user: {
        company: { legalDocuments }
      }
    } = this.props

    return (
      <Mutation mutation={DeleteLegalDocument} onCompleted={this.onCompleted}>
        {(deleteLegalDocument, { loading }) => (
          <React.Fragment>
            <AppSpinner visible={loading} />
            <View style={{ flex: 1, backgroundColor: color.secondary }}>
              {legalDocuments.length != 0 ? (
                <Content>
                  {legalDocuments.map((docs, i) => (
                    <TouchableOpacity
                      onPress={() => Linking.openURL(docs.pdfUrl)}
                    >
                      <SalesOrderListAtom
                        firstTopText={`${docs.name} ${
                          docs.type.toLowerCase() == 'policy' ? 'Policy' : ''
                        }`}
                        bottomLeftSecondText=""
                        topRightText=""
                        style={{ marginLeft: 8 }}
                        icon={
                          <Icon
                            type="MaterialCommunityIcons"
                            name="file-pdf"
                            style={{ fontSize: 30, color: color.red }}
                          />
                        }
                        bottomLeftFirstText={`PDF - ${this.getSize(
                          docs.pdfUrl
                        )}Kb`}
                        key={i}
                        showTrash
                        onPress={() =>
                          this.deleteLegalDocument(docs, deleteLegalDocument)
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </Content>
              ) : (
                <EmptyList
                  type={{
                    verifyMainList: 'main',
                    headerText: 'All your documents should  be seen here',
                    Text:
                      'When you start selling, you need to present legal documents such as refund or delivery policy to guide the process \n\nStart adding a document by tapping the '
                  }}
                />
              )}
              <FabAtom
                routeName="UpsertDocuments"
                navigation={this.props.navigation}
                name="note-add"
                type="MaterialIcons"
              />
            </View>
          </React.Fragment>
        )}
      </Mutation>
    )
  }
}

const _DocumentsScreen: any = props => (
  <UserContext.Consumer>
    {({ user, resetUserContext }) => (
      <DocumentsScreen
        user={user}
        resetUserContext={resetUserContext}
        {...props}
      />
    )}
  </UserContext.Consumer>
)

_DocumentsScreen.navigationOptions = DocumentsScreen.navigationOptions

export default _DocumentsScreen
