import countries from './countries'

export const Countries = Object.keys(countries).map(key => {
  const country = countries[key]
  return {
    icon: country.flag,
    mainLabel: country.name.common,
    value: key,
    subLabel: `+ ${country.callingCode || ''}`
  }
})

export const Currencies = Object.keys(countries).map(key => {
  const country = countries[key]
  return {
    icon: country.flag,
    mainLabel: country.name.common,
    value: country.currency || key,
    subLabel: country.currency || ''
  }
})
