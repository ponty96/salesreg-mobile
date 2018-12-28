import React from "react";
import { RegisterUserMutationGQL } from "../../graphql/mutations/authenticate";
import { Mutation } from "react-apollo";
import { parseFieldErrors } from "../../Functions";
import AppSpinner from "../../Components/Spinner";
import FirstStep from "../../Components/SignUp/FirstStep";
import FormStepperContainer from "../../Container/Form/StepperContainer";
import { AuthenticateClientGQL } from "../../graphql/client-mutations/authenticate";
import Auth from "../../services/auth";
import { UserContext } from "../../context/UserContext";

interface IProps {
  navigation: any;
  screenProps: any;
}

interface IState {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  passwordConfirmation: string;
  currentStep: number;
  fieldErrors: any;
}

export default class UserOnboardScreen extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirmation: "",
    gender: "",
    currentStep: 0,
    fieldErrors: null
  };

  updateState = (key: string, val: any) => {
    const formData = { ...this.state, [key]: val };
    this.setState({ ...formData });
  };

  render() {
    return (
      <UserContext.Consumer>
        {({ resetUserContext }) => (
          <Mutation
            mutation={RegisterUserMutationGQL}
            onCompleted={res => this.onCompleted(res, resetUserContext)}
          >
            {(registerUser, { loading }) => [
              <AppSpinner visible={loading} />,
              this.renderComponentAtStep(() =>
                registerUser({
                  variables: this.parseMutationVariables()
                })
              )
            ]}
          </Mutation>
        )}
      </UserContext.Consumer>
    );
  }

  navigateToStep = step => {
    this.setState({ currentStep: step });
  };

  parseMutationVariables = () => {
    const params = { ...this.state };
    delete params.currentStep;
    delete params.fieldErrors;
    params.gender = params.gender.toUpperCase();
    return { user: params };
  };

  renderComponentAtStep = (handleReg): JSX.Element => {
    const { currentStep } = this.state;
    switch (currentStep) {
      case 0:
      default:
        return <FirstStep onCtaPress={() => this.navigateToStep(1)} />;
      case 1:
        return (
          <FormStepperContainer
            formData={this.state}
            steps={[
              {
                stepTitle: "Tell us a little about yourself",
                formFields: [
                  {
                    label: "What's your first name?",
                    placeholder: "E.g John",
                    type: {
                      type: "input",
                      keyboardType: "default"
                    },
                    validators: ["required"],
                    name: "firstName"
                  },
                  {
                    label: "What's your last name?",
                    placeholder: "E.g Doe",
                    type: {
                      type: "input",
                      keyboardType: "default"
                    },
                    validators: ["required"],
                    name: "lastName"
                  },
                  {
                    label: "Are you male or female?",
                    placeholder: "E.g Doe",
                    type: {
                      type: "radio",
                      options: ["male", "female"]
                    },
                    validators: ["required"],
                    name: "gender"
                  }
                ]
              },
              {
                stepTitle: `Finally, let's make sure no one accesses your account without your permission`,
                formFields: [
                  {
                    label: "Your email please",
                    placeholder: "E.g someone@example.com",
                    type: {
                      type: "input",
                      options: ["male", "female"],
                      keyboardType: "email-address"
                    },
                    validators: ["required", "email"],
                    name: "email"
                  },
                  {
                    label: "Enter a password",
                    placeholder: "Something only you know",
                    type: {
                      type: "input",
                      keyboardType: "default",
                      secureTextEntry: true
                    },
                    validators: ["required", "password"],
                    name: "password",
                    underneathText: "Not less than 8 character long"
                  },
                  {
                    label: "Re-enter password just to be sure",
                    placeholder: "Same thing you entered above",
                    type: {
                      type: "input",
                      keyboardType: "default",
                      secureTextEntry: true
                    },
                    validators: ["required", "password", "confirm-password"],
                    passwordFieldValue: this.state.password,
                    name: "passwordConfirmation"
                  }
                ],
                buttonTitle: "Register"
              }
            ]}
            updateValueChange={this.updateState}
            onCompleteSteps={() => handleReg()}
            handleBackPress={() => this.navigateToStep(0)}
            fieldErrors={this.state.fieldErrors}
          />
        );
    }
  };
  onCompleted = async (res, resetUserContext) => {
    const {
      registerUser: { success, fieldErrors, data }
    } = res;
    if (!success) {
      this.setState({ fieldErrors: parseFieldErrors(fieldErrors) });
    } else {
      /// login here
      const {
        screenProps: { client }
      } = this.props;
      const { accessToken, refreshToken, user } = data;
      await Auth.clearVault();
      await Auth.setToken(accessToken);
      await Auth.setRefreshToken(refreshToken);
      await Auth.setCurrentUser(user);
      resetUserContext(user);
      await client.resetStore();

      client.mutate({
        mutation: AuthenticateClientGQL,
        variables: { user }
      });
    }
  };
}
