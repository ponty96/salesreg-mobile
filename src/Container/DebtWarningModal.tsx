import { Icon } from 'native-base'
import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
// import Slider from 'react-native-slider';
import ButtonAtom from '../Atom/ButtonAtom'
import ModalAtom from './../Atom/ModalAtom'
import styles from './../Style/Screen'
import styles1 from '../Style/exportStyles'

interface IProps {
  getValue?: (a: string) => void
  handleSlide?: (a: any) => void
  closeModal?: () => void
  headerText?: string
  amount?: string
  debtLimit?: number
  currentAmount?: number
  visibility: boolean
}
interface IState {
  value: any
}

class DebtWarningModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  }

  state: IState = {
    value: ''
  }
  componentDidMount() {
    this.setState({
      value: this.calcPercent()
    })
  }

  calcPercent = () => {
    const percent = Math.ceil(
      this.props.currentAmount / this.props.debtLimit * 100
    )
    return percent
  }

  handleSlide = (value: any) => {
    this.setState({ value })
  }

  renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>Debt warning level (%)</Text>
        <TouchableOpacity onPress={() => this.props.closeModal()}>
          <Icon name={'md-close'} style={styles.modalCloseIcon} />
        </TouchableOpacity>
      </View>
    )
  }

  renderBody = () => {
    return (
      <View style={styles.modalBody}>
        <Text>Drag the slider below to set the warning level.</Text>
        {/*<Slider
                    value={this.state.value}
                    minimumValue={1}
                    maximumValue={100}
                    step={1}
                    minimumTrackTintColor={color.warning}
                    maximumTrackTintColor={color.disabled}
                    thumbTintColor={color.warning}
                    thumbStyle={styles.thumbStyle}
                    onSlidingComplete={(value: any) => this.handleSlide(value)}
                    trackStyle={styles.trackStyle}
                    style={styles.sliderStyle}
                />*/}
        <View style={styles.legendStyle}>
          <Text style={styles.legendLabel}>0%</Text>
          <Text>100%</Text>
        </View>
        <View style={[styles.boxView, styles.firstBox]}>
          <Text style={[styles.menuColor, styles.boxlabel]}>
            Warning level(%):
          </Text>
          <Text style={styles.blackText}>{this.state.value}%</Text>
        </View>
        <View style={[styles.boxView, styles.secondBox]}>
          <Text style={[styles.menuColor, styles.boxlabel]}>Amount(N):</Text>
          <Text style={styles.blackText}>{this.props.debtLimit}</Text>
        </View>
        <View style={styles.debtLimitWarning}>
          <Icon name={'info'} style={styles.modalInfoIcon} type={'Entypo'} />
          <Text
            style={[
              styles.modalHeaderText,
              styles.debtLimitWarningText,
              styles.menuColor
            ]}
          >
            Your total debt box turns &nbsp;
            <Text style={styles.orangeText}>ORANGE</Text>
            &nbsp;when your total debt reaches the above amount
          </Text>
        </View>

        <ButtonAtom
          btnText="OK"
          onPress={() => this.props.closeModal()}
          btnStyle={styles1.modalButton}
        />
      </View>
    )
  }

  render() {
    return (
      <ModalAtom
        visible={this.props.visibility}
        centered={true}
        body={this.renderBody()}
        header={this.renderHeader()}
      />
    )
  }
}

export default DebtWarningModal
