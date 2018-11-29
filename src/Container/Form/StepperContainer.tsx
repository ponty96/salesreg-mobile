/**
 *
 * REQUIREMENTS
 *
 * This container component is a step based form container used everywhere in the app
 *
 * It expects the following for each step:
 *  Step title
 *  Form fields
 *  Button title, or defaults to "Next"
 *  Button onPress handler, or defaults to navigating to the next step
 *
 * Functionality:
 *  - renders form title
 *  - handles step navigation
 *  - handles form client side validation
 */

/**
 *  Form field {
 *   label
 *   placeholder
 *   type
 *   subType
 *   validation: string | [array of string | function ] | function
 *  }
 *
 */

import React from 'react'
import { Text, StyleSheet, View, BackHandler } from 'react-native'
import { Container, Content, Form } from 'native-base'
import { color } from '../../Style/Color'
import ButtonAtom from '../../Atom/Form/ButtonAtom'
import FormHeader from '../../Components/Header/FormHeader'
import InputAtom from '../../Atom/Form/InputAtom'
import RadioButtonAtom from '../../Atom/Form/RadioButtonAtom'
import PickerAtom from '../../Atom/Form/PickerAtom'
import PhoneInputAtom from '../../Atom/Form/PhoneInputAtom'
import ImageUploadAtom from '../../Atom/Form/ImageUploadAtom'
import DatePickerAtom from '../../Atom/Form/DatePickerAtom'
import AddExpenseItemsList from '../../Atom/Form/AddExpenseItemsList'
import MultiSelectPickerAtom from '../../Atom/Form/MultiSelectPicker'
import TagInput from '../../Atom/Form/TagInput'
import AsyncPickerAtom from '../../Atom/Form/AsyncPickerAtom'
import { DocumentNode } from 'graphql'

interface FieldType {
  type:
    | 'input'
    | 'picker'
    | 'phone-input'
    | 'radio'
    | 'image-upload'
    | 'date'
    | 'expense-items'
    | 'multi-picker'
    | 'tag-input'
    | 'search-picker'
    | 'search-multi-picker'
  keyboardType?: 'default' | 'numeric' | 'email-address'
  secureTextEntry?: boolean
  options?: any[]
  multiline?: boolean
  searchQuery?: DocumentNode
  searchQueryResponseKey?: string
}
interface FormField {
  label: string
  placeholder?: string
  type: FieldType
  validators?: any[]
  name: any
  extraData?: any
  underneathText?: string
  value?: any
}
export interface FormStep {
  stepTitle: string
  formFields: FormField[]
  buttonTitle?: string
  stepHint?: string
}
interface IProps {
  steps: FormStep[]
  onCompleteSteps: () => void
  updateValueChange: (key: string, value: any) => void
  onError?: (key: string, error: any) => void
  fieldErrors: any
  formData: any
  handleBackPress: () => void
  onTransition?: (from, to) => void
}
interface IState {
  currentStep: number
  showHeaderBorder?: boolean
}

export default class FormStepperContainer extends React.PureComponent<
  IProps,
  IState
