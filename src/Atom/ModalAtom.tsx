import * as React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import BaseHeader from '../Components/Header/BaseHeader'

interface IProps {
  visible: boolean
  footer?: JSX.Element
  centered?: boolean
  onRequestClose?: () => void
  headerTitle: string
}

export default class ModalAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    visible: false,
    centered: false,
    headerTitle: 'Modal'
  }

  render() {
    return (
      <Modal
        animationType="slide"
        visible={this.props.visible}
        onRequestClose={this.props.onRequestClose}
      >
        <View style={styles.modalContainer}>
          <BaseHeader
            title={this.props.headerTitle}
            onPressLeftIcon={this.props.onRequestClose}
            leftIconTitle="md-close"
            leftIconType="Ionicons"
          />
          <View>{this.props.children}</View>
          <View>{this.props.footer}</View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})
