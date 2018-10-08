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

export const PaymentMethod = [
  {
    icon: 'url here',
    mainLabel: 'CASH',
    value: 'CASH'
  },
  {
    icon: 'url here',
    mainLabel: 'CHEQUE',
    value: 'CHEQUE'
  },
  {
    icon: 'url here',
    mainLabel: 'DIRECT_TRANSFER',
    value: 'DIRECT_TRANSFER'
  },
  {
    icon: 'url here',
    mainLabel: 'POS',
    value: 'POS'
  }
]