> {
  state = {
    currentStep: 1,
    showHeaderBorder: false
  }
  render() {
    const steps = this.getSteps(this.props.steps)
    return (
      <Container style={{ flex: 1 }}>
        <FormHeader
          onPressBackIcon={this.handleBackButtonPress}
          currentStep={this.state.currentStep}
          totalSteps={steps.length}
          showBottomBorder={this.state.showHeaderBorder}
        />
        <Content contentContainerStyle={styles.container}>
          <Text style={styles.headerText}>
            {steps[this.state.currentStep - 1]['stepTitle']}
          </Text>
          <Text style={styles.stepHint}>
            {steps[this.state.currentStep - 1]['stepHint']}
          </Text>
          <Form>{this.renderCurrentStepFormFields()}</Form>
        </Content>

        <View style={styles.footer}>
          <ButtonAtom
            btnText={`${steps[this.state.currentStep - 1]['buttonTitle'] ||
              'Next'}`}
            onPress={this.onCtaButtonPress}
            type="secondary"
            icon={this.getButtonIcon()}
          />
        </View>
      </Container>
    )
  }

  getSteps = steps => {
    return steps.filter(step => step)
  }
  getButtonIcon = () => {
    if (this.state.currentStep == this.getSteps(this.props.steps).length) {
      return 'md-checkmark'
    } else return null
  }
  handleBackButtonPress = () => {
    const { currentStep } = this.state
    if (currentStep > 1) {
      this.transition(currentStep, currentStep - 1)
    } else {
      this.props.handleBackPress()
    }
  }

  onCtaButtonPress = async () => {
    const { currentStep } = this.state
    if (currentStep == this.getSteps(this.props.steps).length) {
      this.props.onCompleteSteps()
    } else {
      this.transition(currentStep, currentStep + 1)
    }
  }

  transition = async (from, to) => {
    if (this.props.onTransition) {
      await this.props.onTransition(from, to)
      this.setState({ currentStep: to })
    } else {
      this.setState({ currentStep: to })
    }
  }

  renderCurrentStepFormFields = () => {
    const currentStepForm = this.getSteps(this.props.steps)[
      this.state.currentStep - 1
    ]
    return currentStepForm.formFields.map(this.parseFormFields)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.handleBackButtonPress() // works best when the goBack is async
    return true
  }

  parseFormFields = (field: any, index: number) => {
    const {
      type: {
        type,
        keyboardType,
        secureTextEntry = false,
        options = [],
        multiline = false,
        searchQuery,
        searchQueryResponseKey
      },
      label,
      placeholder,
      name,
      extraData,
      underneathText,
      value = ''
    } = field
    const { formData, fieldErrors } = this.props
    switch (type) {
      case 'input':
      default:
        return (
          <InputAtom
            key={`${type}-${index}`}
            label={label}
            placeholder={placeholder}
            defaultValue={formData[name] || value}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={secureTextEntry}
            getValue={val => this.props.updateValueChange(name, val)}
            underneathText={underneathText}
            multiline={multiline}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'radio':
        return (
          <RadioButtonAtom
            key={`${type}-${index}`}
            label={label}
            defaultValue={formData[name]}
            getValue={val => this.props.updateValueChange(name, val)}
            underneathText={underneathText}
            options={options}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'phone-input':
        return (
          <PhoneInputAtom
            key={`${type}-${index}`}
            label={label}
            defaultValue={formData[name]}
            getValue={val => this.props.updateValueChange(name, val)}
            placeholder={placeholder}
            countryCode={extraData['countryCode']}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'image-upload':
        return (
          <ImageUploadAtom
            key={`${type}-${index}`}
            underneathText={underneathText}
            images={formData[name]}
            handleImagesUpload={val => this.props.updateValueChange(name, val)}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'picker':
        return (
          <PickerAtom
            key={`${type}-${index}`}
            label={label}
            list={options}
            selected={formData[name]}
            placeholder={placeholder}
            handleSelection={val => this.props.updateValueChange(name, val)}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'date':
        return (
          <DatePickerAtom
            key={`${type}-${index}`}
            label={label}
            date={formData[name]}
            placeholder={placeholder}
            handleDateSelection={val => this.props.updateValueChange(name, val)}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'expense-items':
        return (
          <AddExpenseItemsList
            key={`${type}-${index}`}
            expenseItems={formData[name]}
            onUpdateItems={(items: any) =>
              this.props.updateValueChange(name, items)
            }
          />
        )
      case 'multi-picker':
        return (
          <MultiSelectPickerAtom
            key={`${type}-${index}`}
            label={label}
            list={options}
            selectedItems={formData[name]}
            placeholder={placeholder}
            handleSelection={val => this.props.updateValueChange(name, val)}
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'tag-input':
        return (
          <TagInput
            key={`${type}-${index}`}
            label={label}
            tags={formData[name]}
            handleValuesChange={tags =>
              this.props.updateValueChange(name, tags)
            }
            error={fieldErrors && fieldErrors[name]}
          />
        )
      case 'search-picker':
      case 'search-multi-picker':
        return (
          <AsyncPickerAtom
            key={`${type}-${index}`}
            label={label}
            selected={formData[name]}
            placeholder={placeholder}
            handleSelection={val => this.props.updateValueChange(name, val)}
            error={fieldErrors && fieldErrors[name]}
            graphqlQuery={searchQuery}
            graphqlQueryResultKey={searchQueryResponseKey}
            type={type == 'search-multi-picker' ? 'multi' : 'single'}
          />
        )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32
  },
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 22,
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold',
    marginBottom: 0,
    marginTop: 16
  },
  stepHint: {
    fontFamily: 'AvenirNext-Regular',
    fontSize: 16,
    color: color.textColor,
    marginTop: 8,
    marginBottom: 16
  },
  footer: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 16
  }
})
