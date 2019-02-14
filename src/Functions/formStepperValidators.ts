export const validateStep = (currentStepForm, formData, prevErrorState) => {
  let stepValidity = {},
    errors = { ...prevErrorState }

  currentStepForm.formFields.forEach(field => {
    if (field && field.validators) {
      let { validity, error } = validateField(
        field.validators,
        field.name,
        formData[field.name] || field.value,
        stepValidity,
        errors,
        true,
        field.passwordFieldValue
      )

      stepValidity = validity
      errors = error
    }
  })

  return { stepValidity, errors }
}

export const validateField = (
  validators,
  name,
  value,
  preValidityState,
  prevErrorState,
  persistPreviousErrors?: boolean,
  passwordFieldValue?: any
) => {
  let isValid = true,
    error = ''

  validators.forEach(validator => {
    let _value = typeof value == 'string' ? value.trim() : value

    if (validator == 'required') {
      let required = isRequired(_value)
      isValid = required.fieldValid == false ? required.fieldValid : isValid
      error = required.fieldValid == false ? required.errorMessage : error
    }

    if (validator == 'social-media-username') {
      let usernameValidation = validateSocialMediaUsername(_value || '')
      isValid =
        usernameValidation.fieldValid == false
          ? usernameValidation.fieldValid
          : isValid
      error =
        usernameValidation.fieldValid == false
          ? usernameValidation.errorMessage
          : error
    }

    if (validator == 'email') {
      let emailValidation = validateEmail(_value)
      isValid =
        emailValidation.fieldValid == false
          ? emailValidation.fieldValid
          : isValid
      error =
        emailValidation.fieldValid == false
          ? emailValidation.errorMessage
          : error
    }

    if (validator == 'phone') {
      let phoneValidation = validatePhone(_value)
      isValid =
        phoneValidation.fieldValid == false
          ? phoneValidation.fieldValid
          : isValid
      error =
        phoneValidation.fieldValid == false
          ? phoneValidation.errorMessage
          : error
    }

    if (validator == 'credit-card') {
      let creditCardValidation = validateCreditCard(_value)
      isValid =
        creditCardValidation.fieldValid == false
          ? creditCardValidation.fieldValid
          : isValid
      error =
        creditCardValidation.fieldValid == false
          ? creditCardValidation.errorMessage
          : error
    }

    if (validator == 'sales-order') {
      let salesOrderValiation = validateSalesOrder(_value)
      isValid =
        salesOrderValiation.fieldValid == false
          ? salesOrderValiation.fieldValid
          : isValid
      error =
        salesOrderValiation.fieldValid == false
          ? salesOrderValiation.errorMessage
          : error
    }

    if (validator == 'expense-item') {
      let expenseValiation = validateExpenseItem(_value)
      isValid =
        expenseValiation.fieldValid == false
          ? expenseValiation.fieldValid
          : isValid
      error =
        expenseValiation.fieldValid == false
          ? expenseValiation.errorMessage
          : error
    }

    if (validator == 'password') {
      let passwordValiation = validatePassword(_value)
      isValid =
        passwordValiation.fieldValid == false
          ? passwordValiation.fieldValid
          : isValid
      error =
        passwordValiation.fieldValid == false
          ? passwordValiation.errorMessage
          : error
    }

    if (validator == 'alpha-numerics') {
      let alphaNumericsValiation = validateAlphaNumerics(_value)
      isValid =
        alphaNumericsValiation.fieldValid == false
          ? alphaNumericsValiation.fieldValid
          : isValid
      error =
        alphaNumericsValiation.fieldValid == false
          ? alphaNumericsValiation.errorMessage
          : error
    }

    if (validator == 'confirm-password') {
      let passwordConfirmValidation = validateConfirmPassword(
        _value,
        passwordFieldValue
      )
      isValid =
        passwordConfirmValidation.fieldValid == false
          ? passwordConfirmValidation.fieldValid
          : isValid
      error =
        passwordConfirmValidation.fieldValid == false
          ? passwordConfirmValidation.errorMessage
          : error
    }
  })

  let params = { ...prevErrorState }
  if (error.length == 0 && !persistPreviousErrors) delete params[name]

  return {
    validity: { ...preValidityState, [name]: isValid },
    error: !error ? params : { ...params, [name]: error }
  }
}

