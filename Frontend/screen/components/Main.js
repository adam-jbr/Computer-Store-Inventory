import { StatusBar } from 'expo-status-bar';
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';


import { fetchComputers} from '../../redux/ActionCreators';


// Import Navigators from React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';


// Import Screens
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Splash from './Splash';
import CustomSidebarMenu from './CustomSidebarMenu';
import NavigationDrawerHeader from './NavigationDrawerHeader';






const mapStateToProps = state => {
    return {
      computers: state.computers,
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    fetchComputers: () => dispatch(fetchComputers()),
  })



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home', //Set Header Title
         
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};



const accessedpages = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Home'}}
        component={homeScreenStack}
      />
    </Drawer.Navigator>
  );
};



class Main extends Component {
    componentDidMount() {
      this.props.fetchComputers();
    }
  
    render() {
   
      return (
        <NavigationContainer>
       
      
        <Stack.Navigator initialRouteName="intrpage">
  
          <Stack.Screen
            name="intropage"
            component={Splash}
  
            options={{ headerShown: false }}
          />
  
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="signup"
            component={Signup}
            options={{
              title: 'Register', //Set Header Title
              headerStyle: {
                backgroundColor: '#307ecc', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
           <Stack.Screen
            name="accessedpages"
            component={accessedpages}
            // Hiding header for Navigation Drawer
            options={{headerShown: false}}
          />
  
         
        </Stack.Navigator>
      </NavigationContainer>
      );
    }
  }




export default connect(mapStateToProps, mapDispatchToProps)(Main);