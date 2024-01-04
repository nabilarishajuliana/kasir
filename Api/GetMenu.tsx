import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMenu } from '../types/menu-types'; // Sesuaikan dengan struktur folder Anda


const getMenu = async (): Promise<IMenu[]> => {
  try {
    const token     = await AsyncStorage.getItem('token');
    // let controller  = new AbortController()
    // hi cantikk <3
    const response = await fetch(`https://api-cafe-v2.m3sra-kediri.my.id/v1/menu`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : "Bearer " + token,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

const responseData = await response.json();
  const result: IMenu[] = responseData.data.map((menuItem: IMenu) => ({
    id: menuItem.id,
    nama_menu: menuItem.nama_menu,
    jenis: menuItem.jenis,
    deskripsi: menuItem.deskripsi,
    gambar: menuItem.gambar,
    gambar_id: menuItem.gambar_id,
    harga: menuItem.harga,
  }));
  console.log("result get menu api",result)

  return result;
    
  } catch (error) {
    if (error instanceof Error) {
        // console.log(error.message);
        // console.log( AsyncStorage.getItem('token'))

      } else {
        // console.log(error);
        // console.log( AsyncStorage.getItem('token'))

    throw error;
  }
    };
};
export {getMenu};