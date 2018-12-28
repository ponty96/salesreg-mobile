import * as React from "react";
import { Alert } from "react-native";
import { Mutation } from "react-apollo";
import { ActionSheet } from "native-base";
import Header from "../../../Components/Header/DetailsScreenHeader";
import GenericListIndex from "../../../Components/Generic/ListIndex";
import { ListCompanyOptionsGQL } from "../../../graphql/queries/store";
import { DeleteOptionGQL } from "../../../graphql/mutations/store";
import AppSpinner from "../../../Components/Spinner";

let BUTTONS = ["No", "Yes, delete", "Cancel"];
let DESTRUCTIVE_INDEX = 1;
let CANCEL_INDEX = 2;

interface IProps {
  navigation: any;
}

interface IState {
  forceUpdateId: number;
}

export default class OptionsScreen extends React.Component<IProps, IState> {
  static navigationOptions = ({ navigation }: any) => {
    return {
      header: (
        <Header
          title="Product Variant Options"
          onPressRightIcon={() => Alert.alert("Search button pressed.")}
          onPressLeftIcon={() => navigation.goBack()}
          hideRightMenu={true}
        />
      )
    };
  };

  state = {
    forceUpdateId: Date.now()
  };

  parseData = (item: any, deleteOption: (obj: any) => void) => {
    return [
      {
        firstTopText: item.name,
        bottomLeftSecondText: "", // item.date
        topRightText: ``, // this should be the number of products and services within this option
        showTrash: true,
        onPressTrash: () => {
          ActionSheet.show(
            {
              options: BUTTONS,
              cancelButtonIndex: CANCEL_INDEX,
              destructiveButtonIndex: DESTRUCTIVE_INDEX,
              title: "Delete?"
            },
            buttonIndex => {
              if (buttonIndex == 1) {
                deleteOption({ variables: { optionId: item.id } });
              }
            }
          );
        }
      }
    ];
  };

  onCompleted = async res => {
    const {
      deleteOption: { success, fieldErrors }
    } = res;

    if (!success) {
      setTimeout(
        () =>
          Alert.alert(
            "Error",
            fieldErrors[0].message,
            [{ text: "Ok", onPress: () => null }],
            { cancelable: false }
          ),
        100
      );
    } else {
      this.setState({
        forceUpdateId: Date.now()
      });
    }
  };

  render() {
    return (
      <Mutation
        mutation={DeleteOptionGQL}
        refetchQueries={ListCompanyOptionsGQL}
        awaitRefetchQueries={true}
        onCompleted={this.onCompleted}
      >
        {(deleteOption, { loading }) => (
          <React.Fragment>
            <AppSpinner visible={loading} />
            <GenericListIndex
              forceUpdateID={this.state.forceUpdateId}
              navigation={this.props.navigation}
              graphqlQuery={ListCompanyOptionsGQL}
              graphqlQueryResultKey="listCompanyOptions"
              parseItemData={item => this.parseData(item, deleteOption)}
              onItemPress={item =>
                this.props.navigation.navigate("UpsertOption", { option: item })
              }
              emptyListText={`Your business grows richer when your \nexpenses are under control. No better \nway to control your expenses than keeping a detailed record of your \nspendings \n\nLet's proceed by tapping the`}
              headerText="Great habit keeping records!"
              fabRouteName="UpsertOption"
              fabIconName="package-variant"
              fabIconType="MaterialCommunityIcons"
              hideSeparator={true}
            />
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}
