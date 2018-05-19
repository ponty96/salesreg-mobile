import React, { PureComponent } from 'react';
import { Icon } from 'native-base';
import { Image, View, Text } from 'react-native';

import styles from '../Style/Screen';
import styles1 from '../Style/Form';

interface IProps {
    navigation: any;
    item: any;
}

interface IState {

}

class UserProfile extends PureComponent<IProps, IState> {
    render() {
        return (
            <View style = { styles.container }>
                <View style = { [styles.secondCompartment, styles.bottomPadding] }>
                    <View style = { styles1.selfAlign }>
                        {
                            this.props.item.image
                            ?
                            <Image
                                source = {{ uri: this.props.item.image }}
                                style = { styles1.imgContainer }
                            />
                            :
                            <Icon
                                name = "user-circle"
                                style = { styles1.icon }
                                type = 'FontAwesome'
                            />
                        }
                    </View>
                    <Text style = {[ styles1.selfAlign, styles.detailItemWrapper ]}>
                        { this.props.item.name }
                    </Text>
                </View>

        <View style={styles.smallCompartment}>
          <Text style={styles.indentLeft}>Gender</Text>
          <Text style={styles.indentRight}>{this.props.item.gender}</Text>
        </View>

        <View style={styles.smallCompartment}>
          <Icon name="phone" style={styles.indentLeft} type={'FontAwesome'} />
          <Text style={styles.indentRight}>{this.props.item.phoneNumber}</Text>
        </View>
      </View>
    )
  }
}

export default UserProfile
