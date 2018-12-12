import * as humps from 'humps'

export const parseFieldErrors = errors => {
  return errors.reduce((acc, error) => {
    const key = humps.camelize(error.key)
    return { ...acc, [key]: error.message }
  }, {})
}

export const capitalizeFirstLetter = (word: string): string => {
  const firstLetter = word ? word[0].toUpperCase() : ''
  return firstLetter
}

export const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.substr(1)
}

export const numberWithCommas = (num: number) => {
  const parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

// // Validates if text is greater than 6 characters
// const textValidator = text => {
//   return text.length > 6;
// };

// Email Validation
const emailValidator = email => {
  const emailPattern = /[^\s@]+@[^\s@.]+\.[^\s@]+/
  return emailPattern.test(email)
}

const failedValidation = val => {
  if (!val) {
    return 'Required field'
  } else {
    return false
  }
}

const validateInput = (key, object): any => {
  switch (key) {
    case 'fieldErrors':
    case 'currentForm':
      break
    case 'email':
      if (!emailValidator(object.email)) {
        return { [key]: 'Email format is wrong' }
      }
      break
    case 'passwordConfirmation':
      if (!(object.password === object.passwordConfirmation)) {
        return { [key]: 'Passwords dont match' }
      }
      break
    default:
      const validationMessage = failedValidation(object[key])
      if (validationMessage) {
        return { [key]: validationMessage }
      }
      break
  }
}

export const validateFormInputs = formInputs => {
  let fieldErrors = {}
  Object.keys(formInputs).map(key => {
    const error = validateInput(key, formInputs)
    fieldErrors = Object.assign(fieldErrors, error)
  })
  return fieldErrors
}

export const validateRegStep1FormInputs = formInputs => {
  let fieldErrors = {}
  const index = Object.keys(formInputs).findIndex(key => key === 'businessName')
  Object.keys(formInputs)
    .slice(0, index)
    .map(key => {
      const error = validateInput(key, formInputs)
      fieldErrors = Object.assign(fieldErrors, error)
    })
  return fieldErrors
}
