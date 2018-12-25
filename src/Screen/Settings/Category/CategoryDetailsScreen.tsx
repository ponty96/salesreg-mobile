import React, { Component } from "react";
import { View } from "react-native";
import Header from "../../../Components/Header/DetailsScreenHeader";
import GenericDetailsComponent from "../../../Components/Generic/Details";

interface IProps {
  navigation: any;
}

export default class CategoryDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const expense = navigation.getParam("expense", {});
    return {
      header: (
        <Header
          title="Category Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate("UpsertExpense", { expense })
          }
        />
      )
    };
  };

  render() {
    return <View />;
  }
}