function isRequired(_value) {
  let fieldValid = true,
    errorMessage = ''

  if (typeof _value == 'string') {
    _value.length == 0
      ? ((fieldValid = false), (errorMessage = 'This field is required'))
      : (fieldValid = true)
  } else if (typeof _value == 'object') {
    if (_value && 'id' in _value) {
      _value.id.length > 0
        ? (fieldValid = true)
        : ((fieldValid = false), (errorMessage = 'This field is required'))
    } else if (_value && Object.keys(_value).length > 0) {
      fieldValid = true
    } else {
      fieldValid = false
      errorMessage = 'This field is required'
    }
  } else if (typeof _value == 'number' && _value == 0) {
    fieldValid = false
    errorMessage = 'Field cannot be 0'
  } else if (typeof _value == 'undefined') {
    fieldValid = false
    errorMessage = 'Field not set'
  }

  return { fieldValid, errorMessage }
}

function validateSocialMediaUsername(_value) {
  let fieldValid = true,
    errorMessage = '',
    domainPattern = /^(?:https?:\/\/)?\w+(?:\.\w+)?(?:\.[A-Z]{2,3})+$/gi

  if (_value[0] == '@' && _value.length > 0) {
    fieldValid = false
    errorMessage = 'Username should be entered without the @ symbol.'
  } else if (domainPattern.test(_value.trim()) && _value.length > 0) {
    fieldValid = false
    errorMessage =
      'Invalid username format. Enter username in the form e.g username'
  } else if (/\./gi.test(_value) && _value.length > 0) {
    fieldValid = false
    errorMessage =
      'Invalid username format. Username contains 1 or more invalid character. Enter username in the form e.g username'
  }

  return { fieldValid, errorMessage }
}

function validatePassword(_value) {
  let fieldValid = true,
    errorMessage = ''
  if (_value && _value.length < 8) {
    fieldValid = false
    errorMessage = 'The password cannot be less than 8 characters'
  } else if (!_value) {
    fieldValid = false
    errorMessage = 'The password cannot be less than 8 characters'
  }

  return { fieldValid, errorMessage }
}

function validateAlphaNumerics(_value) {
  let fieldValid = true,
    errorMessage = ''

  if (!/^[a-zA-Z\d][a-zA-Z\d-_]+[a-zA-Z\d]$/gi.test(_value)) {
    fieldValid = false
    errorMessage =
      'Slug can only start with alphabets and contain alphabets and/or numbers in between with a minimum of 3 characters'
  }

  return { fieldValid, errorMessage }
}

function validateConfirmPassword(_value, passwordFieldValue) {
  let fieldValid = true,
    errorMessage = ''
  if (
    _value &&
    passwordFieldValue &&
    _value.trim() !== passwordFieldValue.trim()
  ) {
    fieldValid = false
    errorMessage = 'The passwords do not match'
  } else if (!_value) {
    fieldValid = false
    errorMessage = 'The passwords do not match'
  }

  return { fieldValid, errorMessage }
}

function validateEmail(_value) {
  let fieldValid = true,
    errorMessage = ''
  if (!/^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(_value)) {
    fieldValid = false
    errorMessage = 'Wrong email address supplied, enter the correct email'
  }
  return { fieldValid, errorMessage }
}

function validatePhone(_value) {
  let fieldValid = true,
    errorMessage = ''
  if (!/\+?[0-9]{10,}$/.test(_value)) {
    fieldValid = false
    errorMessage = 'The phone input field is wrong'
  }
  return { fieldValid, errorMessage }
}

function validateCreditCard(_value) {
  let fieldValid = true,
    errorMessage = ''
  if (_value) {
    let { valid } = _value
    if (!valid) {
      fieldValid = false
      errorMessage = 'The credit card info is not correct'
    }
  }
  return { fieldValid, errorMessage }
}

function validateExpenseItem(_value) {
  let fieldValid = true,
    errorMessage = ''

  if (_value.length > 0) {
    fieldValid = true
    _value.forEach(val => {
      if (val.itemName.trim().length == 0) {
        fieldValid = false
        errorMessage =
          'The name or quantity in one of the items cannot be empty'
      } else {
        fieldValid = true
      }
    })
  }

  return { fieldValid, errorMessage }
}

function validateSalesOrder(_value) {
  let fieldValid = true,
    errorMessage = ''

  if (_value.length > 0) {
    fieldValid = true
    _value.forEach(val => {
      if (val.name.trim().length == 0 || Number(val.quantity) == 0) {
        fieldValid = false
        errorMessage =
          'The name or quantity in one of the items cannot be empty'
      } else {
        fieldValid = true
      }
    })
  } else {
    fieldValid = false
    errorMessage = 'The items list cannot be empty'
  }

  return { fieldValid, errorMessage }
}
