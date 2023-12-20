import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMeja } from '../types/meja-types';

const getMeja = async (): Promise<IMeja[]> => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`https://api-cafe-ukk.vercel.app/v1/meja?status=kosong`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    // Mengecek apakah responseData.data adalah array atau objek tunggal
    if (Array.isArray(responseData.data)) {
      const result: IMeja[] = responseData.data.map((data: any) => ({
        id: data.id,
        nomor_meja: data.nomor_meja,
        status: data.status,
      }));
      // console.log("result meja",result)
      return result;
    } else {
      
      throw new Error('Responsenya bukan dalam bentuk array');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    throw error;
  }
};

export { getMeja };
