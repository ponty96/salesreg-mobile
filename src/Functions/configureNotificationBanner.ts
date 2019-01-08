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
  | 'UpsertSalesOrder'
  | 'UpdateOrderStatus'
  | 'UpdateInvoiceDueDate'
  | 'MakeInvoicePayment'
  | 'CreateBankAccount'
  | 'UpdateBankAccount'
  | 'DeleteAccount'
  | 'CreateExpense'
  | 'UpdateExpense'
  | 'DeleteExpense' | "UpdateProfile"

const configureNotificationBanner = (type: ITypes, params?: any): object => {
  switch (type) {
    case 'AddContact':
      return {
        title: 'Created Customer',
        subtitle: `Created ${params.contactName.trim()}'s information`
      }
    case 'UpdateContact':
      return {
        title: 'Updated Customer',
        subtitle: `Updated ${params.contactName.trim()}'s information`
      }
    case 'DeleteContact':
      return {
        title: 'Contact Deleted',
        subtitle: `${params.contactName} was removed from contacts`
      }
    case 'AddProductVariant':
      return {
        title: 'Product Variant Added',
        subtitle: `A new variant was just added to ${params.name.trim()}`
      }
    case 'CreateProduct':
      return {
        title: 'Product Created',
        subtitle: `${params.name.trim()} was added to your product list`
      }
    case 'UpdateProductGroupOptions':
      return {
        title: 'Groups Options Updated',
        subtitle: `Group options added to ${params.name.trim()}`
      }
    case 'UpdateProduct':
      return {
        title: 'Groups Options Updated',
        subtitle: `Group options added to ${params.name.trim()}`
      }
    case 'UpsertProductRestock':
      return {
        title: 'Products Restocked',
        subtitle: `Products were restocked successfully`
      }
    case 'DeleteProduct':
      return {
        title: 'Product Deleted',
        subtitle: `A variant of ${params.name.trim()} was removed`
      }
    case 'UpsertSalesOrder':
      return {
        title: 'Sales Order Created',
        subtitle: `A new sales order was created successfully`
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
        subtitle: `A sum of ${params} was just paid`
      }
    case 'CreateBankAccount':
      return {
        title: 'Bank Account Created',
        subtitle: `An account has been created for ${params.bankName}`
      }
    case 'UpdateBankAccount':
      return {
        title: 'Bank Account Updated',
        subtitle: `${params.bankName} has been updated`
      }
    case 'DeleteAccount':
      return {
        title: 'Bank Account Deleted',
        subtitle: `${params.bankName} has been unlinked from account`
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
        subtitle: `${params.title} was just updated`
      }
      case "UpdateProfile":
      return {
        title: "Profile Updated",
        subtitle: "Your profile has been updated"
      }
  }
}

export default configureNotificationBanner
