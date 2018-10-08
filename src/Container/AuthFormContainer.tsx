import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Container, Content, Form } from 'native-base'
import { color } from '../Style/Color'
import ButtonAtom from '../Atom/ButtonAtom'

interface IProps {
  navigate: any
  pageTitle: string
  children: any

  actionButtonText: string
  onPressActionButton: () => void
  showActionButtonIcon: boolean | false

  alternativeLinkText: string
  alternativeLinkRoute: string

  footerText: string
  footerButtonText: string
  footerButtonRoute: string
}

export default class AuthFormContainer extends React.PureComponent<IProps> {
  render() {
    const { pageTitle } = this.props
    return (
      <Container style={styles.container}>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Form
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Text style={styles.pageTitle}>{pageTitle}</Text>
            <View
              style={{
                // flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <View
                style={{
                  paddingHorizontal: 30
                }}
              >
                {this.props.children}
              </View>
            </View>
            <View style={styles.header}>
              <ButtonAtom
                btnText={this.props.actionButtonText}
                onPress={this.props.onPressActionButton}
                type="secondary"
              />
              <View style={{ height: 20 }} />
              <ButtonAtom
                btnText={this.props.alternativeLinkText.toUpperCase()}
                onPress={() =>
                  this.props.navigate(this.props.alternativeLinkRoute)
                }
                type="primary"
                transparent={true}
                hideIcon={true}
                textStyle={{ fontFamily: 'AvenirNext-Medium' }}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>{this.props.footerText}</Text>
              <ButtonAtom
                btnText={this.props.footerButtonText}
                onPress={() =>
                  this.props.navigate(this.props.footerButtonRoute)
                }
                type="primary"
              />
            </View>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%'
  },
  pageTitle: {
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold',
    fontSize: 22,
    paddingTop: 45,
    marginLeft: 30
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    backgroundColor: color.button,
    height: 170,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#fff',
    paddingVertical: 8,
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16,
    marginBottom: 8
  }
})
