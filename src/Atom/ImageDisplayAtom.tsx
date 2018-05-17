import * as React from 'react';
import { Image, Text, View } from 'react-native';
import styles from '../Style/exportStyles';

interface IProps {
    image: string
    name: string
}

export default class ImageDisplayAtom extends React.Component<IProps, any> {
    render() {
        return (
            <View style = { styles.smallImageDisplayContainer }>
                <View style = { styles.smallImageDisplayImageWrapper }>
                    <Image
                        source = {{ uri: this.props.image }}
                        style = { styles.smallImageDisplayImage }
                    />
                </View>
                <Text style={styles.smallImageDisplayName}>
                    { this.props.name }
                </Text>
            </View>
        );
    }
}
