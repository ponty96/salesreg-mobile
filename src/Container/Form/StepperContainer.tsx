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
import { Text, StyleSheet, View, BackHandler, Alert } from 'react-native'
import { Container, Content, Form } from 'native-base'
import { color } from '../../Style/Color'
import { connect } from 'react-redux'
import ButtonAtom from '../../Atom/Form/ButtonAtom'
import FormHeader from '../../Components/Header/FormHeader'
import InputAtom from '../../Atom/Form/InputAtom'
import RadioButtonAtom from '../../Atom/Form/RadioButtonAtom'
import PickerAtom from '../../Atom/Form/PickerAtom'
import PhoneInputAtom from '../../Atom/Form/PhoneInputAtom'
import ImageUploadAtom from '../../Atom/Form/ImageUploadAtom'
import MediaUploadAtom from '../../Atom/Form/MediaUploadAtom'
import DatePickerAtom from '../../Atom/Form/DatePickerAtom'
import AddExpenseItemsList from '../../Atom/Form/AddExpenseItemsList'
import CardPaymentAtom from '../../Atom/Form/CardPaymentAtom'
import AddSalesOrderItemsList from '../../Atom/Form/AddSalesOrderItemsList'
import MultiSelectPickerAtom from '../../Atom/Form/MultiSelectPicker'
import ProductListAtom from '../../Atom/Form/ProductListAtom'
import TagInput from '../../Atom/Form/TagInput'
import AsyncPickerAtom from '../../Atom/Form/AsyncPickerAtom'
import { DocumentNode } from 'graphql'
import {
  validateStep,
  validateField
} from '../../Functions/formStepperValidators'
import AddRestockItemsList from '../../Atom/Form/AddRestockItems'

interface FieldType {
  type:
    | 'input'
    | 'picker'
    | 'phone-input'
    | 'radio'
    | 'image-upload'
    | 'date'
    | 'expense-items'
    | 'sales-order-items'
    | 'multi-picker'
    | 'tag-input'
    | 'search-picker'
    | 'search-multi-picker'
    | 'card-payment'
    | 'restock-items'
    | 'product-list'
    | 'multi-media-upload'
  keyboardType?: 'default' | 'numeric' | 'email-address'
  secureTextEntry?: boolean
  options?: any[]
  disabled?: boolean
  multiline?: boolean
  searchQuery?: DocumentNode
  searchQueryResponseKey?: string
}

type validatorTypes =
  | 'required'
  | 'email'
  | 'phone'
  | 'sales-order'
  | 'password'
  | 'expense-item'

interface FormField {
  label: string
  placeholder?: string
  type: FieldType
  validators?: validatorTypes[]
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
  mediasFromStore: () => void
  onTransition?: (from, to) => void
}
interface IState {
  currentStep: number
  showHeaderBorder?: boolean
  stepValidity: any
  fieldErrors: object
  isReadyToSubmitForm: boolean
  multipleMediaUploadInstanceKey: number
  singleMediaUploadInstanceKey?: number
}

