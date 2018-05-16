import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ImageAtom from "./ImageAtom";
import InputAtom from "./InputAtom";
import PickerAtom from "./PickerAtom";
import GoldRatingsAtom from "./GoldRatingsAtom";
import styles from "../Style/Form";
import styles1 from '..Style/exportStyles';

export default class EditCustomerAtom extends React.Component {
  state = {
    product: "",
    image: ""
  };

  create = () => {
    this.props.navigation.goBack();
  };

  getProduct = product => {
    this.setState({ product });
  };

  getImage = pic => {
    this.setState({
      image: pic
    });
  };

  render() {
    return (
      <ScrollView>
        <View>
          <ImageAtom getValue={this.getImage} />
          <View>
            <InputAtom
              label="  Name"
              getValue={this.getProduct}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Phone number(separate numbers with commas):"
              keyboardType="numeric"
              getValue={this.getPhone}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View style={styles.innerFirstPicker}>
            <PickerAtom list={["Gender", "Male", "Female"]} />
          </View>
          <View>
            <InputAtom
              label="  Address"
              keyboardType="numeric"
              getValue={this.getAddress}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Type Email Address"
              keyboardType="email-address"
              getValue={this.getUCost}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label="  Debt limit"
                keyboardType="numeric"
                getValue={this.getUCost}
                contStyle={styles1.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label="  Birthday"
                keyboardType="numeric"
                getValue={this.getUCost}
                contStyle={styles1.marginfulInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.inputView}>
            <View style={styles.innerFirstPicker}>
              <PickerAtom list={["Marital Status", "Married", "Single"]} />
            </View>
            <View style={styles.innerEnd}>
              <InputAtom
                label="  Marriage Anniversary"
                keyboardType="numeric"
                getValue={this.getSellP}
                contStyle={styles1.marginlessInput}
              />
              <Text style={styles.underText}>DD/MM/YYYY</Text>
            </View>
          </View>
          <View style={styles.secondCompartment}>
            <View style={styles.compartmentItemWrapper}>
              <Text style={styles.compartmentItem}>
                Rating {this.props.customerName}
              </Text>
              <GoldRatingsAtom />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
