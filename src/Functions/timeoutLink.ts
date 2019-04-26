import { ApolloLink, Observable, Operation, NextLink } from 'apollo-link'
import { DefinitionNode } from 'graphql'
import { NotificationBanner } from '../Components/NotificationBanner'
import configureNotificationBanner from './configureNotificationBanner'

const DEFAULT_TIMEOUT: number = 15000

/**
 * Aborts the request if the timeout expires before the response is received.
 */
export default class TimeoutLink extends ApolloLink {
  private timeout: number

  constructor(timeout: number) {
    super()
    this.timeout = timeout || DEFAULT_TIMEOUT
  }

  public request(operation: Operation, forward: NextLink) {
    let controller: AbortController
    let ctxTimeout: number

    // override timeout from query context
    ctxTimeout = operation.getContext().timeout || null
    if (ctxTimeout <= 0) {
      ctxTimeout = null
    }

    // add abort controller and signal object to fetchOptions if they don't already exist
    if (typeof AbortController !== 'undefined') {
      const context = operation.getContext()
      let fetchOptions = context.fetchOptions || {}

      controller = fetchOptions.controller || new AbortController()

      fetchOptions = { ...fetchOptions, controller, signal: controller.signal }
      operation.setContext({ fetchOptions })
    }

    const chainObservable = forward(operation) // observable for remaining link chain

    const operationType = (operation.query.definitions as any).find(
      (def: DefinitionNode) => def.kind === 'OperationDefinition'
    ).operation

    if (this.timeout <= 0 || operationType === 'subscription') {
      return chainObservable // skip this link if timeout is zero or it's a subscription request
    }

    // create local observable with timeout functionality (unsubscibe from chain observable and
    // return an error if the timeout expires before chain observable resolves)
    const localObservable = new Observable(observer => {
      let timer: NodeJS.Timer | any

      // listen to chainObservable for result and pass to localObservable if received before timeout
      const subscription = chainObservable.subscribe(
        result => {
          clearTimeout(timer)
          observer.next(result)
          observer.complete()
        },
        error => {
          clearTimeout(timer)
          observer.error(error)
          observer.complete()
        }
      )

      let ctxRef = operation.getContext().timeoutRef,
        onTimeOutCallback = operation.getContext().onTimeOut

      // if timeout expires before observable completes, abort call, unsubscribe, and return error
      timer = setTimeout(() => {
        if (controller) {
          controller.abort() // abort fetch operation
        }

        observer.error(new Error('Timeout exceeded'))
        if (operationType == 'mutation') {
          let banner = NotificationBanner({
            ...configureNotificationBanner('TimeoutError')
          })
          banner.show({ bannerPosition: 'bottom' })
        }

        onTimeOutCallback && onTimeOutCallback()
        subscription.unsubscribe()
      }, ctxTimeout || this.timeout)

      if (ctxRef) {
        ctxRef({
          unsubscribe: () => {
            clearTimeout(timer)
            subscription.unsubscribe()
          }
        })
      }

      // this function is called when a client unsubscribes from localObservable
      return () => {
        clearTimeout(timer)
        subscription.unsubscribe()
      }
    })

    return localObservable
  }
}