class FormStepperContainer extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      fieldErrors: {},
      isReadyToSubmitForm: false,
      stepValidity: {},
      showHeaderBorder: false,
      multipleMediaUploadInstanceKey: Date.now()
    }
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
            onPress={this.handleButtonPress}
            type="secondary"
            icon={this.getButtonIcon()}
          />
        </View>
      </Container>
    )
  }

  checkImageUploadingState = () => {
    let { mediasFromStore, steps } = this.props,
      {
        multipleMediaUploadInstanceKey,
        singleMediaUploadInstanceKey,
        currentStep
      } = this.state

    if (
      mediasFromStore[multipleMediaUploadInstanceKey] ||
      (mediasFromStore[singleMediaUploadInstanceKey] &&
        currentStep == steps.length)
    ) {
      let multipleUploads = mediasFromStore[multipleMediaUploadInstanceKey],
        singleUploads = mediasFromStore[singleMediaUploadInstanceKey],
        _multipleUploads = multipleUploads || [],
        _singleUploads = singleUploads || [],
        merger = _singleUploads.concat(_multipleUploads)

      let shouldSubmit = true
      merger.forEach(media => {
        if (media.state != 'success') {
          shouldSubmit = false
        }
      })
      return shouldSubmit
    }
    return true
  }

  handleButtonPress = () => {
    let imageValidity = this.checkImageUploadingState()

    if (!imageValidity) {
      Alert.alert(
        'Error',
        'One or more images failed or are still loading, please cancel or wait to proceed with submission',
        [{ text: 'Ok', onPress: () => null }],
        { cancelable: false }
      )
    } else {
      this.updateStepValidity(() =>
        this.getValidity() && imageValidity
          ? this.onCtaButtonPress()
          : this.props.updateValueChange('fieldErrors', this.state.fieldErrors)
      )
    }
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
      this.setState({ isReadyToSubmitForm: true })
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

  getValidity = () => {
    let { currentStep, stepValidity } = this.state,
      isStepValid = true
    if (stepValidity[currentStep]) {
      Object.keys(stepValidity[currentStep]).forEach(key => {
        if (!stepValidity[currentStep][key]) {
          isStepValid = false
        }
      })
    }
    return isStepValid
  }

  checkValidityOnValueChange = (value, name, validators) => {
    if (validators && validators.length > 0) {
      let { currentStep } = this.state

      let { validity, error } = validateField(
        validators,
        name,
        value,
        this.state.stepValidity[currentStep],
        this.props.fieldErrors
      )

      this.setState(
        {
          stepValidity: {
            ...this.state.stepValidity,
            [currentStep]: validity
          }
        },
        () => {
          this.props.updateValueChange('fieldErrors', error)
        }
      )
    }
  }

  updateStepValidity = (callback?: () => void) => {
    const currentStepForm = this.getSteps(this.props.steps)[
      this.state.currentStep - 1
    ]

    let { currentStep } = this.state,
      { stepValidity, errors } = validateStep(
        currentStepForm,
        this.props.formData,
        this.props.fieldErrors
      )

    this.setState(
      {
        stepValidity: {
          ...this.state.stepValidity,
          [currentStep]: stepValidity
        },
        fieldErrors: errors
      },
      () => callback && callback()
    )
  }

  renderCurrentStepFormFields = () => {
    const currentStepForm = this.getSteps(this.props.steps)[
      this.state.currentStep - 1
    ]
    return currentStepForm.formFields.map(this.parseFormFields)
  }

  filterFormFields = fields => fields.filter(field => field)

  componentDidMount() {
    this.setState({
      singleMediaUploadInstanceKey: Date.now()
    })
    this.updateStepValidity()
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentDidUpdate(prevProps, prevState) {
    let { currentStep } = this.state

    if (
      currentStep != prevState.currentStep ||
      this.filterFormFields(
        this.getSteps(this.props.steps)[currentStep - 1].formFields
      ).length !=
        this.filterFormFields(
          this.getSteps(prevProps.steps)[currentStep - 1].formFields
        ).length
    ) {
      this.updateStepValidity()
    }

    this.handleServerFieldErrors(prevProps)
  }

  handleServerFieldErrors = prevProps => {
    let { fieldErrors, steps } = this.props,
      { isReadyToSubmitForm } = this.state

    if (
      isReadyToSubmitForm &&
      fieldErrors != prevProps.fieldErrors &&
      Object.keys(fieldErrors).length > 0
    ) {
      let fields = Object.keys(fieldErrors),
        currentStep = undefined

      for (let len = 0; len < steps.length; len++) {
        steps[len].formFields.forEach(formField => {
          if (fields.indexOf(formField.name) != -1) {
            currentStep = len
          }
        })
        if (currentStep) break
      }

      this.setState(
        {
          isReadyToSubmitForm: false
        },
        () => this.transition(currentStep, currentStep + 1)
      )
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    this.handleBackButtonPress() // works best when the goBack is async
    return true
  }

  parseFormFields = (field: any, index: number) => {
    if (field) {
      const {
        type: {
          type,
          disabled,
          keyboardType,
          secureTextEntry = false,
          options = [],
          multiline = false,
          searchQuery,
          searchQueryResponseKey
        },
        validators,
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
              getValue={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
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
              getValue={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
              underneathText={underneathText}
              options={options}
              error={fieldErrors && fieldErrors[name]}
            />
          )
        case 'sales-order-items':
          return (
            <AddSalesOrderItemsList
              error={fieldErrors && fieldErrors[name]}
              key={`${type}-${index}`}
              salesItems={formData[name]}
              onUpdateItems={(items: any) => {
                this.checkValidityOnValueChange(items, name, validators)
                this.props.updateValueChange(name, items)
              }}
            />
          )
        case 'phone-input':
          return (
            <PhoneInputAtom
              key={`${type}-${index}`}
              label={label}
              defaultValue={formData[name]}
              getValue={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
              placeholder={placeholder}
              countryCode={extraData['countryCode']}
              error={fieldErrors && fieldErrors[name]}
            />
          )
        case 'image-upload':
          return (
            <ImageUploadAtom
              reduxMediaUploadClass={this.state.singleMediaUploadInstanceKey}
              key={`${type}-${index}`}
              underneathText={underneathText}
              image={formData[name]}
              handleImageUpload={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
              error={fieldErrors && fieldErrors[name]}
            />
          )
        case 'multi-media-upload':
          return (
            <MediaUploadAtom
              key={`${type}-${index}`}
              error={fieldErrors && fieldErrors[name]}
              reduxMediaUploadClass={this.state.multipleMediaUploadInstanceKey}
              medias={formData[name]}
              handleMediasUpload={arrayOfValues =>
                this.props.updateValueChange(name, arrayOfValues)
              }
            />
          )
        case 'picker':
          return (
            <PickerAtom
              key={`${type}-${index}`}
              label={label}
              disabled={disabled}
              list={options}
              selected={formData[name]}
              placeholder={placeholder}
              handleSelection={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
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
              handleDateSelection={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
              error={fieldErrors && fieldErrors[name]}
            />
          )
        case 'expense-items':
          return (
            <AddExpenseItemsList
              key={`${type}-${index}`}
              error={fieldErrors && fieldErrors[name]}
              expenseItems={formData[name]}
              onUpdateItems={(items: any) => {
                this.checkValidityOnValueChange(items, name, validators)
                this.props.updateValueChange(name, items)
              }}
            />
          )
        case 'card-payment':
          return (
            <CardPaymentAtom
              handleCardSelection={(cardDetails: any) =>
                this.props.updateValueChange(name, cardDetails)
              }
              error={fieldErrors && fieldErrors[name]}
              key={`${type}-${index}`}
              amount={formData[name]}
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
        case 'product-list':
          return <ProductListAtom list={formData[name]} />
        case 'restock-items':
          return (
            <AddRestockItemsList
              products={formData[name]}
              error={fieldErrors && fieldErrors[name]}
              onUpdateItems={items => {
                this.checkValidityOnValueChange(items, name, validators)
                this.props.updateValueChange(name, items)
              }}
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
              handleSelection={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
              error={fieldErrors && fieldErrors[name]}
              graphqlQuery={searchQuery}
              graphqlQueryResultKey={searchQueryResponseKey}
              type={type == 'search-multi-picker' ? 'multi' : 'single'}
            />
          )
      }
    }
    return null
  }
}

function mapStateToProps(state) {
  return {
    mediasFromStore: state.mediaUploads
  }
}

export default connect(mapStateToProps)(FormStepperContainer)

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
