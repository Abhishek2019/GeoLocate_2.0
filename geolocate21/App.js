import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from "./src/screens/Home";
import mapViewScreen from "./src/screens/mapViewScreen";

const RootStack = StackNavigator(
    {

        Home: {
            screen: Home,
        },
    maps:{

            screen : mapViewScreen,


    }
    },
    {
        initialRouteName: 'Home',
    }
);


class App extends React.Component {
  render() {
    return (
      <RootStack />
    );
  }
}




export default App;