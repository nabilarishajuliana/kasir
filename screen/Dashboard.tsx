import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Button,
  BackHandler,
  RefreshControl,
  SafeAreaView
} from "react-native";
import CardMenu from "../Components/CardMenu"; // Sesuaikan dengan struktur folder Anda
import { IMenu } from "../types/menu-types"; // Sesuaikan dengan struktur folder Anda
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMenu } from "../Api/GetMenu";
import RootLayout from "../Layout/RootLayout";
import { Searchbar } from "react-native-paper";
import RNRestart from 'react-native-restart';


const DashboardScreen = () => {
  const [orientation, setOrientation] = useState("portrait"); // State untuk mengetahui orientasi layar
  const [dataMenu, setDataMenu] = useState<IMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk mengetahui status loading
  const [token, setToken] = useState('');

  
  useEffect(() => {
    // Mendeteksi orientasi saat komponen dipasang
    const initial = () => {
      const { width, height } = Dimensions.get("window");
      setOrientation(width < height ? "portrait" : "landscape");
    };

    initial();

    // Event listener untuk mendeteksi perubahan orientasi
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      const { width, height } = window;
      setOrientation(width < height ? "portrait" : "landscape");
    });

    return () => subscription.remove(); // Membersihkan event listener saat komponen di-unmount
  }, []);

 

  const [nama, setNama] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      // const menuData: IMenu[] = await getMenu();
      // setDataMenu(menuData);
      // setIsLoading(false);

      try {
        const menuData: IMenu[] = await getMenu();

        AsyncStorage.getItem('token')
      .then(value => {
        if (value !== null) {
          setToken(value); // Menyimpan nilai ke state
        }
      })
      .catch(error => {
        console.error(error);
      });
      console.log("token", token)
        setDataMenu(menuData);
        setIsLoading(false); // Set loading menjadi false setelah data selesai diambil
      } catch (error) {

        console.error("Error fetching data:", error);
        setIsLoading(false); // Pastikan loading dihentikan jika terjadi kesalahan
      }
    };

    fetchData();
    console.log("data menu dashboard:", dataMenu);

    // AsyncStorage.getItem('checkLogin') 
    // .then(value => {
    //   if (value !== null) {
    //     setNama(value); // Menyimpan nilai ke state
    //   } 
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    // console.log("chek login", nama);

  }, []);

  useEffect(() => {
    const backAction = () => {
      return true; // Return true agar perintah back tidak dijalankan
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => backHandler.remove(); // Membersihkan listener saat komponen di-unmount
  
  }, []);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
    
      <RootLayout>
        <View style={styles.container}>
          <Text style={styles.heading}>List Menu</Text>
          {/* <Button title="Reload App" onPress={handleAppReload} /> */}
         
          {isLoading ? (
            <View>
              <ActivityIndicator
                size="large"
                color="orange"
                style={{ flex: 1 ,marginTop:10}}
              />
            </View>
          ) : (
            <ScrollView>
              <View
                style={
                  orientation === "portrait"
                    ? styles.menuContainerPortrait
                    : styles.menuContainerLandscape
                }
              >
                {dataMenu && dataMenu.map((menu: IMenu) => (
                  <View
                    style={orientation !== "portrait" ? styles.cardMenu : null}
                  >
                    <CardMenu menu={menu} key={menu.id} />
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </RootLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },

  cardMenu: {
    width: "45%", // Menyesuaikan ukuran lebar card
    margin: "2%", // Memberikan jarak antar card
    aspectRatio: 1, // Memastikan setiap card memiliki aspek rasio yang sama (contohnya 1:1)
    // borderWidth: 1, // Memberikan border untuk card (opsional)
    borderColor: "#DDD", // Warna border card (opsional)
    borderRadius: 8, // Memberikan sudut bulat pada card (opsional)
    padding: 10, // Memberikan padding pada card (opsional)
  },
  menuContainerPortrait: {
    flexDirection: "column", // Jika portrait, gunakan satu kolom
  },
  menuContainerLandscape: {
    flexDirection: "row", // Jika landscape, gunakan dua kolom
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 250,
  },
  search:{
    backgroundColor: "white"
  },
});

export default DashboardScreen;

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

//INI YANG RILL

// const DashboardScreen = () => {

//   const [dataMenu, setDataMenu] = useState<IMenu[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const menuData: IMenu[] = await getMenu();
//       setDataMenu(menuData);
//     };

//     fetchData();
//     console.log(dataMenu);
//   }, []);

//   return (
//     <RootLayout>
//       <View style={styles.container} >
//       <Text style={styles.heading}>TOP Menu</Text>
//       <ScrollView>
//         <View style={styles.menuContainer}>
//           {dataMenu.map((menu: IMenu) => (
//             <View style={styles.cardMenu}>
//             <CardMenu menu={menu} key={menu.id} />
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//     </RootLayout>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'blue',
//     marginTop: 20,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   cardMenu: {
//     width: '45%', // Menyesuaikan ukuran lebar card
//     margin: '2.5%', // Memberikan jarak antar card
//     aspectRatio: 1, // Memastikan setiap card memiliki aspek rasio yang sama (contohnya 1:1)
//     borderWidth: 1, // Memberikan border untuk card (opsional)
//     borderColor: '#DDD', // Warna border card (opsional)
//     borderRadius: 8, // Memberikan sudut bulat pada card (opsional)
//     padding: 10, // Memberikan padding pada card (opsional)
//   },
// });

// export default DashboardScreen;
