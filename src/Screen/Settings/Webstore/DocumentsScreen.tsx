import React from 'react'
import Header from '../../../Components/Header/DetailsScreenHeader'
import { UserContext } from '../../../context/UserContext'
import { Content, ActionSheet } from 'native-base'
import SalesOrderListAtom from '../../../Atom/ListItem/SalesOrderListAtom'
import { TouchableOpacity, Linking, View } from 'react-native'
import FabAtom from '../../../Atom/FabAtom'
import EmptyList from '../../../Components/EmptyList'
import { color } from '../../../Style/Color'
import Icon from '../../../Atom/Icon'

let BUTTONS = ['Yes, delete', 'Cancel']
let DESTRUCTIVE_INDEX = 0
let CANCEL_INDEX = 1

interface IProps {
  user: any
  navigation: any
}

interface IState {
  deletedDocument: string
}

class DocumentsScreen extends React.PureComponent<IProps, IState> {
  state = {
    deletedDocument: ''
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

  render() {
    let {
      user: {
        company: { legalDocuments }
      }
    } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: color.secondary }}>
        {legalDocuments.length != 0 ? (
          <Content>
            {legalDocuments.map((docs, i) => (
              <TouchableOpacity onPress={() => Linking.openURL(docs.pdfUrl)}>
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
                  bottomLeftFirstText={`PDF - ${this.getSize(docs.pdfUrl)}Kb`}
                  key={i}
                  showTrash
                  onPress={() =>
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
                              deletedDocument: docs.title
                            },
                            () => {
                              return null
                            }
                          )
                        }
                      }
                    )
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
    )
  }
}

const _DocumentsScreen: any = props => (
  <UserContext.Consumer>
    {({ user }) => <DocumentsScreen user={user} {...props} />}
  </UserContext.Consumer>
)

_DocumentsScreen.navigationOptions = DocumentsScreen.navigationOptions

export default _DocumentsScreen
