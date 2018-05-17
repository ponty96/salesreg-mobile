import React from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ImageAtom from "./ImageAtom";
import InputAtom from "./InputAtom";
import styles from "../Style/Form";
import styles1 from "../Style/exportStyles";

export default class ProductFormAtom extends React.Component {
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
              label="  Product name"
              getValue={this.getProduct}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Stock quantity"
              keyboardType="numeric"
              getValue={this.getSQuanity}
              contStyle={styles1.marginlessInput}
            />
            <Text style={styles.font1}>Quantity available in store</Text>
          </View>
          <View>
            <InputAtom
              label="  Pack quantity"
              keyboardType="numeric"
              getValue={this.getPQuanity}
              contStyle={styles1.marginlessInput}
            />
            <Text style={styles.font1}>
              Quantity in a pack e.g. Dozen, caton, packet, container
            </Text>
          </View>
          <View>
            <InputAtom
              label="  Cost price per pack"
              keyboardType="numeric"
              getValue={this.getCostPP}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Unit cost price"
              keyboardType="numeric"
              getValue={this.getUCost}
              contStyle={styles1.marginlessInput}
            />
            <Text style={styles.font1}>
              Cost price of 1 unit e.g. 1 piece, 1 dozen, 1 caton, 1 liter
            </Text>
          </View>
          <View>
            <InputAtom
              label="  Selling price"
              keyboardType="numeric"
              getValue={this.getSellP}
              contStyle={styles1.marginlessInput}
            />
          </View>
          <View>
            <InputAtom
              label="  Minimum stock quanity"
              keyboardType="numeric"
              getValue={this.getCostPP}
              contStyle={styles1.marginlessInput}
            />
            <Text style={styles.font1}>
              Minimum amount required for re-stock
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
