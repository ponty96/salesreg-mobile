import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Content } from 'native-base'

import { RegularText } from '../../Atom/TextAtom'
import { color } from '../../Style/Color'

interface IProps {
  username: String
}

const NavigationalInformation = (props: IProps) => (
  <View style={{ backgroundColor: '#fff', flex: 1 }}>
    <Content>
      <View style={styles.container}>
        <View style={styles.homeBackground}>
          <RegularText style={styles.homeText}>
            Welcome {props.username}!
          </RegularText>
        </View>
        <RegularText style={[styles.text, { marginVertical: 20 }]}>
          Tap the menu icon on the top left hand corner of the screen to find
          all the menu options you will be needing:
        </RegularText>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Scroll down to find the settings menu where you can edit your
            profile and manage your webstore
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Use the products menu to manage your inventory
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Manage your customers' activities in the customer menu.
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Process your sales using the sales and the invoice menu
          </RegularText>
        </View>
        <View style={styles.section}>
          <View style={styles.dot} />
          <RegularText style={[styles.text, { marginTop: -4 }]}>
            Expense and banking menus help with your finance
          </RegularText>
        </View>
      </View>
    </Content>
  </View>
)

export default NavigationalInformation

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  homeBackground: {
    backgroundColor: 'rgba(152,251,152, 0.2)', // #98FB98
    width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    marginTop: 16,
    borderRadius: 3
  },
  homeText: {
    color: color.selling,
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Bold'
  },
  text: {
    fontSize: 17,
    textAlign: 'justify',
    marginRight: 30,
    color: color.textColor
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 15,
    backgroundColor: color.textColor
  },
  section: {
    flexDirection: 'row',
    marginBottom: 30,
    marginRight: 30,
    alignItems: 'flex-start'
  }
})
