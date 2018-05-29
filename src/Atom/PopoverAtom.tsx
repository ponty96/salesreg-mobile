import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text, CheckBox, Left, Right } from 'native-base';
import { Popover, PopoverController } from 'react-native-modal-popover';
import styles from '../Style/exportStyles';

interface IProps {
  check?: boolean;
  tag: string;
  position?: 'bottom' | 'left' | 'right' | 'top' | 'auto';
}

interface IState {
  icon: string;
  check: boolean;
}

class PopoverAtom extends React.Component<IProps, IState> {
  state: IState = {
    icon: 'md-arrow-dropdown',
    check: this.props.check
  };

  onHot = () => {
    if (this.state.icon === 'md-arrow-dropdown') {
      this.setState({
        icon: 'md-arrow-dropup'
      });
    } else if (this.state.icon === 'md-arrow-dropup') {
      this.setState({
        icon: 'md-arrow-dropdown'
      });
    }
  };
  checked = () => {
    this.setState({
      check: !this.state.check
    });
  };

  render() {
    return (
      <View>
        <PopoverController>
          {({
            openPopover,
            closePopover,
            popoverVisible,
            setPopoverAnchor,
            popoverAnchorRect
          }) => (
            <React.Fragment>
              <TouchableOpacity
                style={styles.popoverTouchable}
                ref={setPopoverAnchor}
                onPress={openPopover}
              >
                <Text style={styles.popoverRedClick}>{this.props.tag}</Text>
                <Icon style={styles.popoverIconTouch} name={this.state.icon} />
              </TouchableOpacity>
              <Popover
                contentStyle={styles.popoverContent}
                arrowStyle={styles.popoverArrow}
                backgroundStyle={styles.popoverBackground}
                placement={this.props.position}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                supportedOrientations={['portrait', 'landscape']}
              >
                <View style={styles.popoverColumn}>
                  <View style={styles.popoverRow}>
                    <View style={styles.popoverMainFirst}>
                      <View style={styles.popoverViewX} />
                      <Text style={styles.popoverTextX}>Pending</Text>
                    </View>
                    <View style={styles.popoverMainFirst}>
                      <View style={styles.popoverViewX} />
                      <Text style={styles.popoverTextX}>Pending Delivery</Text>
                    </View>
                    <View style={styles.popoverMainSecond}>
                      <View style={styles.popoverViewX} />
                      <Text style={styles.popoverTextX}>Delivering</Text>
                    </View>
                  </View>
                  <View style={styles.popoverNotMain}>
                    <Left style={styles.popoverLeftSide}>
                      <View style={styles.popoverInnerLeft} />
                      <Text style={styles.popoverInnerLeftText}>Delivered</Text>
                    </Left>
                    <Right style={styles.popoverRightSide}>
                      <CheckBox
                        checked={this.state.check}
                        color="red"
                        onPress={this.checked}
                      />
                      <Text style={styles.popoverRecall}>Recalled</Text>
                    </Right>
                  </View>
                </View>
              </Popover>
            </React.Fragment>
          )}
        </PopoverController>
      </View>
    );
  }
}

export default PopoverAtom;
