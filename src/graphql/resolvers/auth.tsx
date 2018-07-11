// Empty Query Solves issue onResetStore
const authenticate = {
  defaults: {
    authenticate: false
  },
  resolvers: {
    Query: {},
    Mutation: {
      authenticate: (_: any, _args: any, { cache }: any): any => {
        console.log('HERE WE GO!');
        const data = { authenticate: true };
        cache.writeData({ data });
        return null;
      },
      logout: async (_: any, _args: any, { cache }: any): Promise<any> => {
        cache.writeData({ data: { authenticate: false } });
        return null;
      }
    }
  }
};

export default authenticate;
