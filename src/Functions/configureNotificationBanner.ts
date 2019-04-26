type ITypes =
  | 'AddContact'
  | 'UpdateContact'
  | 'DeleteContact'
  | 'AddProductVariant'
  | 'CreateProduct'
  | 'UpdateProductGroupOptions'
  | 'UpdateProduct'
  | 'UpsertProductRestock'
  | 'DeleteProduct'
  | 'CreateSaleOrder'
  | 'UpdateSaleOrder'
  | 'UpdateOrderStatus'
  | 'UpdateInvoiceDueDate'
  | 'MakeInvoicePayment'
  | 'CreateBankAccount'
  | 'UpdateBankAccount'
  | 'DeleteAccount'
  | 'CreateExpense'
  | 'UpdateExpense'
  | 'DeleteExpense'
  | 'UpdateProfile'
  | 'UpdateBusinessProfile'
  | 'CreateCategory'
  | 'UpdateCategory'
  | 'DeleteCategory'
  | 'CreateOption'
  | 'UpdateOption'
  | 'DeleteOption'
  | 'UpdateCoverPhoto'
  | 'UpdateLegalDocument'
  | 'DeleteLegalDocument'
  | 'CreateSpecialOffer'
  | 'UpdateSpecialOffer'
  | 'DeleteDeliveryFee'
  | 'CreateDeliveryFee'
  | 'TimeoutError'
  | 'DeleteSaleOrder'

const configureNotificationBanner = (type: ITypes, params?: any): any => {
  switch (type) {
    case 'TimeoutError':
      return {
        title: 'Network Error',
        subtitle: 'A timeout error occurred',
        style: 'danger'
      }
    case 'AddContact':
      return {
        title:
          params.type == 'customer' ? 'Created Customer' : 'Created Prospect',
        subtitle: `Created ${params.contact.contactName.trim()}'s information`
      }
    case 'UpdateContact':
      return {
        title:
          params.type == 'customer' ? 'Updated Customer' : 'Updated Prospect',
        subtitle: `Updated ${params.contact.contactName.trim()}'s information`
      }
    case 'DeleteContact':
      return {
        title: 'Contact Deleted',
        subtitle: `${params.contactName} was removed from contacts`
      }
    case 'AddProductVariant':
      return {
        title: 'Product Variant Added',
        subtitle: `A new variant was just added to ${params.productGroupTitle.trim()}`
      }
    case 'CreateProduct':
      return {
        title: 'Product Created',
        subtitle: `${params.productGroupTitle.trim()} was added to your product list`
      }
    case 'UpdateProductGroupOptions':
      return {
        title: 'Groups Options Updated',
        subtitle: `Group options added to ${params.name.trim()}`
      }
    case 'UpdateProduct':
      return {
        title: 'Product Updated',
        subtitle: `${params.name.trim()} was updated successfully`
      }
    case 'UpsertProductRestock':
      return {
        title: 'Products Restocked',
        subtitle: `Products were restocked successfully`
      }
    case 'DeleteProduct':
      return {
        title: 'Product Deleted',
        subtitle: `${
          params.productGroup &&
          params.productGroup.options &&
          params.productGroup.options.length > 1
            ? 'A variant of '
            : ''
        }${params.name.trim()} was removed`
      }
    case 'CreateSaleOrder':
      return {
        title: 'Sales Order Created',
        subtitle: `A new sales order was created successfully`
      }
    case 'UpdateSaleOrder':
      return {
        title: 'Sales Order Updated',
        subtitle: `Your sale order was just updated successfully`
      }
    case 'UpdateOrderStatus':
      return {
        title: 'Order Status Updated',
        subtitle: `${params.contactName
          .split(' ')[0]
          .trim()}'s order status has been updated`
      }
    case 'UpdateInvoiceDueDate':
      return {
        title: 'New Date Set for Invoice',
        subtitle: `A new date has been set for this invoice`
      }
    case 'MakeInvoicePayment':
      return {
        title: 'Payment Made',
        subtitle: `A sum of \u20A6${params} was just paid`
      }
    case 'CreateBankAccount':
      return {
        title: 'Bank Account Created',
        subtitle: `Account with number ${params.accountNumber} has been created`
      }
    case 'UpdateBankAccount':
      return {
        title: 'Bank Account Updated',
        subtitle: `Account with number ${params.accountNumber} has been updated`
      }
    case 'DeleteAccount':
      return {
        title: 'Bank Account Deleted',
        subtitle: `Account with number ${
          params.accountNumber
        } has been unlinked from account`
      }
    case 'CreateExpense':
      return {
        title: 'New Expense Created',
        subtitle: `Expense for ${params.title} has been created`
      }
    case 'UpdateExpense':
      return {
        title: 'Expense Updated',
        subtitle: `${params.title} has been updated`
      }
    case 'DeleteExpense':
      return {
        title: `Expense Deleted`,
        subtitle: `${params.title} has been removed from expenses`
      }
    case 'UpdateProfile':
      return {
        title: 'Profile Updated',
        subtitle: 'Your profile has been updated'
      }
    case 'UpdateBusinessProfile':
      return {
        title: 'Business Profile Updated',
        subtitle: 'Your business profile has been updated'
      }
    case 'CreateCategory':
      return {
        title: 'Category Created',
        subtitle: `${params.title} added to categories`
      }
    case 'CreateDeliveryFee':
      return {
        title: 'Delivery Fee Created',
        subtitle: `A delivery fee was added for ${params.region} in ${
          params.state
        } state`
      }
    case 'UpdateCategory':
      return {
        title: 'Category Updated',
        subtitle: `${params.title} was updated`
      }
    case 'DeleteCategory':
      return {
        title: 'Category Removed',
        subtitle: `${params} was removed from categories`
      }
    case 'DeleteDeliveryFee':
      return {
        title: 'Delivery Fee Deleted',
        subtitle: `${params} was removed from delivery fees`
      }
    case 'CreateOption':
      return {
        title: 'Option Created',
        subtitle: `${params.name} added to options`
      }
    case 'UpdateOption':
      return {
        title: 'Option Updated',
        subtitle: `${params.name} was updated`
      }
    case 'DeleteOption':
      return {
        title: 'Option Deleted',
        subtitle: `${params} was removed from options`
      }
    case 'UpdateCoverPhoto':
      return {
        title: 'Cover Photo Updated',
        subtitle: 'Cover photo added to your webstore'
      }
    case 'UpdateLegalDocument':
      return {
        title: `${params.name.trim()} Updated`,
        subtitle: `${params.name.trim()} has been added`
      }
    case 'DeleteLegalDocument':
      return {
        title: `Legal Document Deleted`,
        subtitle: `Your ${params.name} ${
          params.type == 'policy' ? 'policy' : ''
        } has been removed`
      }
    case 'CreateSpecialOffer':
      return {
        title: `Special Offer Created`,
        subtitle: `${params.title} has been added from your offers`
      }
    case 'UpdateSpecialOffer':
      return {
        title: `Special Offer Updated`,
        subtitle: `${params.title} has been updated`
      }
    case 'DeleteSaleOrder':
      return {
        title: `Sale Order Deleted`,
        subtitle: `Your sale order has been removed`
      }
  }
}

export default configureNotificationBanner
