import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Text, CheckBox, Left, Right, Body } from 'native-base';
import { Popover, PopoverController, PopoverTouchable } from 'react-native-modal-popover';

import popoverStyles from './../Style/exportStyles';

export default class PopoverAtom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "md-arrow-dropdown",
      check: this.props.check
    };
  }

  onHot = () => {
    if (this.state.icon == "md-arrow-dropdown"){
      this.setState({
        icon: "md-arrow-dropup",
      });
  } else if (this.state.icon == "md-arrow-dropup"){
    this.setState({
      icon: "md-arrow-dropdown",
    });
  }
  }
  checked = () => {
    this.setState({
      check: !this.state.check
    });
  }

  render() {
    return (
        <View>
        <PopoverController>
    {({ openPopover, closePopover, popoverVisible, setPopoverAnchor, popoverAnchorRect }) => (
            <React.Fragment>
              <TouchableOpacity style={{flex: 0, alignSelf: "flex-end", flexDirection: "row", marginTop: 15}} ref={setPopoverAnchor} onPress={openPopover}><Text style={{color: "red", fontSize: 13, paddingTop: 5, paddingBottom: 5, paddingRight: 5}}>{this.props.tag}</Text><Icon style={{paddingTop: 4 }} name={this.state.icon}/></TouchableOpacity>
              <Popover 
                contentStyle={popoverStyles.content}
                arrowStyle={popoverStyles.arrow}
                backgroundStyle={popoverStyles.background}
                placement={this.props.position}
                visible={popoverVisible}
                onClose={closePopover}
                fromRect={popoverAnchorRect}
                supportedOrientations={['portrait', 'landscape']}
              >
                <View style={{flexDirection: "column"}}>
                  <View style={{flexDirection: "row"}}>
                      <View style={{flexDirection: "row",  marginRight: 50, alignItems: "center"}}><View style={{width: 12, height: 12, borderRadius: 12/2, backgroundColor: "#c0c0c0"}}/><Text style={{fontSize: 12, paddingLeft: 4}}>Pending</Text></View>
                      <View style={{flexDirection: "row", marginRight: 50, alignItems: "center"}}><View style={{width: 12, height: 12, borderRadius: 12/2, backgroundColor: "#c0c0c0"}}/><Text style={{fontSize: 12, paddingLeft: 4}}>Pending Delivery</Text></View>
                      <View style={{flexDirection: "row", marginRight: 0, alignItems: "center"}}><View style={{width: 12, height: 12, borderRadius: 12/2, backgroundColor: "#c0c0c0"}}/><Text style={{fontSize: 12, paddingLeft: 4}}>Delivering</Text></View>
                  </View>
                  <View style={{flexDirection: "row", marginTop: 30}}>
                    <Left style={{flexDirection: "row", marginRight: 100, alignItems: "center"}}><View style={{width: 12, height: 12, borderRadius: 12/2, backgroundColor: "red"}}/><Text style={{fontSize: 12, paddingLeft: 4}}>Delivered</Text></Left>
                    <Right style={{flex:0, flexDirection: "row", alignSelf: "flex-end", marginRight: 0, marginBottom: 8}}><CheckBox checked={this.state.check} color="red" onPress={this.checked} /><Text style={{textAlign: "right", fontSize: 12, paddingLeft: 16}}>Recalled</Text></Right>
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