// import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api-cafe-ukk.vercel.app/v1';


const saveTransaksi = async (dataOrder) => {
    const token = await AsyncStorage.getItem("token");

  try { 
    const response = await fetch(`https://api-cafe-ukk.vercel.app/v1/transaksi`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(dataOrder),
    });

    const data = await response.json();
    console.log("transaksinya",data);

    // if (response ) {
      
        
    // } else {
    //   // console.log('pesertaLogin Error', data);
    // }


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
export {saveTransaksi};