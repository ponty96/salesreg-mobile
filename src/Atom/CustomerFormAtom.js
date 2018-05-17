import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ImageAtom from "./ImageAtom";
import InputAtom from "./InputAtom";
import styles from "../Style/Form";
import styles1 from "../Style/exportStyles";
import PickerAtom from "./PickerAtom";

export default class CustomerFormAtom extends React.Component {
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
          <View style={styles.inputView}>
            <View style={styles.innerStart}>
              <InputAtom
                label="  Phone number"
                keyboardType="numeric"
                getValue={this.getSQuanity}
                contStyle={styles1.marginlessInput}
              />
            </View>
            <View style={styles.innerEnd}>
              <PickerAtom list={["Gender", "Male", "Female"]} />
            </View>
          </View>
          <View>
            <InputAtom
              label="  Home address"
              keyboardType="numeric"
              getValue={this.getPQuanity}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Email"
              keyboardType="numeric"
              getValue={this.getCostPP}
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
        </View>
      </ScrollView>
    );
  }
}
