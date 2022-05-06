function deepClone(aObject) {
  if (!aObject) {
    return aObject
  }

  let bObject = {}

  for (var key in aObject) {
    let _value = aObject[key]
    bObject[key] = typeof _value == 'object' ? deepClone(_value) : _value
  }

  return bObject
}

class ObservableStore {
  private state: any
  private callbacks: any = []

  constructor(state?: any) {
    this.state = state || {}
  }

  listen = callback => {
    this.callbacks.push(callback)
    return () => {
      this.callbacks.splice(this.callbacks.indexOf(callback), 1)
      callback = null
    }
  }

  dispatch = (action, args) => {
    this.state = {
      ...this.state,
      [action]: args
    }
    this.runCallbacks()
  }

  runCallbacks = () => {
    this.callbacks.forEach(callback => {
      callback()
    })
  }

  getState = () => {
    return deepClone(this.state)
  }
}

export default ObservableStore
