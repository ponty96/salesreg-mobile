import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AsyncStorage } from 'react-native'
import { ApolloLink, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
// import { createHttpLink } from 'apollo-link-http';
import { hasSubscription } from '@jumpn/utils-graphql'
import absintheSocketLink from './absinthe-socket-link'
import ApolloLinkTimeout from '../Functions/timeoutLink'
import { setContext } from 'apollo-link-context'
import Auth from '../services/auth'
import { authenticate } from '../graphql/resolvers/auth'
import { onError } from 'apollo-link-error'
// import refreshOrLogout from '../services/refreshOrLogout';
import { createUploadLink } from '@richeterre/apollo-upload-client'
import { CachePersistor } from 'apollo-cache-persist'
import Config from 'react-native-config'
import ObservableStore from '../Functions/ObservableStore'

// const GRAPHQL_API_ENDPOINT = 'http://16e11967.ngrok.iom /api'
const GRAPHQL_API_ENDPOINT = Config.BASE_URL
const cache = new InMemoryCache()

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  debug: true
})

const authLink = setContext(async (_: any, { headers }: any) => {
  const token = await Auth.getToken()
  const user: any = JSON.parse(await Auth.getCurrentUser())

  return {
    headers: {
      ...headers,
      userId: user ? user.id : '',
      companyId: user && user.company ? user.company.id : '',
      authorization: token ? `${token}` : ''
    }
  }
})

const stateLink = withClientState({ ...authenticate, cache })

const link = split(
  operation => hasSubscription(operation.query),
  absintheSocketLink,
  createUploadLink({
    uri: GRAPHQL_API_ENDPOINT,
    credentials: 'include'
  })
)

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors) {
    if (graphQLErrors[0] && graphQLErrors[0].message === 'Not authenticated') {
      // refreshOrLogout();
    }
    graphQLErrors.map(({ message, locations, path }: any) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const observableStore = new ObservableStore()
const timeoutLink = new ApolloLinkTimeout(30000, observableStore)

const client = new ApolloClient({
  link: timeoutLink.concat(
    ApolloLink.from([stateLink, errorLink, authLink, link])
  ),
  cache
})

const writeDefaults = async () => stateLink.writeDefaults

client.onResetStore(writeDefaults)

export default client
export { persistor, observableStore }
