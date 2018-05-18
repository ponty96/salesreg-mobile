import * as React from 'react';
import {Item, Input, Label, Text } from 'native-base';
import { View } from 'react-native';
import styles from './../Style/Form';
import styles1 from '../Style/exportStyles';
import { color } from '../Style/Color';

interface IProps {
    required?: boolean | false;
    label?: string
    defaultValue?: string
    multiline?: boolean
    placeholder?: string
    floatingLabel?: boolean | true
    secureTextEntry?: boolean | false
    getValue?: (a: string | number) => void
    contStyle: object | Array<any>
    inputStyle?: object,
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
    underneathText?: string
}

class InputAtom extends React.Component<IProps, any> {
    static defaultProps: IProps = {
        required: false,
        floatingLabel: true,
        secureTextEntry: false,
        keyboardType: 'default',
        multiline: false,
        contStyle: styles1.marginfulInput || styles1.marginlessInput
    };

    render() {
        return (
            <View>
                <Item floatingLabel={this.props.floatingLabel} stackedLabel={!this.props.floatingLabel} style={this.props.contStyle}>
                    <Label style={styles.label}>
                        {this.props.required && <Text style={styles.required}>* </Text>}
                        {this.props.label}
                    </Label>
                    <Input
                        placeholder = {this.props.placeholder}
                        multiline = {this.props.multiline}
                        onChangeText={text => this.props.getValue(text)}
                        value = {this.props.defaultValue}
                        secureTextEntry = {this.props.secureTextEntry}
                        keyboardType = {this.props.keyboardType}
                        style = {this.props.inputStyle}
                        numberOfLines={6}
                        underlineColorAndroid = {'transparent'}
                        placeholderTextColor = {color.inactive}
                    />
                </Item>
                {
                    this.props.underneathText
                    ?
                    <Text style = { styles.underneathText }>{ this.props.underneathText }</Text>
                    :
                    <Text>''</Text>
                }
            </View>
        );
    }
}

export default InputAtom;