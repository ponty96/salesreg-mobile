import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { color } from '../Style/Color';

interface IProps {
  headerText?: string;
  wrapperStyles?: any;
}

class FormContainerWrappedAtom extends React.Component<IProps, any> {
  render() {
    const children = React.Children.map(this.props.children, (child, index) => (
      <View key={index} style={styles.wrappedInputLeft}>
        {child}
      </View>
    ));
    return (
      <View style={styles.mainView}>
        <View style={[styles.innerInputViewForTwo, this.props.wrapperStyles]}>
          {children}
        </View>
      </View>
    );
  }
}

export default FormContainerWrappedAtom;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'transparent',
    width: '100%'
  },
  innerInputViewForTwo: {
    // width: Dimensions.get('screen').width - 32,
    alignSelf: 'center',
    backgroundColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingRight: 12,
    flexWrap: 'wrap',

    paddingVertical: 8
  },
  wrappedInputLeft: {
    width: '50%',
    paddingLeft: 6,
    marginTop: 5
  }
});
