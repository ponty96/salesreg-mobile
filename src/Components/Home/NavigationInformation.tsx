import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Content } from 'native-base'

interface IProps {
  username: String
}

const NavigationalInformation = (props: IProps) => (
  <View style={styles.container}>
    <Content>
      {/* <View style={styles.container}>
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
      </View> */}
    </Content>
  </View>
)

export default NavigationalInformation

const styles = StyleSheet.create({
  container: { backgroundColor: '#eee', flex: 1 }
})
