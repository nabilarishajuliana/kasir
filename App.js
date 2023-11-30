import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screen/Login";
import DashboardScreen from "./screen/Dashboard";
import ListTransaksi from "./screen/ListTransaksi";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Login} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="List" component={ListTransaksi} />
      </Stack.Navigator>
    </NavigationContainer>
    // <SafeAreaView style={styles.safeArea}>
    //   <View style={styles.container}>
    //     <Login />
    //   </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white", // Ganti dengan warna latar belakang yang diinginkan
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: Platform.OS === "android" ? 50 : 0, // Penyesuaian padding untuk Android
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
