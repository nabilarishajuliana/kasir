import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardScreen from '../screen/Dashboard';
import ListTransaksi from '../screen/ListTransaksi';
import { useSharedValue, withSpring } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

const Sidebarnew = () => {
  const translateX = useSharedValue(0);

  const openDrawer = () => {
    translateX.value = withSpring(200); // Misalnya, menggunakan animasi Spring
  };

  const closeDrawer = () => {
    translateX.value = withSpring(0); // Menutup drawer dengan animasi Spring
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Dashboard"
        
        
      >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="List" component={ListTransaksi} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Sidebarnew;
