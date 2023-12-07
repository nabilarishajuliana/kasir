import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screen/Login";
import DashboardScreen from "./screen/Dashboard";
import ListTransaksi from "./screen/ListTransaksi";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OrientationLock } from 'expo-screen-orientation';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Nav , Drawerside} from "./Nav/Navigasi";

const Stack = createNativeStackNavigator();

export default function App() {

  // Mengatur orientasi layar ke landscape
  React.useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }
    
    changeScreenOrientation();
  }, []);

  return (
    // <SafeAreaProvider>
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //      <Stack.Screen name="Home" component={Login} />  
    //       <Stack.Screen name="Dashboard" component={DashboardScreen} options={{
    //         headerBackVisible: false, // Menghilangkan tombol kembali di header
    //       }}/>
    //       <Stack.Screen name="List" component={ListTransaksi} options={{
    //         headerBackVisible: false, // Menghilangkan tombol kembali di header
    //       }} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </SafeAreaProvider>
<>
<Nav/>
</>
  );
}

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
    paddingTop: Platform.OS === "android" ? 50 : 0, 
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
