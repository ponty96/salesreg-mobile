import React, { PureComponent } from 'react';
import { Icon } from 'native-base';
import { Image, View, Text, StyleSheet } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  navigation: any;
  item: any;
}

interface IState {}

class UserProfile extends PureComponent<IProps, IState> {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.secondCompartment, styles.bottomPadding]}>
          <View style={styles.selfAlign}>
            {this.props.item.image ? (
              <Image
                source={{ uri: this.props.item.image }}
                style={styles.imgContainer}
              />
            ) : (
              <Icon name="user-circle" style={styles.icon} type="FontAwesome" />
            )}
          </View>
          <Text style={[styles.selfAlign, styles.detailItemWrapper]}>
            {this.props.item.name}
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
    );
  }
}

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondary
  },
  secondCompartment: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 10
  },
  bottomPadding: {
    paddingBottom: 30
  },
  detailItemWrapper: {
    marginVertical: 10
  },
  smallCompartment: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: color.textBorderBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  indentLeft: {
    marginLeft: 20
  },
  indentRight: {
    marginRight: 20
  },
  selfAlign: {
    alignSelf: 'center'
  },
  icon: {
    marginTop: 15,
    color: color.inactive
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 16
  }
});
