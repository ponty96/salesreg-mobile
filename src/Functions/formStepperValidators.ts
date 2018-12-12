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
        errors
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
  prevErrorState
) => {
  let isValid = true,
    error = ''

  validators.forEach(validator => {
    let _value = typeof value == 'string' ? value.trim() : value
    if (validator == 'required') {
      if (typeof _value == 'string') {
        _value.length == 0
          ? ((isValid = false), (error = 'This field is required'))
          : (isValid = true)
      } else if (typeof _value == 'object') {
        _value && _value.id && _value.id.length > 0
          ? (isValid = true)
          : ((isValid = false), (error = 'This field is required'))
      }
    }
    if (validator == 'email') {
      if (!/^[^\s@]+@[^\s@.]+\.[^\s@]+$/.test(_value)) {
        isValid = false
        error = 'Wrong email address supplied, enter the correct email'
      } else {
        isValid = true
      }
    }
    if (validator == 'phone') {
      if (!/\+?[0-9]{11,}$/.test(_value)) {
        isValid = false
        error = 'The phone input field is wrong'
      } else {
        isValid = true
      }
    }
    if (validator == 'credit-card') {
      if (_value) {
        let { valid } = _value
        if (!valid) {
          isValid = false
          error = 'The credit card info is not correct'
        } else {
          isValid = true
        }
      }
    }
    if (validator == 'sales-order') {
      if (_value.length > 0) {
        isValid = true
        _value.forEach(val => {
          if (val.name.trim().length == 0 || Number(val.quantity) == 0) {
            isValid = false
            error =
              'The name or quantity in one of the sales order cannot be empty'
          } else {
            isValid = true
          }
        })
      } else {
        isValid = false
        error = 'The sales order cannot be empty'
      }
    }
  })

  let params = { ...prevErrorState }
  if (error.length == 0) delete params[name]

  return {
    validity: { ...preValidityState, [name]: isValid },
    error: !error ? params : { ...params, [name]: error }
  }
}
