import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import ModalAtom from '../Atom/ModalAtom'

interface IProp {
  visible: boolean
  onBackPress: () => void
  onPressBottomButton: () => void
  onPressTopButton: () => void
}

const WarningModal = (props: IProp) => {
  return (
    <ModalAtom
      visible={props.visible}
      modalWrapperStyle={styles.modalContainer}
      onBackPress={props.onBackPress}
      body={
        <View style={styles.body}>
          <Text style={styles.header}>Warning!</Text>
          <Text style={styles.normalText}>
            You cannot undo this action, do you still want to cancel this order
            ?
          </Text>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={props.onPressTopButton}
          >
            <Text style={[styles.normalText, { color: color.red }]}>
              Continue
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={props.onPressBottomButton}
          >
            <Text style={[styles.normalText, { color: color.principal }]}>
              Dont cancel
            </Text>
          </TouchableOpacity>
        </View>
      }
      footer={
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.footer]}
          onPress={props.onBackPress}
        >
          <Text style={[styles.normalText, styles.header]}>Close</Text>
        </TouchableOpacity>
      }
    />
  )
}

export default WarningModal

const styles = StyleSheet.create({
  body: {
    borderRadius: 20,
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: color.secondary
  },
  header: {
    fontFamily: 'SourceSansPro_Semibold',
    fontSize: 14,
    backgroundColor: color.secondary
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: color.dropdown,
    alignSelf: 'stretch'
  },
  normalText: {
    fontSize: 14,
    color: color.principal,
    fontFamily: 'SourceSansPro',
    marginVertical: 16,
    marginHorizontal: 32
  },
  modalContainer: {
    borderRadius: 20,
    backgroundColor: 'transparent',
    top: 300
  },
  footer: {
    marginTop: 8,
    borderRadius: 20,
    backgroundColor: color.secondary
  }
})
