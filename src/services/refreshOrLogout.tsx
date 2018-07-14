// import Auth from "./auth";
// import client from '../client';
// import { VerifyTokenGQL } from "../graphql/mutations/authenticate";
// import { AuthenticateQueryGQL } from '../graphql/queries/authenticate';

// const refreshOrLogout = async() => {
//   const token = await Auth.getToken();
//   const refreshToken = await Auth.getRefreshToken();

//   if (token && refreshToken) {
//     try {
//       await client.mutate({
//         mutation: VerifyTokenGQL,
//         variables: { token, refreshToken },
//         update: async(proxy, {
//           data: {
//             verifyToken: {
//               token,
//               refreshToken,
//               updatedToken,
//               authenticated
//             }
//           }
//         }: any) => {
//           if (updatedToken) {
//             await Auth.setToken(updatedToken);
//           }
//           writeToCache(true);
//         },
//       });
//     } catch (error) {
//       writeToCache(false);
//     }
//   } else {
//     writeToCache(false);
//   }
// }

// const writeToCache = (bool: boolean) => {
//   const data = { authenticate:  bool } ;
//   client.cache.writeQuery({ query: AuthenticateQueryGQL, data });
// }

// export default refreshOrLogout;
