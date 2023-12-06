import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import CardMenu from '../Components/CardMenu'; // Sesuaikan dengan struktur folder Anda
import { IMenu } from '../types/menu-types'; // Sesuaikan dengan struktur folder Anda
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMenu } from '../Api/GetMenu';
import RootLayout from '../Layout/RootLayout';



// const getMenu = async (): Promise<IMenu[]> => {
//   // Perhatikan bahwa penggunaan cookies() dan redirect() tidak relevan dalam konteks React Native
//   // Untuk autentikasi, Anda dapat menggunakan AsyncStorage atau cara autentikasi yang sesuai untuk aplikasi React Native Anda
//   // Pastikan Anda telah mengatur autentikasi yang sesuai untuk mengambil data dari API Anda
//   try {
//     const token     = await AsyncStorage.getItem('token');
//     const response = await fetch(`https://api-cafe-ukk.vercel.app/v1/menu`, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: "Bearer " + token,
//       },
//     });
//     const responseData = await response.json();
//     const result: IMenu[] = responseData.data.map((menuItem: IMenu) => ({
//       id: menuItem.id,
//       nama_menu: menuItem.nama_menu,
//       jenis: menuItem.jenis,
//       deskripsi: menuItem.deskripsi,
//       gambar: menuItem.gambar,
//       gambar_id: menuItem.gambar_id,
//       harga: menuItem.harga,
//     }));
  
//     return result;
//   } catch (error) {
//     console.error('Error fetching menu:', error);
//     return []; // Mengembalikan array kosong jika terjadi kesalahan
//   }
// };

const DashboardScreen = () => {
  
  
  const [dataMenu, setDataMenu] = useState<IMenu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const menuData: IMenu[] = await getMenu();
      setDataMenu(menuData);
    };

    fetchData();
    console.log(dataMenu);
  }, []);

  return (
    <RootLayout>
      <View >
      <Text style={styles.heading}>TOP Menu</Text>
      <ScrollView>
        <View >
          {dataMenu.map((menu: IMenu) => (
            <CardMenu menu={menu} key={menu.id} />
          ))}
        </View>
      </ScrollView>
    </View>
    </RootLayout>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  menuContainer: {

    flexDirection: 'row',

    flexWrap: 'wrap',

    justifyContent: 'space-between',

 },
});

export default DashboardScreen;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import RootLayout from '../Layout/RootLayout';
// // import RootLayout from './RootLayout'; // Ubah path sesuai dengan struktur proyek Anda

// const DashboardScreen = () => {
//   return (
//     <>
//     <RootLayout>
//       <View style={styles.container}>
//         <Text style={styles.title}>Dashboard</Text>
//       </View>
//     </RootLayout>
//     </>
    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 20,
//   },
// });

// export default DashboardScreen;
