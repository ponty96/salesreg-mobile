import React from 'react';

import Routes from './src/Navigation/Routes';
//import EditUserProfileScreen from './src/Screen/EditUserProfileScreen';
//import SelectGenderAtom from './src/Atom/SelectGenderAtom';

export default class App extends React.Component {
  render() {
    return (
	  <Routes />
          //<EditUserProfileScreen />
          //<SelectGenderAtom />
    );
  }
}