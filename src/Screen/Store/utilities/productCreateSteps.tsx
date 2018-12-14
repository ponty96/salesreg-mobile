import {
  SearchOptionsByNameGQL,
  SearchProductGroupsByTitleGQL,
  SearchCategoriesByTitleGQL
} from '../../../graphql/queries/store'
import { FormStep } from '../../../Container/Form/StepperContainer'

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
        searchQueryResponseKey: 'searchProductGroupsByTitle'
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
        multiline: true
      },
      validators: ['required'],
      name: 'sku'
    },
    {
      label: 'What is the minimum stock quantity',
      type: {
        type: 'input',
        multiline: true
      },
      validators: ['required'],
      name: 'minimumSku',
      underneathText: `The minimum stock quantity(MSQ) is the quantity of ${name} below which you have to restock.`
    },
    {
      label: 'Description',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'description'
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
        searchQuery: SearchCategoriesByTitleGQL,
        searchQueryResponseKey: 'searchCategoriesByTitle'
      },
      name: 'categories'
    },
    {
      label: `Is this a featured ${type}?`,
      type: {
        type: 'radio',
        options: ['yes', 'no']
      },
      name: 'isFeatured',
      underneathText: `Featured ${type}s are displayed on your webstores home page`
    },
    {
      label: `Is this a top rated ${type}?`,
      type: {
        type: 'radio',
        options: ['yes', 'no']
      },
      name: 'isTopRatedByMerchant',
      underneathText: `Lorem Ipsum`
    }
  ]
})

export const renderTagStep = (name, type): FormStep => ({
  stepTitle: `Add tags to ${name}`,
  stepHint: ` \nTags will enhance your filters and your customer abilities to find ${type}s within select tags`,
  formFields: [{ label: 'Tags', type: { type: 'tag-input' }, name: 'tags' }]
})

export const renderFeaturedImageStep = (name): FormStep => ({
  stepTitle: `Lets add images for ${name} starting from the landing images`,
  stepHint: `The landing images is what your customers see displayed on catalogue page of webstore. This is the image of this item that your customers will first see when they explore your catalogue. Click + to add from your device storage`,
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
  stepTitle: `Lets now add other media(videos or images) for ${name}`,
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
