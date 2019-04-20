import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Content, Form } from 'native-base'

import { color } from '../Style/Color'
import ButtonAtom from '../Atom/Form/ButtonAtom'
import { MediumText, DemiBoldText } from '../Atom/TextAtom'

interface IProps {
  navigate: any
  pageTitle: string
  children: any

  actionButtonText: string
  onPressActionButton: () => void
  showActionButtonIcon: boolean | false

  alternativeLinkText?: string
  alternativeLinkRoute?: string
  alternativeLinkOnClick?: () => void

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
            <DemiBoldText style={styles.pageTitle}>{pageTitle}</DemiBoldText>
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
              {this.props.alternativeLinkText && (
                <ButtonAtom
                  btnText={this.props.alternativeLinkText.toUpperCase()}
                  onPress={() =>
                    this.props.alternativeLinkOnClick
                      ? this.props.alternativeLinkOnClick()
                      : this.props.navigate(this.props.alternativeLinkRoute)
                  }
                  type="primary"
                  transparent={true}
                  hideIcon={true}
                  textStyle={{ fontFamily: 'AvenirNext-Medium' }}
                />
              )}
            </View>
            <View style={styles.footer}>
              <MediumText style={styles.footerText}>
                {this.props.footerText}
              </MediumText>
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
    fontSize: 16,
    marginBottom: 8
  }
})
