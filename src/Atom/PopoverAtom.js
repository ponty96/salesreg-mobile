import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Icon, Text, CheckBox, Left, Right, Body } from "native-base";
import { Popover, PopoverController, PopoverTouchable } from "react-native-modal-popover";
import PropTypes from 'prop-types';

import { popoverStyles } from "./../Style/exportStyles";

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
                style={popoverStyles.touchable}
                ref={setPopoverAnchor}
                onPress={openPopover}
              >
                <Text style={popoverStyles.redClick}>{this.props.tag}</Text>
                <Icon style={popoverStyles.iconTouch} name={this.state.icon} />
              </TouchableOpacity>
              <Popover
                contentStyle={popoverStyles.content}
                arrowStyle={popoverStyles.arrow}
                backgroundStyle={popoverStyles.background}
                placement={this.props.position}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                supportedOrientations={["portrait", "landscape"]}
              >
                <View style={popoverStyles.column}>
                  <View style={popoverStyles.row}>
                    <View style={popoverStyles.mainFirst}>
                      <View style={popoverStyles.viewX} />
                      <Text style={popoverStyles.textX}>Pending</Text>
                    </View>
                    <View style={popoverStyles.mainFirst}>
                      <View style={popoverStyles.viewX} />
                      <Text style={popoverStyles.textX}>Pending Delivery</Text>
                    </View>
                    <View style={popoverStyles.mainSecond}>
                      <View style={popoverStyles.viewX} />
                      <Text style={popoverStyles.textX}>Delivering</Text>
                    </View>
                  </View>
                  <View style={popoverStyles.notMain}>
                    <Left style={popoverStyles.leftSide}>
                      <View style={popoverStyles.innerLeft} />
                      <Text style={popoverStyles.innerLeftText}>Delivered</Text>
                    </Left>
                    <Right style={popoverStyles.rightSide}>
                      <CheckBox
                        checked={this.state.check}
                        color="red"
                        onPress={this.checked}
                      />
                      <Text style={popoverStyles.recall}>Recalled</Text>
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
}