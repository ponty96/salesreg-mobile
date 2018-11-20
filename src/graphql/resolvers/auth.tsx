// Empty Query Solves issue onResetStore

export const typeDefs = `
type User {
  id: Int!
  firstName: String
  lastName: String
  email: String
  company: Company
}
type Company {
  id: String
  title: String
  contactEmail: String
  about: String
  currency: String
}
`
// Empty Query Solves issue onResetStore
export const authenticate = {
  defaults: {
    authenticate: false,
    user: null
  },
  resolvers: {
    Query: {},
    Mutation: {
      authenticate: (_: any, { user: user }: any, { cache }: any): any => {
        console.log('HERE WE GO!')
        const data = { authenticate: true, user: user }
        cache.writeData({ data })
        return null
      },
      logout: async (_: any, _args: any, { cache }: any): Promise<any> => {
        cache.writeData({ data: { authenticate: false, user: null } })
        return null
      }
    }
  },
  typeDefs: typeDefs
}
