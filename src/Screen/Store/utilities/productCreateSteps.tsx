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
      }
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
      name: 'price'
    },
    {
      label: 'What is the current quantity in Stock',
      type: {
        type: 'input',
        multiline: true
      },
      name: 'sku'
    },
    {
      label: 'What is the minimum stock quantity',
      type: {
        type: 'input',
        multiline: true
      },
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

export const renderOptionValuesInputStep = (
  optionValues: OptionValue[],
  name
) => ({
  stepTitle: `Enter variant values for ${name}`,
  formFields: optionValues.map(optionValue => ({
    label: `${name} ${optionValue.optionName}`,
    type: {
      type: 'input',
      keyboardType: 'default'
    },
    name: `option-${optionValue.optionId}`,
    value: optionValue.name
  }))
})

export const renderCategoryStep = () => ({
  stepTitle: 'Categorize this product',
  formFields: [
    {
      label: 'Categories',
      type: {
        type: 'search-multi-picker',
        searchQuery: SearchCategoriesByTitleGQL,
        searchQueryResponseKey: 'searchCategoriesByTitle'
      },
      name: 'categories'
    }
  ]
})

export const renderTagStep = name => ({
  stepTitle: `Add tags to ${name}`,
  stepHint:
    ' \nTags will enhance your filters and your customer abilities to find services within select tags',
  formFields: [{ label: 'Tags', type: { type: 'tag-input' }, name: 'tags' }]
})

export const renderFeaturedImageStep = name => ({
  stepTitle: `Lets add images for ${name} starting from the landing images`,
  stepHint: `The landing images is what your customers see displayed on catalogue page of webstore. This is the image of this service that your customers will first see when they explore your catalogue. Click + to add from your device storage`,
  formFields: [
    {
      label: '',
      name: 'featuredImage',
      type: {
        type: 'image-upload'
      }
    }
  ]
})

export const renderImagesStep = name => ({
  stepTitle: `Lets now add other images for ${name}`,
  stepHint: `Images will be displayed on the details section of your webstore. Customers can view multiple images of ${name}`,
  formFields: [
    {
      label: '',
      name: 'images',
      type: {
        type: 'image-upload'
      }
    }
  ],
  buttonTitle: 'Done'
})
