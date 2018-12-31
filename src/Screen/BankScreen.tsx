import * as React from "react";
import { Alert } from "react-native";
import Header from "../Components/Header/BaseHeader";
import GenericListIndex from "../Components/Generic/ListIndex";
import { ListCompanyBanksGQL } from "../graphql/queries/business";
import { getBankName } from "../utilities/data/picker-lists";

interface IProps {
  navigation: any;
}

export default class BanksScreen extends React.Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Banks"
          onPressRightIcon={() => Alert.alert("Search button pressed.")}
          onPressLeftIcon={() => navigation.navigate("DrawerToggle")}
        />
      )
    };
  };

  parseData = (item: any) => {
    return [
      {
        firstTopText: `${item.accountNumber} - ${getBankName(item.bankName)}`,
        bottomLeftFirstText: item.isPrimary ? "Primary Account" : null, // item.paidTo
        bottomLeftSecondText: "", // item.date
        topRightText: ""
      }
    ];
  };

  render() {
    return (
      <GenericListIndex
        navigation={this.props.navigation}
        graphqlQuery={ListCompanyBanksGQL}
        graphqlQueryResultKey="companyBanks"
        parseItemData={this.parseData}
        onItemPress={item =>
          this.props.navigation.navigate("BankDetails", { bank: item })
        }
        showFabFn={sections => (sections.length == 0 ? true : false)}
        emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLet's proceed by tapping the`}
        headerText="Great habit keeping records!"
        fabRouteName="UpsertBank"
        fabIconName="bank"
        fabIconType="MaterialCommunityIcons"
        hideSeparator={true}
      />
    );
  }
}
