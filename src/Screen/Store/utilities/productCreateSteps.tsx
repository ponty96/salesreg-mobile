import React from 'react'

import { RegularText } from '../../../Atom/TextAtom'
import {
  SearchOptionsByNameGQL,
  SearchProductGroupsByTitleGQL,
  SearchCategoriesByTitleGQL
} from '../../../graphql/queries/store'
import { FormStep } from '../../../Container/Form/StepperContainer'
import { color } from '../../../Style/Color'

interface OptionValue {
  optionId: string
  name: string
  optionName: string
}

export const renderSelectProductGroupFormStep = (): FormStep => ({
  stepTitle: 'Choose from list of existing products?',
  formFields: [
    {
      label: 'Choose product',
      placeholder: '',
      name: 'productGroup',
      type: {
        type: 'search-picker',
        searchQuery: SearchProductGroupsByTitleGQL,
        searchQueryResponseKey: 'searchProductGroupsByTitle',
        emptySection: {
          emptyText:
            'You currently do not have any existing products, please create a new product'
        }
      },
      validators: ['required']
    }
  ]
})

export const renderSelectOptionsFormStep = (name): FormStep => ({
  stepTitle: `Select the variant options for ${name}`,
  stepHint: `Variant options are what makes one ${name} different from another ${name}. E.g. color, sizes`,
  formFields: [
    {
      label: 'Select options',
      type: {
        type: 'search-multi-picker',
        emptySection: {
          emptyText: (
            <RegularText>
              If you do not find the options you want, you may skip this field
              for now, and complete this form, then go to menu, and select{' '}
              <RegularText style={{ color: color.button }}>
                "settings > variant options"
              </RegularText>{' '}
              to create new options, then complete this field by editing this
              product's details.
            </RegularText>
          )
        },
        searchQuery: SearchOptionsByNameGQL,
        searchQueryResponseKey: 'searchOptionsByName'
      },
      validators: ['required'],
      name: 'optionValues'
    }
  ]
})

export const renderProductDescriptionStep = (name): FormStep => ({
  stepTitle: `${name} details`,
  formFields: [
    {
      label: 'How much do you sell each?',
      type: {
        type: 'input',
        keyboardType: 'numeric'
      },
      validators: ['required'],
      name: 'price'
    },
    {
      label: 'What is the current quantity in Stock',
      type: {
        type: 'input',
        keyboardType: 'numeric'
      },
      validators: ['required'],
      name: 'sku'
    },
    {
      label: 'What is the minimum stock quantity',
      type: {
        type: 'input',
        keyboardType: 'numeric'
      },
      validators: ['required'],
      name: 'minimumSku',
      underneathText: `The minimum stock quantity(MSQ) is the quantity of ${name} below which you have to restock. On your inventory list, ${name} will be coloured in red when the stock quantity reaches MSQ.`
    },
    {
      label: 'Description',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'description',
      underneathText:
        'This description will be used on your webstore to give your customers a quick overview of the variant of this product'
    }
  ]
})

const getProductName = name => {
  let label = name.substr(0, 27)
  if (name.length >= 27) {
    label = `${label}...`
  }
  return label
}
export const renderOptionValuesInputStep = (
  optionValues: OptionValue[],
  name
) => ({
  stepTitle: `Enter variant values for ${name}`,
  formFields: optionValues.map(optionValue => ({
    label: `${getProductName(name)} ${optionValue.optionName}`,
    type: {
      type: 'input',
      keyboardType: 'default'
    },
    validators: ['required'],
    name: `option-${optionValue.optionId}`,
    value: optionValue.name
  }))
})

export const renderCategoryStep = (type): FormStep => ({
  stepTitle: `Categorize this ${type}`,
  formFields: [
    {
      label: 'Categories',
      type: {
        type: 'search-multi-picker',
        emptySection: {
          emptyText: (
            <RegularText>
              If you do not find the categories you want, you may skip this
              field for now, and complete this form, then go to menu, and select{' '}
              <RegularText style={{ color: color.button }}>
                "settings > categories"
              </RegularText>{' '}
              to create new categories, then complete this field by editing this
              product's details.
            </RegularText>
          )
        },
        searchQuery: SearchCategoriesByTitleGQL,
        searchQueryResponseKey: 'searchCategoriesByTitle'
      },
      name: 'categories',
      placeholder: 'Search Categories'
    },
    {
      label: `Is this a featured ${type}?`,
      type: {
        type: 'radio',
        options: ['Yes', 'No']
      },
      name: 'isFeatured',
      underneathText: `Featured ${type}s are displayed on the homepage of your webstore.`
    },
    {
      label: `Is this ${type} top rated?`,
      type: {
        type: 'radio',
        options: ['Yes', 'No']
      },
      name: 'isTopRatedByMerchant'
    }
  ]
})

export const renderTagStep = (name, type): FormStep => ({
  stepTitle: `Add tags to ${name}`,
  stepHint: ` \nTags will enhance your customers's abilities to find this ${type} on social media under selected hashtags.`,
  formFields: [
    {
      label: 'Tags',
      type: { type: 'tag-input' },
      name: 'tags',
      underneathText: 'Tap enter to add tags'
    }
  ]
})

export const renderFeaturedImageStep = (name): FormStep => ({
  stepTitle: `Let's add images for ${name} starting from the landing images`,
  stepHint: `The landing images are what your customers see displayed on catalogue page of webstore. This is the image of this item that your customers will first see when they explore your catalogue.`,
  formFields: [
    {
      label: '',
      validators: ['required'],
      name: 'featuredImage',
      type: {
        type: 'image-upload'
      }
    }
  ]
})

export const renderMediaStep = (name): FormStep => ({
  stepTitle: `Let's now add other media(videos or images) for ${name}`,
  stepHint: `Media will be displayed on the details section of your webstore. Customers can view multiple media of ${name}`,
  formFields: [
    {
      label: '',
      name: 'images',
      type: {
        type: 'multi-media-upload'
      }
    }
  ],
  buttonTitle: 'Done'
})
