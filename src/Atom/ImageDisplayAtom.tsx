import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { smallImageDisplay } from './../Style/exportStyles';

interface IProps {
    image: string
    name: string
}

export default class ImageDisplayAtom extends Component<IProps, any> {
    render() {
        return (
            <View style = { smallImageDisplay.container }>
                <View style = { smallImageDisplay.imageWrapper }>
                    <Image
                        source = {{ uri: this.props.image }}
                        style = { smallImageDisplay.image }
                    />
                </View>
                <Text style={ smallImageDisplay.name}>
                    { this.props.name }
                </Text>
            </View>
        );
    }
}
