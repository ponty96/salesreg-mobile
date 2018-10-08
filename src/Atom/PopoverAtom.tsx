import * as React from 'react'
import { TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native'
import { Text, CheckBox, Left, Right } from 'native-base'
import { Popover, PopoverController } from 'react-native-modal-popover'
import Icon from './Icon'

interface IProps {
  check?: boolean
  tag: string
  position?: 'bottom' | 'left' | 'right' | 'top' | 'auto'
}

interface IState {
  icon: string
  check: boolean
}

class PopoverAtom extends React.Component<IProps, IState> {
  state: IState = {
    icon: 'md-arrow-dropdown',
    check: this.props.check
  }

  onHot = () => {
    if (this.state.icon === 'md-arrow-dropdown') {
      this.setState({
        icon: 'md-arrow-dropup'
      })
    } else if (this.state.icon === 'md-arrow-dropup') {
      this.setState({
        icon: 'md-arrow-dropdown'
      })
    }
  }
  checked = () => {
    this.setState({
      check: !this.state.check
    })
  }

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
    )
  }
}

export default PopoverAtom

const styles = StyleSheet.create({
  popoverContent: {
    width: Dimensions.get('window').width - 12,
    height: 95,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 0,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 2,
    borderColor: 'grey'
  },
  popoverArrow: {
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0,
    padding: 0
  },
  popoverBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  popoverTouchable: {
    flex: 0,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginTop: 15
  },
  popoverRedClick: {
    color: 'red',
    fontSize: 13,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5
  },
  popoverIconTouch: {
    paddingTop: 4
  },
  popoverColumn: {
    flexDirection: 'column'
  },
  popoverRow: {
    flexDirection: 'row'
  },
  popoverMainFirst: {
    flexDirection: 'row',
    width: (Dimensions.get('window').width - 12) / 3,
    alignItems: 'center'
  },
  popoverMainSecond: {
    flexDirection: 'row',
    marginRight: 0,
    width: (Dimensions.get('window').width - 12) / 3 - 30,
    justifyContent: 'flex-end'
  },
  popoverViewX: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: '#c0c0c0'
  },
  popoverTextX: {
    fontSize: 12,
    paddingLeft: 4
  },
  popoverNotMain: {
    flexDirection: 'row',
    marginTop: 30
  },
  popoverLeftSide: {
    flexDirection: 'row',
    marginRight: 100,
    alignItems: 'center'
  },
  popoverRightSide: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 0,
    marginBottom: 8
  },
  popoverInnerLeft: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: 'red'
  },
  popoverRecall: {
    textAlign: 'right',
    fontSize: 12,
    paddingLeft: 16
  },
  popoverInnerLeftText: {
    fontSize: 12,
    paddingLeft: 4
  }
})
