import React, { useState, createRef } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage';
import { render } from 'react-dom';

const Showuserupper = () => {


  const [user, setUser] = useState('');
  AsyncStorage.getItem('user').then(
   res => setUser(res))

    return (
      <Text> {(user.charAt(0)).toUpperCase()} </Text>
    )  


    }


const Showuser = () => {


  const [user, setUser] = useState('');
  AsyncStorage.getItem('user').then(
   res => setUser(res))

    return (
      <Text> {user} </Text>
    )  


    }


const CustomSidebarMenu = (props) => {
    return (
      <View style={stylesSidebar.sideMenuContainer}>
        <View style={stylesSidebar.profileHeader}>
          <View style={stylesSidebar.profileHeaderPicCircle}>
            {/* <Showuser /> */}
            <Text style={{ fontSize: 25, color: '#307ecc' }}> 
              <Showuserupper/>
            </Text>
          </View>
          <Text style={stylesSidebar.profileHeaderText}> <Showuser/></Text>
        </View>
        <View style={stylesSidebar.profileHeaderLine} />

        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label={({ color }) => <Text style={{ color: '#d8d8d8' }}>Logout</Text>}
            onPress={() => {
              //props.navigation.toggleDrawer();
             
              Alert.alert(
                'Logout',
                'Are you sure? You want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      AsyncStorage.clear();
                      props.navigation.navigate('login');
                    },
                  },
                ],
                { cancelable: false },
              );
            }}
          />
        </DrawerContentScrollView>
      </View>
    );
  };

  export default CustomSidebarMenu;

  const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
      width: '100%',
      height: '100%',
      backgroundColor: '#307ecc',
      paddingTop: 40,
      color: 'white',
    },
    profileHeader: {
      flexDirection: 'row',
      backgroundColor: '#307ecc',
      padding: 15,
      textAlign: 'center',
    },
    profileHeaderPicCircle: {
      width: 60,
      height: 60,
      borderRadius: 60 / 2,
      color: 'white',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileHeaderText: {
      color: 'white',
      alignSelf: 'center',
      paddingHorizontal: 10,
      fontWeight: 'bold',
    },
    profileHeaderLine: {
      height: 1,
      marginHorizontal: 20,
      backgroundColor: '#e2e2e2',
      marginTop: 15,
    },
  });