// import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api-cafe-ukk.vercel.app/v1';

// const appSetting = async () => {
//   try {
//     const response = await fetch(`https://console.akademika.id/api/method/cbtSetting`, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'akademikapp': 'TH-CBT-3.0.0',
//       }
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // console.log('Error Login', response);
//     }
//     // else {
//     //   await AsyncStorage.setItem('appVersi', data.message.versi);
//     // }
//     await AsyncStorage.setItem('appVersi', '3.0.0-android');

//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//         // console.log(error.message);
//       } else {
//         // console.log(error);
//       throw error;
//     }
//   };
// };
// export {appSetting};

const pesertaLogin = async (username: any, password: any) => {
  try {
    const response = await fetch(`https://api-cafe-ukk.vercel.app/v1/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();
    console.log("data login",data);

    if (response ) {
      await AsyncStorage.setItem("uuid", data.data.user.uuid);
      await AsyncStorage.setItem("role", data.data.user.role);
        // AsyncStorage.setItem("id", idString);
        await AsyncStorage.setItem("username", data.data.user.username);
        await AsyncStorage.setItem("photo_profile", data.data.user.photo_profile);
        await AsyncStorage.setItem("token", data.data.token);
        
    } else {
      // console.log('pesertaLogin Error', data);
    }


    return data;
  } catch (error) {
    if (error instanceof Error) {
        // console.log(error.message);
      } else {
        // console.log(error);
        // ini user login kan cantik 
      throw error;
    }
  };
};
export {pesertaLogin};

const pesertaLogout = async () => {
  try {
    const token     = await AsyncStorage.getItem('pesertaToken');
    const response  = await fetch(`https://console.akademika.id/api/method/cbtLogout`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'akademikapp': 'TH-CBT-3.0.0',
        'akademikasesi': token,
      }
    });

    const data = await response.json();

    if (response.ok && data.message) {
      await AsyncStorage.setItem('pesertaNama', '');
      await AsyncStorage.setItem('pesertaNomor', '');
      // await AsyncStorage.setItem('pesertaAsesmen', '');
      await AsyncStorage.setItem('pesertaToken', '');
    } else {
      await AsyncStorage.setItem('pesertaNama', '');
      await AsyncStorage.setItem('pesertaNomor', '');
      // await AsyncStorage.setItem('pesertaAsesmen', '');
      await AsyncStorage.setItem('pesertaToken', '');
      // console.log('pesertaLogout Error', data);
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
        // console.log(error.message);
      } else {
        // console.log(error);
      throw error;
    }
  };
};
export {pesertaLogout};
