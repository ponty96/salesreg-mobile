import { combineReducers } from 'redux'

import * as cron from './cron'

export const appReducers = combineReducers({
  ...cron
})
