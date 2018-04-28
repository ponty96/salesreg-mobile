import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "native-base";


export default class TotalDebtAtom extends React.Component {
  render() {
    let icon=(this.props.limit >= 300000) ? "md-warning": "md-add";
    let iconc=(this.props.limit >= 300000) ? "red": "transparent";
    display = () => {
        if (this.props.limit >= 300000) {
            return(<Icon name={icon} style={{color: iconc, fontSize: 22}} />);
        }
    }
    displayView = () => {
        if (this.props.limit <= 100000) {
            return(
                <View style={styles.redNumberView}>
                    <Text style={styles.redNumber}>NGN {this.props.totalAmount}.00</Text>
                </View>
            );
        } else if (this.props.limit > 100000 && this.props.limit <= 299999) {
            return(
                <View style={styles.redNumberView1}>
                    <Text style={styles.redNumber1}>NGN {this.props.totalAmount}.00</Text>
                </View>
            );
        } else {
            return(
                <View style={styles.redNumberView2}>
                    <Text style={styles.redNumber1}>NGN {this.props.totalAmount}.00</Text>
                </View>
            );
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.totalView}>
                {
                display()
                }
                <Text style={styles.totalText}>  TOTAL</Text>
            </View>
                {
                displayView()
                }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      flex: 0,
      borderTopWidth: 0.5,
      borderTopColor: "#f0f0f0"
  },
  totalView: {
    flexDirection: "row",
    width: '30%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  totalText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#000",
  },
  redNumber: {
    color: 'rgba(218,11,11,59)',
    fontSize: 20,
    fontWeight: 'bold',
  },
  redNumber1: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  redNumberView: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEEF4',
  },
  redNumberView1: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
  },
  redNumberView2: {
    width: '70%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(218,11,11,59)',
  }
});
