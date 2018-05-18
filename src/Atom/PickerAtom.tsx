import React, { Component } from 'react';
import { Picker, Icon } from 'native-base';

interface IProps {
    list: Array<any>
    style?: object
}

interface IState {
    selected: string
}

class PickerAtom extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
          selected: ''
        };
      }
    handleChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {
        let list = this.props.list;
        return (
            <Picker
                iosHeader='Select one'
                mode='dropdown'
                iosIcon={<Icon name='ios-arrow-down-outline' />}
                style={ this.props.style }
                selectedValue={this.state.selected}
                onValueChange={this.handleChange.bind(this)}
            >
                {list.map((element, key) =>
                <Picker.Item label={element} value={element} key={key}/>
                )}
            </Picker>
        );
    }
}

export default PickerAtom;
