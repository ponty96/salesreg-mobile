import React from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Form, Icon } from 'native-base'
import { connect } from 'react-redux'

import { FormStep as IFormStep } from './Form/StepperContainer'
import InputAtom from '../Atom/Form/InputAtom'
import RadioButtonAtom from '../Atom/Form/RadioButtonAtom'
import ButtonAtom from '../Atom/Form/ButtonAtom'
import PickerAtom from '../Atom/Form/PickerAtom'
import PhoneInputAtom from '../Atom/Form/PhoneInputAtom'
import ImageUploadAtom from '../Atom/Form/ImageUploadAtom'
import MediaUploadAtom from '../Atom/Form/MediaUploadAtom'
import DatePickerAtom from '../Atom/Form/DatePickerAtom'
import DocumentUploadAtom from '../Atom/Form/DocumentUploadAtom'
import AddExpenseItemsList from '../Atom/Form/AddExpenseItemsList'
import AddSalesOrderItemsList from '../Atom/Form/AddSalesOrderItemsList'
import MultiSelectPickerAtom from '../Atom/Form/MultiSelectPicker'
import ProductListAtom from '../Atom/Form/ProductListAtom'
import TagInput from '../Atom/Form/TagInput'
import AsyncPickerAtom from '../Atom/Form/AsyncPickerAtom'
import AddRestockItemsList from '../Atom/Form/AddRestockItems'
import { validateField, validateStep } from '../Functions/formStepperValidators'
import { color } from '../Style/Color'

interface FormStep extends IFormStep {
  onSave: () => void
  onCancel?: () => void
}

interface IProps {
  title: string
  formData: any
  updateValueChange: (key: string, value: any) => void
  fieldErrors: any
  initialStep?: number
  mediasFromStore: () => void
  steps: FormStep[]
  onCompleteSteps?: () => void
  setRef?: (self: any) => void
}

interface IState {
  currentStep: number
  stepValidity: any
  fieldErrors: any
  multipleMediaUploadInstanceKey: number
  singleMediaUploadInstanceKey?: number
}

class ProgressTracker extends React.PureComponent<IProps, IState> {
  state = {
    currentStep: this.props.initialStep || 1,
    fieldErrors: {},
    stepValidity: {},
    multipleMediaUploadInstanceKey: Date.now(),
    singleMediaUploadInstanceKey: 0
  }

