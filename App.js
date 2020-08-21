import React from 'react';
import { StyleSheet,Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import WriteScreen from './screens/WriteScreen';
import ReadScreen from './screens/ReadScreen';

export default class App extends React.Component {
  render(){
    return (
        <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  Write: {screen: WriteScreen},
  Read: {screen: ReadScreen},
},{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName;
      if(routeName==='Write'){
        return (
          <Image 
          source ={require('./assets/writeAStory.png')}
          style={{width: 30,height:30}}/>
        )
      }
      else if(routeName==='Read'){
        return (
          <Image 
          source ={require('./assets/openBook.png')}
          style={{width: 30,height:30}}/>
        )
      }
    }
  })
})

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});