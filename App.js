/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Recipients from './components/Recipients';
import HomeScreen from './components/Home'
import Signing from './components/Signing'

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  JWE: {screen: Recipients},
  Signing: {screen: Signing}
})

const App = createAppContainer(MainNavigator)

export default App;
