import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text, CheckBox, Left, Right, Body } from "native-base";
import {
  Popover,
  PopoverController,
  PopoverTouchable
} from "react-native-modal-popover";
import PropTypes from "prop-types";

import styles from "../Style/exportStyles";

export default class PopoverAtom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "md-arrow-dropdown",
      check: this.props.check
    };
  }

  onHot = () => {
    if (this.state.icon == "md-arrow-dropdown") {
      this.setState({
        icon: "md-arrow-dropup"
      });
    } else if (this.state.icon == "md-arrow-dropup") {
      this.setState({
        icon: "md-arrow-dropdown"
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
                supportedOrientations={["portrait", "landscape"]}
              >
                <View style={styles.popoverColumn}>
                  <View style={styles.popoverRow}>
                    <View style={styles.popoverStyles.mainFirst}>
                      <View style={styles.popoverStyles.viewX} />
                      <Text style={styles.popoverStyles.textX}>Pending</Text>
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

PopoverAtom.propTypes = {
  position: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  check: PropTypes.bool
};
