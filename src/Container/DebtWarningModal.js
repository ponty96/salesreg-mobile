import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Slider from 'react-native-slider';

import ModalAtom from './../Atom/ModalAtom';
import ButtonAtom from '../Atom/ButtonAtom';
import styles from './../Style/Screen';
import { color } from './../Style/Color'
import { modalButton } from './../Style/exportStyles';

class DebtWarningModal extends Component {
    componentDidMount() {
        this.setState({
            value: this.calcPercent()
        })
    }

    state = {
        visibility: this.props.visibility,
        value: undefined
    }

    static defaultProps = {
        visibility: false
    }

    calcPercent = () => {
        let percent = Math.ceil((this.props.currentAmount / this.props.debtLimit ) * 100)
        return percent;
    }

    handleSlide = (value) => {
        this.setState({value})
    }

    renderHeader = () => {
        return (
            <View
                style={styles.modalHeader}
            >
                <Text
                    style={styles.modalHeaderText}
                >
                    Debt warning level (%)
                </Text>
                <TouchableOpacity
                    onPress={() => this.setState({visibility: !this.state.visibility})}
                >
                    <Icon
                        name={'md-close'}
                        style={styles.modalCloseIcon}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    renderBody = () => {
        return (
            <View
                style={styles.modalBody}
            >
                <Text>
                    Drag the slider below to set the warning level.
                </Text>
                <Slider
                    value={this.state.value}
                    minimumValue={1}
                    maximumValue={100}
                    step={1}
                    minimumTrackTintColor={color.warning}
                    maximumTrackTintColor={color.disabled}
                    thumbTintColor={color.warning}
                    thumbStyle={styles.thumbStyle}
                    onSlidingComplete={(value) => this.handleSlide(value)}
                    trackStyle={styles.trackStyle}
                    style={styles.sliderStyle}
                />
                <View style={styles.legendStyle}>
                    <Text style={styles.legendLabel}>0%</Text>
                    <Text>100%</Text>
                </View>
                <View
                    style={
                        [
                            styles.boxView,
                            styles.firstBox
                        ]
                    }
                >
                    <Text
                        style={
                            [
                                styles.menuColor,
                                styles.boxlabel
                            ]
                        }
                    >
                        Warning level(%):
                    </Text>
                    <Text
                        style={styles.blackText}
                    >
                        {this.state.value}%
                    </Text>
                </View>
                <View
                    style={
                        [
                            styles.boxView,
                            styles.secondBox
                        ]
                    }
                >
                    <Text
                        style={
                            [
                                styles.menuColor,
                                styles.boxlabel
                            ]
                        }
                    >
                        Amount(N):
                    </Text>
                    <Text
                        style={styles.blackText}
                    >
                        {this.props.debtLimit}
                    </Text>
                </View>
                <View
                    style={styles.debtLimitWarning}
                >
                    <Icon
                        name={'info'}
                        style={styles.modalInfoIcon}
                        type={'Entypo'}
                    />
                    <Text
                        style={
                            [
                                styles.modalHeaderText,
                                styles.debtLimitWarningText,
                                styles.menuColor
                            ]
                        }
                    >
                        Your total debt box turns &nbsp;
                        <Text
                            style={styles.orangeText}
                        >
                            ORANGE
                        </Text>
                        &nbsp;when your total debt reaches the above amount
                    </Text>
                </View>

                <ButtonAtom
                    btnText="OK"
                    onPress={() => this.setState({visibility: !this.state.visibility})}
                    btnStyle={modalButton}
                />
            </View>
        )
    }

    render() {
        return (
            <ModalAtom
                visible={this.state.visibility}
                centered={true}
                body={this.renderBody()}
                header={this.renderHeader()}
            />
        );
    }
}

DebtWarningModal.propTypes = {
    visibility: PropTypes.bool,
    currentAmount: PropTypes.number.isRequired,
    debtLimit: PropTypes.number.isRequired
}

export default DebtWarningModal;