import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base'
import { color } from '../Style/Color'

interface IProps {
  menu?: boolean
  title: string
  firstRightIcon?: string
  firstRightIconType?: any
  secondRightIcon?: string
  secondRightIconType?: any
  rightText?: string
}

const customHeader = (prop: IProps, { navigation }: any) => {
  return (
    <Header style={styles.wrapper}>
      <Left>
        {prop.menu ? (
          <Button transparent>
            <Icon name="menu" style={styles.headerIcon} />
          </Button>
        ) : (
          <Button transparent>
            <Icon
              name="arrow-back"
              onPress={() => {
                navigation.goBack()
              }}
            />
          </Button>
        )}
      </Left>
      <Body>
        <Title style={styles.title}>{prop.title}</Title>
      </Body>
      <Right>
        <View style={styles.rightWrapper}>
          <Button transparent>
            <Icon name={prop.firstRightIcon} type={prop.firstRightIconType} />
          </Button>
          {!prop.rightText ? (
            <Button transparent>
              <Icon
                name={prop.secondRightIcon}
                type={prop.secondRightIconType}
                style={styles.headerIcon}
              />
            </Button>
          ) : (
            <Text style={styles.edit}>{prop.rightText}</Text>
          )}
        </View>
      </Right>
    </Header>
  )
}

export default customHeader

const styles = StyleSheet.create({
  headerIcon: {
    fontSize: 28
  },
  wrapper: {
    backgroundColor: color.primary
  },
  title: {
    fontFamily: 'SourceSansPro',
    fontSize: 16
  },
  rightWrapper: {
    flexDirection: 'row'
  },
  edit: {
    fontFamily: 'SourceSansPro',
    marginRight: 32,
    color: color.secondary,
    alignSelf: 'center',
    fontSize: 16
  }
})
