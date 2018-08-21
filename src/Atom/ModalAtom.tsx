import * as React from 'react'
import { View, Modal, StyleSheet } from 'react-native'
import { color } from '../Style/Color'

interface IProps {
  visible: boolean
  footer?: JSX.Element
  header?: JSX.Element
  body?: JSX.Element
  centered?: boolean
  modalWrapperStyle?: object
  onBackPress?: () => void
}

class ModalAtom extends React.Component<IProps, any> {
  static defaultProps: IProps = {
    visible: false,
    centered: false
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onBackPress}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              this.props.centered ? styles.centerModal : styles.modalBody,
              this.props.modalWrapperStyle
            ]}
          >
            {this.props.header}
            {this.props.body}
            {this.props.footer}
          </View>
        </View>
      </Modal>
    )
  }
}

export default ModalAtom

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  centerModal: {
    backgroundColor: color.secondary
  },
  modalBody: {
    backgroundColor: color.secondary,
    position: 'absolute',
    top: 90,
    width: '100%',
    marginLeft: '7%'
  }
})