  componentDidMount() {
    this.setState({
      singleMediaUploadInstanceKey: Date.now()
    })
    this.props.setRef(this)
    setTimeout(() => this.updateStepValidity(), 500)
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

  checkValidityOnValueChange = (
    value,
    name,
    validators,
    passwordFieldValue?: any
  ) => {
    if (validators && validators.length > 0) {
      let { currentStep } = this.state

      let { validity, error } = validateField(
        validators,
        name,
        value,
        this.state.stepValidity[currentStep],
        this.props.fieldErrors,
        false,
        passwordFieldValue
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

  parseFormFields = (field: any, index: number) => {
    if (field) {
      const {
        type: {
          type,
          disabled,
          uploadCategory,
          keyboardType,
          maxDate,
          minDate,
          secureTextEntry = false,
          options = [],
          multiline = false,
          searchQuery,
          searchQueryResponseKey,
          emptySection
        },
        validators,
        label,
        placeholder,
        name,
        passwordFieldValue,
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
                this.checkValidityOnValueChange(
                  val,
                  name,
                  validators,
                  passwordFieldValue
                )
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
              uploadCategory={uploadCategory}
              underneathText={underneathText}
              image={formData[name]}
              handleImageUpload={val => {
                this.checkValidityOnValueChange(val, name, validators)
                this.props.updateValueChange(name, val)
              }}
              error={fieldErrors && fieldErrors[name]}
            />
          )
        case 'document-upload':
          return (
            <DocumentUploadAtom
              reduxMediaUploadClass={this.state.singleMediaUploadInstanceKey}
              key={`${type}-${index}`}
              underneathText={underneathText}
              document={formData[name]}
              handleDocumentUpload={val => {
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
              maxDate={maxDate}
              minDate={minDate}
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
              underneathText={underneathText}
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
              emptySection={emptySection}
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

  getValidity = () => {
    let imageValidity = this.checkImageUploadingState(),
      { currentStep, stepValidity } = this.state,
      isStepValid = true
    if (stepValidity[currentStep]) {
      Object.keys(stepValidity[currentStep]).forEach(key => {
        if (!stepValidity[currentStep][key]) {
          isStepValid = false
        }
      })
    }

    return imageValidity && isStepValid
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

  getSteps = steps => {
    return steps.filter(step => step)
  }

  gotoNext = (step?: number) => {
    this.setState({
      currentStep: typeof step == 'number' ? step : this.state.currentStep + 1
    })
  }

  canGoForward = () => {
    return this.state.currentStep < this.props.steps.length
  }

  handleButtonPress = onSave => {
    let imageValidity = this.checkImageUploadingState()

    if (!imageValidity) {
      Alert.alert(
        'Error',
        'One or more media failed or are still loading, please cancel or wait to proceed with submission',
        [{ text: 'Ok', onPress: () => null }],
        { cancelable: false }
      )
    } else {
      this.updateStepValidity(() => {
        if (this.getValidity() && imageValidity) {
          onSave()
        } else {
          Alert.alert(
            'Error Occurred',
            'You have one or more invalid fields, please recheck your entries.',
            [{ text: 'Ok', onPress: () => null }],
            { cancelable: false }
          )
          this.props.updateValueChange('fieldErrors', this.state.fieldErrors)
        }
      })
    }
  }

  renderCurrentStepFormFields = () => {
    let { currentStep } = this.state

    return this.getSteps(this.props.steps).map((step, i) => {
      return (
        <View key={i}>
          <View style={styles.stepHeader}>
            <View
              style={[
                styles.unactiveStep,
                i + 1 <= currentStep && styles.activeDoneStep
              ]}
            >
              {i + 1 < currentStep ? (
                <Icon
                  name="md-checkmark"
                  type="Ionicons"
                  style={styles.iconStepText}
                />
              ) : (
                <Text style={styles.numberedStepText}>{i + 1}</Text>
              )}
            </View>
            <Text style={styles.stepTitle}>{step.stepTitle}</Text>
          </View>
          <View style={styles.stepBody}>
            <View style={{ marginHorizontal: 25 }}>
              {step.stepHint && (
                <Text style={styles.stepHint}>{step.stepHint}</Text>
              )}
              {currentStep == i + 1 &&
                step.formFields.map(this.parseFormFields)}
              {currentStep == i + 1 && (
                <View style={styles.stepFooter}>
                  <ButtonAtom
                    btnText="Save"
                    hideIcon
                    faded={!this.getValidity() ? true : false}
                    onPress={() => this.handleButtonPress(step.onSave)}
                    type="secondary"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          scrollEventThrottle={400}
          contentContainerStyle={styles.scrollContainer}
        >
          <Text style={styles.headerText}>{this.props.title}</Text>
          <Form>{this.renderCurrentStepFormFields()}</Form>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    mediasFromStore: state.mediaUploads
  }
}

export default connect(mapStateToProps)(ProgressTracker)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContainer: {
    paddingHorizontal: 16
  },
  headerText: {
    alignSelf: 'flex-start',
    fontSize: 22,
    color: '#000',
    fontFamily: 'AvenirNext-DemiBold',
    marginBottom: 0,
    marginTop: 16
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  unactiveStep: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc'
  },
  activeDoneStep: {
    backgroundColor: color.button
  },
  numberedStepText: {
    color: '#fff',
    fontFamily: 'AvenirNext-Medium'
  },
  iconStepText: {
    color: '#fff',
    fontFamily: 'AvenirNext-Medium',
    fontSize: 16
  },
  stepTitle: {
    marginLeft: 15,
    color: '#333',
    fontSize: 16,
    fontFamily: 'AvenirNext-DemiBold'
  },
  stepHint: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'AvenirNext-Medium'
  },
  stepBody: {
    marginLeft: 25,
    marginVertical: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc'
  },
  stepFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  }
})
