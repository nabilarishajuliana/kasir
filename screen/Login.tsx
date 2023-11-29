import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
// Additional dependencies in React Native may need different libraries or implementation

const Login = () => {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // Check for JWT token in AsyncStorage or SecureStorage in React Native
//     // Redirect to another screen if the token exists
//   }, []);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

//   const handleSubmit = () => {
//     setIsLoading(true);
//     // Use fetch or Axios for network requests in React Native
//     fetch(`${process.env.REACT_NATIVE_API_URL}/user/login`, {
//       method: 'POST',
//       body: JSON.stringify({
//         username: data.username,
//         password: data.password,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((res) => {
//         const token = res.data.token;
//         if (token) {
//           // Set token in AsyncStorage or SecureStorage in React Native
//           // Redirect to another screen
//         }
//       })
//       .catch((err) => {
//         // Handle errors, maybe display a message to the user
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Login With Your Account</Text>
          <Text style={{ fontSize: 14 }}>Enter your username and password correctly</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5 }}
            placeholder="Username"
            value={data.username}
            onChangeText={(text) => handleChange('username', text)}
          />
          <TextInput
            style={{ borderWidth: 1, borderColor: 'black', padding: 10, borderRadius: 5, marginTop: 10 }}
            placeholder="Password"
            secureTextEntry={true}
            value={data.password}
            onChangeText={(text) => handleChange('password', text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'blue',
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
          }}
        //   onPress={handleSubmit}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white' }}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text>Develop on 2 DAY</Text>
    </View>
  );
};

export default Login;