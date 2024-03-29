// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createNavigationContainerRef } from "@react-navigation/native";
import Login from "../screen/Login";
import DashboardScreen from "../screen/Dashboard";
import ListTransaksi from "../screen/ListTransaksi";
import Transaksi from "../screen/Transaksi";
import DetailTransaksi from "../screen/DetailTransaksi";
import Profile from "../screen/Profile";
import UpdateProfile from "../screen/UpdateProfile";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OrientationLock } from "expo-screen-orientation";
import * as ScreenOrientation from "expo-screen-orientation";
import "react-native-gesture-handler";
import { CoffeeCartProvider } from "../context/CartContext";
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

const Nav = () => {
  // Mengatur orientasi layar ke landscape
  // React.useEffect(() => {
  //   async function changeScreenOrientation() {
  //     await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  //   }

  //   changeScreenOrientation();
  // }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="List"
            component={ListTransaksi}
            options={{
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Transaksi"
            component={Transaksi}
            options={{
              headerShown: true,
              headerTitle: "Data Transaksi",
             
              
            }} // Menampilkan header pada layar Dashboard
          />
          <Stack.Screen
            name="DetailTransaksi"
            component={DetailTransaksi}
            options={{
              headerBackVisible: false,
              headerShown: true,
              headerTitle: "Detail Transaksi",
              headerTitleAlign: 'center', // Memusatkan judul header
            }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerShown: true,
              headerTitle: "Profile",
              headerTitleAlign: 'center', // Memusatkan judul header
            }}
          />
          <Stack.Screen
            name="UpdateProfile"
            component={UpdateProfile}
            options={{
              headerShown: true,
              headerTitle: "Update",
              headerTitleAlign: 'center', // Memusatkan judul header
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { Nav };
