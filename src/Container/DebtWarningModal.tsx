import { Icon } from 'native-base';
import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import Slider from 'react-native-slider';
import ButtonAtom from '../Atom/ButtonAtom';
import ModalAtom from '../Atom/ModalAtom';
import { color } from '../Style/Color';

interface IProps {
  getValue?: (a: string) => void;
  handleSlide?: (a: any) => void;
  closeModal?: () => void;
  headerText?: string;
  amount?: string;
  debtLimit?: number;
  currentAmount?: number;
  visibility: boolean;
}
interface IState {
  value: any;
}

class DebtWarningModal extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visibility: false
  };

  state: IState = {
    value: ''
  };
  componentDidMount() {
    this.setState({
      value: this.calcPercent()
    });
  }

  calcPercent = () => {
    const percent = Math.ceil(
      this.props.currentAmount / this.props.debtLimit * 100
    );
    return percent;
  };

  handleSlide = (value: any) => {
    this.setState({ value });
  };

  renderHeader = () => {
    return (
      <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderText}>Debt warning level (%)</Text>
        <TouchableOpacity onPress={() => this.props.closeModal()}>
          <Icon name={'md-close'} style={styles.modalCloseIcon} />
        </TouchableOpacity>
      </View>
    );
  };

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
                    maximumTrackTintColor={color.inactive}
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
          btnStyle={styles.modalButton}
        />
      </View>
    );
  };

  render() {
    return (
      <ModalAtom
        visible={this.props.visibility}
        centered={true}
        body={this.renderBody()}
        header={this.renderHeader()}
      />
    );
  }
}

export default DebtWarningModal;

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: color.grey
  },
  modalHeaderText: {
    fontSize: 16,
    color: color.menu,
    flex: 4
  },
  modalCloseIcon: {
    flex: 1,
    color: color.inactive,
    paddingLeft: 16
  },
  modalBody: {
    padding: 16
  },
  debtLimitWarning: {
    flexDirection: 'row'
  },
  creditLimit: {
    paddingTop: 15
  },
  modalInfoIcon: {
    paddingHorizontal: 8,
    color: color.inactive
  },
  debtLimitWarningText: {
    textAlign: 'justify'
  },
  menuColor: {
    color: color.menu
  },
  legendStyle: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  legendLabel: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  boxView: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: color.inactive,
    padding: 10
  },
  boxlabel: {
    marginRight: 16
  },
  firstBox: {
    marginBottom: 6
  },
  secondBox: {
    marginBottom: 32
  },
  orangeText: {
    color: color.warning
  },
  blackText: {
    color: color.black,
    fontWeight: 'bold'
  },
  modalButton: {
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 16,
    alignSelf: 'flex-end'
  }
});
