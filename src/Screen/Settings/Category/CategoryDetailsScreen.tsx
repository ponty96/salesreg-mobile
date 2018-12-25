import React, { Component } from "react";
import Header from "../../../Components/Header/DetailsScreenHeader";
import GenericDetailsComponent from "../../../Components/Generic/Details";
import moment from "moment";
import { DeleteCategoryGQL } from "../../../graphql/mutations/store";
import { ListCompanyCategoriesGQL } from "../../../graphql/queries/store";

interface IProps {
  navigation: any;
  user?: any;
}

export default class CategoryDetailsScreen extends Component<IProps> {
  static navigationOptions = ({ navigation }: any) => {
    const category = navigation.getParam("category", {});
    return {
      header: (
        <Header
          title="Category Details"
          onPressLeftIcon={() => navigation.goBack()}
          onPressRightIcon={() =>
            navigation.navigate("UpsertCategory", { category })
          }
        />
      )
    };
  };

  parseItems = () => {
    const expense = this.props.navigation.getParam("category", {});
    const { expenseItems = [] } = expense;
    return [
      {
        itemTitle: "Date",
        itemValue: moment(expense.date).calendar()
      },
      {
        itemTitle: "Payment Method"
        // itemValue: expense.paymentMethod.toUpperCase()
      }
    ].concat(
      expenseItems.map(expenseItem => ({
        itemTitle: expenseItem.itemName,
        itemValue: `\u20A6 ${expenseItem.amount}`
      }))
    );
  };

  render() {
    const category = this.props.navigation.getParam("category");
    return (
      <GenericDetailsComponent
        title={category.title}
        totalAmount={category.totalAmount}
        items={this.parseItems()}
        graphqlDeleteMutation={DeleteCategoryGQL}
        graphqlDeleteMutationResultKey="deleteCategory"
        graphqlDeleteVariables={{ categoryId: category.id }}
        graphqlRefetchQueries={[
          {
            query: ListCompanyCategoriesGQL,
            variables: {
              //   companyId: this.props.user.company.id,
              first: 10,
              after: null
            }
          }
        ]}
        onSuccessfulDeletion={() =>
          this.props.navigation.navigate("Categories")
        }
      />
    );
  }
}
