import React from 'react'
import { Query } from 'react-apollo'
import { DocumentNode } from 'graphql'
import { FetchPolicy } from 'apollo-client'

import AppSpinner from './Spinner'
import ErrorViewAtom from '../Atom/ErrorViewAtom'
import { TouchableOpacity } from 'react-native'

interface IProps {
  from: string
  graphqlQuery: DocumentNode
  fetchPolicy?: FetchPolicy
  graphqlQueryResultKey: string
  variables: any
  children: any
}

interface IError {
  onRefresh: () => void
}

const ErrorView = (props: IError) => (
  <TouchableOpacity
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    }}
    onPress={props.onRefresh}
  >
    <ErrorViewAtom />
  </TouchableOpacity>
)

const QueryLoader = (props: IProps) => {
  if (props.from !== 'notifications') {
    return props.children({})
  } else {
    return (
      <Query
        query={props.graphqlQuery}
        variables={props.variables}
        fetchPolicy={props.fetchPolicy || 'cache-and-network'}
      >
        {({ loading, data, error, refetch }) => {
          let component = null
          if (!loading && !data && error) {
            component = (
              <ErrorView
                onRefresh={() => refetch({ variables: props.variables })}
              />
            )
          } else if (!loading && data) {
            component = props.children(data[props.graphqlQueryResultKey])
          }

          console.log('The data is ', data)
          return (
            <React.Fragment>
              <AppSpinner
                visible={
                  (!data || (data && Object.keys(data).length == 0)) && loading
                }
              />
              {component}
            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}

export default QueryLoader
