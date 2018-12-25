import * as React from "react";
import { Alert } from "react-native";
import Header from "../../../Components/Header/DetailsScreenHeader";
import GenericListIndex from "../../../Components/Generic/ListIndex";
import { ListCompanyCategoriesGQL } from "../../../graphql/queries/store";

interface IProps {
  navigation: any;
}

export default class CategoriesScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Categories"
          onPressRightIcon={() => Alert.alert("Search button pressed.")}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    };
  };

  parseData = (item: any) => {
    return [
      {
        firstTopText: item.title,
        bottomLeftFirstText: item.description
          ? `${item.description.substr(0, 40)}...`
          : "", // item.paidTo
        bottomLeftSecondText: "", // item.date
        topRightText: `` // this should be the number of products and services within this category
      }
    ];
  };

  render() {
    /**
     * TODO
     * Change empty list text
     */
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanyCategoriesGQL}
        graphqlQueryResultKey="listCompanyCategories"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate("CategoryDetails", { category: item })
        }
        emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLets proceed by tapping the`}
        headerText="Great habit keeping records!"
        fabRouteName="UpsertCategory"
        fabIconName="apps"
        fabIconType="MaterialCommunityIcons"
        hideSeparator={true}
      />
    );
  }
}
