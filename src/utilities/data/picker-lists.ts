import countries from './countries'
import states from './states'

export const Countries = Object.keys(countries).map(key => {
  const country = countries[key]
  return {
    icon: country.flag,
    mainLabel: country.name.common,
    value: key,
    subLabel: `+ ${country.callingCode || ''}`
  }
})

export const States = states.map(state => ({
  mainLabel: state,
  value: state
}))

export const Currencies = Object.keys(countries).map(key => {
  const country = countries[key]
  return {
    icon: country.flag,
    mainLabel: country.currency || key,
    value: country.currency || key,
    // subLabel: country.currency || '',
    countryKey: key
  }
})

export const geCurrencyFromCountry = country => {
  const currency = Currencies.find(currency => currency.countryKey == country)
  return currency ? currency.value : ''
}

export const PaymentMethod = [
  {
    icon: 'url here',
    mainLabel: 'CASH',
    value: 'CASH'
  },
  {
    icon: 'url here',
    mainLabel: 'CARD',
    value: 'CARD'
  }
]

export const LegalDocuments = [
  {
    mainLabel: 'Policy',
    value: 'policy'
  },
  {
    mainLabel: 'Terms',
    value: 'terms'
  }
  // {
  //   mainLabel: 'Information',
  //   value: 'information'
  // }
]

export const PolicyDocuments = [
  {
    mainLabel: 'Delivery Policy',
    value: 'Delivery'
  },
  {
    mainLabel: 'Refund Policy',
    value: 'Refund'
  },
  {
    mainLabel: 'Privacy Policy',
    value: 'Privacy'
  }
]

export const TermsDocuments = [
  {
    mainLabel: 'Terms and Condition',
    value: 'Terms and Condition'
  }
]

export const NG_Banks = [
  {
    value: '044',
    mainLabel: 'ACCESS BANK NIGERIA'
  },
  {
    value: '323',
    mainLabel: 'ACCESS MOBILE'
  },
  {
    value: '014',
    mainLabel: 'AFRIBANK NIGERIA PLC'
  },
  {
    value: '401',
    mainLabel: 'Aso Savings and Loans'
  },
  {
    value: '559',
    mainLabel: 'Coronation Merchant Bank'
  },
  {
    value: '063',
    mainLabel: 'DIAMOND BANK PLC'
  },
  {
    value: '307',
    mainLabel: 'Ecobank Mobile'
  },
  {
    value: '050',
    mainLabel: 'ECOBANK NIGERIA LIMITED'
  },
  {
    value: '084',
    mainLabel: 'ENTERPRISE BANK LIMITED'
  },
  {
    value: '309',
    mainLabel: 'FBN MOBILE'
  },
  {
    value: '070',
    mainLabel: 'FIDELITY BANK PLC'
  },
  {
    value: '011',
    mainLabel: 'FIRST BANK PLC'
  },
  {
    value: '214',
    mainLabel: 'FIRST CITY MONUMENT BANK PLC'
  },
  {
    value: '315',
    mainLabel: 'GTBank Mobile Money'
  },
  {
    value: '058',
    mainLabel: 'GTBANK PLC'
  },
  {
    value: '030',
    mainLabel: 'HERITAGE BANK'
  },
  {
    value: '082',
    mainLabel: 'KEYSTONE BANK PLC'
  },
  {
    value: '311',
    mainLabel: 'Parkway'
  },
  {
    value: '526',
    mainLabel: 'PARRALEX BANK'
  },
  {
    value: '305',
    mainLabel: 'PAYCOM'
  },
  {
    value: '101',
    mainLabel: 'Providus Bank'
  },
  {
    value: '076',
    mainLabel: 'SKYE BANK PLC'
  },
  {
    value: '221',
    mainLabel: 'STANBIC IBTC BANK PLC'
  },
  {
    value: '304',
    mainLabel: 'Stanbic Mobile'
  },
  {
    value: '068',
    mainLabel: 'STANDARD CHARTERED BANK NIGERIA LIMITED'
  },
  {
    value: '232',
    mainLabel: 'STERLING BANK PLC'
  },
  {
    value: '032',
    mainLabel: 'UNION BANK OF NIGERIA PLC'
  },
  {
    value: '033',
    mainLabel: 'UNITED BANK FOR AFRICA PLC'
  },
  {
    value: '215',
    mainLabel: 'UNITY BANK PLC'
  },
  {
    value: '035',
    mainLabel: 'WEMA BANK PLC'
  },
  {
    value: '057',
    mainLabel: 'ZENITH BANK PLC'
  },
  {
    value: '322',
    mainLabel: 'ZENITH Mobile'
  }
]

export const getBankName = code => {
  const bank = NG_Banks.find(bank => bank.value == code)
  return bank.mainLabel
}
