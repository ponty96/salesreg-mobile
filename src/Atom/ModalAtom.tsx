import * as React from 'react'
import { View, Modal } from 'react-native'
import styles from './../Style/Layout'

interface IProps {
  visible: boolean
  footer?: JSX.Element
  header?: JSX.Element
  body?: JSX.Element
  centered?: boolean
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
        onRequestClose={() => {
          alert('Modal has been closed.')
        }}
      >
        <View style={styles.modalContainer}>
          <View
            style={this.props.centered ? styles.centerModal : styles.modalBody}
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
