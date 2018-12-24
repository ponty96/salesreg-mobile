import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
// import { createHttpLink } from 'apollo-link-http';
import { hasSubscription } from '@jumpn/utils-graphql'
import absintheSocketLink from './absinthe-socket-link'
import { setContext } from 'apollo-link-context'
import Auth from '../services/auth'
import { authenticate } from '../graphql/resolvers/auth'
import { onError } from 'apollo-link-error'
// import refreshOrLogout from '../services/refreshOrLogout';
import { createUploadLink } from '@richeterre/apollo-upload-client'

// const GRAPHQL_API_ENDPOINT = 'http://16e11967.ngrok.iom /api'
const GRAPHQL_API_ENDPOINT = 'http://localhost:5000/api'
const cache = new InMemoryCache()

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
    if (graphQLErrors[0].message === 'Not authenticated') {
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

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, errorLink, authLink, link]),
  cache
})

const writeDefaults = async () => stateLink.writeDefaults

client.onResetStore(writeDefaults)

export default client
