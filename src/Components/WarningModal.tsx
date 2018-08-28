import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { color } from '../Style/Color'
import ModalAtom from '../Atom/ModalAtom'

interface IProp {
  visible: boolean
  onBackPress: () => void
  onPressBottomButton?: () => void
  onPressTopButton: () => void
  headerText: string
  bodyText?: string
  firstButtonText?: string
  secondButtonText?: string
  firstButtonTextColor?: string
  secondButtonTextColor?: string
  children?: any
  modalStyle?: object
  footerText: string
}

const WarningModal = (props: IProp) => {
  return (
    <ModalAtom
      visible={props.visible}
      modalWrapperStyle={[styles.modalContainer, props.modalStyle]}
      onBackPress={props.onBackPress}
      body={
        <View style={styles.body}>
          <Text style={styles.header}>{props.headerText}</Text>
          <Text style={styles.normalText}>{props.bodyText}</Text>
          {props.children}
          {props.firstButtonText ? (
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={props.onPressTopButton}
            >
              <Text
                style={[
                  styles.normalText,
                  { color: props.firstButtonTextColor }
                ]}
              >
                {props.firstButtonText}
              </Text>
            </TouchableOpacity>
          ) : (
            undefined
          )}
          {props.secondButtonText ? (
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={props.onPressBottomButton}
            >
              <Text
                style={[
                  styles.normalText,
                  { color: props.secondButtonTextColor }
                ]}
              >
                {props.secondButtonText}
              </Text>
            </TouchableOpacity>
          ) : (
            undefined
          )}
        </View>
      }
      footer={
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.footer]}
          onPress={props.onBackPress}
        >
          <Text style={[styles.normalText, styles.header]}>
            {props.footerText}
          </Text>
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
    paddingTop: 16,
    backgroundColor: color.secondary
  },
  header: {
    fontFamily: 'SourceSansPro-Semibold',
    fontSize: 14
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
    fontFamily: 'Source Sans Pro',
    marginVertical: 16,
    marginHorizontal: 32,
    textAlign: 'center'
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
