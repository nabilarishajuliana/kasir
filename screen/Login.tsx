import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { pesertaLogin } from "../Api/Login";
import Password from "antd/es/input/Password";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Additional dependencies in React Native may need different libraries or implementation

const Login = ({ navigation }) => {
  // const {navigate}    = useNavigation<NavigationProp<any>>();

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     // Check for JWT token in AsyncStorage or SecureStorage in React Native
  //     // Redirect to another screen if the token exists
  //   }, []);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  

  const { navigate } = useNavigation<NavigationProp<any>>();

  // const [email, setEmail]             = React.useState('');
  // const [password, setPassword]                  = React.useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await pesertaLogin(data.username, data.password);
      console.log("username", data.username);
      console.log("pass", data.password);

      if (response && response.code == 200) {

        // console.log(response);
        navigate("Dashboard");
        setIsLoading(false);
        const idString = JSON.stringify(response.data.user.id);

        // AsyncStorage.setItem("uuid", response.data.user.uuid);
        // AsyncStorage.setItem("role", response.data.user.role);
        // AsyncStorage.setItem("id", idString);
        // AsyncStorage.setItem("username", response.data.user.username);
        // AsyncStorage.setItem("photo_profile", response.data.user.photo_profile);
        // AsyncStorage.setItem("token", response.data.token);
      } else {
        Alert.alert("Gagal Login", "yang bener dong username sm passwordnya");
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Login With Your Account
          </Text>
          <Text style={{ fontSize: 14 }}>
            Enter your username and password correctly
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              borderRadius: 5,
            }}
            placeholder="Username"
            value={data.username}
            onChangeText={(text) => handleChange("username", text)}
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              borderRadius: 5,
              marginTop: 10,
            }}
            placeholder="Password"
            secureTextEntry={true}
            value={data.password}
            onChangeText={(text) => handleChange("password", text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: 15,
            borderRadius: 5,
            alignItems: "center",
          }}
          onPress={handleLogin}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white" }}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text>Develop on 2 DAY</Text>
    </View>
  );
};

export default Login;
