export const validateStep = (currentStepForm, formData, prevErrorState) => {
  let stepValidity = {},
    errors = { ...prevErrorState }

  currentStepForm.formFields.forEach(field => {
    if (field && field.validators) {
      let { validity, error } = validateField(
        field.validators,
        field.name,
        formData[field.name],
        stepValidity,
        errors,
        true
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
  persistPreviousErrors?: boolean
) => {
  let isValid = true,
    error = ''

  validators.forEach(validator => {
    let _value = typeof value == 'string' ? value.trim() : value

    if (validator == 'required') {
      let required = isRequired(_value)
      isValid = required.fieldValid
      error = required.errorMessage
    }

    if (validator == 'email') {
      let emailValidation = validateEmail(_value)
      isValid = emailValidation.fieldValid
      error = emailValidation.errorMessage
    }

    if (validator == 'phone') {
      let phoneValidation = validatePhone(_value)
      isValid = phoneValidation.fieldValid
      error = phoneValidation.errorMessage
    }

    if (validator == 'credit-card') {
      let creditCardValidation = validateCreditCard(_value)
      isValid = creditCardValidation.fieldValid
      error = creditCardValidation.errorMessage
    }

    if (validator == 'sales-order') {
      let salesOrderValiation = validateSalesOrder(_value)
      isValid = salesOrderValiation.fieldValid
      error = salesOrderValiation.errorMessage
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
    _value && _value.id && _value.id.length > 0
      ? (fieldValid = true)
      : ((fieldValid = false), (errorMessage = 'This field is required'))
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
  if (!/\+?[0-9]{11,}$/.test(_value)) {
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

function validateSalesOrder(_value) {
  let fieldValid = true,
    errorMessage = ''

  if (_value.length > 0) {
    fieldValid = true
    _value.forEach(val => {
      if (val.name.trim().length == 0 || Number(val.quantity) == 0) {
        fieldValid = false
        errorMessage =
          'The name or quantity in one of the sales order cannot be empty'
      } else {
        fieldValid = true
      }
    })
  } else {
    fieldValid = false
    errorMessage = 'The sales order cannot be empty'
  }

  return { fieldValid, errorMessage }
}
