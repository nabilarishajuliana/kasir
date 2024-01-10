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
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import CardMenu from "../Components/CardMenu"; // Sesuaikan dengan struktur folder Anda
import { IMenu } from "../types/menu-types"; // Sesuaikan dengan struktur folder Anda
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMenu } from "../Api/GetMenu";
import RootLayout from "../Layout/RootLayout";
import { Icon } from "react-native-paper";
import { useCoffeeCart } from "../context/CartContext";
import * as Animatable from "react-native-animatable";
import Overlay from "../Components/Overlay";

const DashboardScreen = () => {
  const [orientation, setOrientation] = useState("portrait"); // State untuk mengetahui orientasi layar
  const [dataMenu, setDataMenu] = useState<IMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk mengetahui status loading
  const [token, setToken] = useState("");
  const { refreshing, setRefreshing } = useCoffeeCart();
  const {modalVisible, setModalVisible} = useCoffeeCart();
  const [selectedTransaction, setSelectedTransaction] = React.useState(0);

  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCoffeeCart();
  const quantity = getItemQuantity(selectedTransaction.id);

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

  const [nama, setNama] = useState("");

  const fetchData = async () => {
    // const menuData: IMenu[] = await getMenu();
    // setDataMenu(menuData);
    // setIsLoading(false);

    try {
      const menuData: IMenu[] = await getMenu();

      AsyncStorage.getItem("token")
        .then((value) => {
          if (value !== null) {
            setToken(value); // Menyimpan nilai ke state
          }
        })
        .catch((error) => {
          console.error(error);
        });
      console.log("token", token);
      setDataMenu(menuData);
      setIsLoading(false); // Set loading menjadi false setelah data selesai diambil
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // Pastikan loading dihentikan jika terjadi kesalahan
    }
  };

  useEffect(() => {
    fetchData();

    console.log("data menu dashboard:", dataMenu);
    console.log("data refresh", refreshing);
  }, []);

  useEffect(() => {
    const backAction = () => {
      return true; // Return true agar perintah back tidak dijalankan
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Membersihkan listener saat komponen di-unmount
  }, []);

  useEffect(() => {
    if (refreshing) {
      setIsLoading(true);
      fetchData();
      setRefreshing(false);
    }
  }, [refreshing]);

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  // const Overlay = () => {
  //   return (
  //     <TouchableOpacity
  //       style={[
  //         styles.overlay,
  //         { display: modalVisible ? "flex" : "none" }, // Tampilkan overlay hanya saat modal terlihat
  //       ]}
  //       onPress={() => {
  //         setModalVisible(!modalVisible);
  //       }}
  //     >
  //       <View style={styles.overlayBackground} />
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <>
      <RootLayout>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            {/* <ScrollView> */}
            <View style={styles.centeredView}>

              <View style={styles.modalView}>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <Pressable
                    onPress={() => {
                      setSelectedTransaction(0);
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Icon source="close-circle-outline" color="red" size={30} />
                  </Pressable>
                </View>

                {selectedTransaction && (
                  <View style={{ padding: 10 }}>
                    <Text
                      style={[
                        {
                          fontWeight: "bold",
                          textAlign: "center",
                          fontSize: 20,
                        },
                      ]}
                    >
                      {selectedTransaction.nama_menu}
                    </Text>
                    <Text
                      style={[
                        styles.modalText,
                        { fontWeight: "400", fontSize: 12, opacity: 0.5 },
                      ]}
                    >
                      {" "}
                      {selectedTransaction.jenis}
                    </Text>
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          backgroundColor: "white",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 3,
                          borderRadius: 10,
                          overflow: "hidden", // Mengatur overflow agar bayangan tetap terlihat dengan borderRadius
                        }}
                      >
                        <Image
                          source={{ uri: selectedTransaction.gambar }} // Ganti dengan path gambar Anda
                          style={{ width: 200, height: 200, borderRadius: 10 }} // Sesuaikan ukuran gambar
                        />
                      </View>
                    </View>

                    <Text
                      style={[
                        {
                          fontWeight: "400",
                          fontSize: 15,
                          opacity: 0.5,
                          textAlign: "left",
                          paddingTop: 15,
                        },
                      ]}
                    >
                      {selectedTransaction.deskripsi}
                    </Text>
                    <Text style={{ textAlign: "left", fontWeight: "bold" }}>
                      Rp{selectedTransaction.harga.toLocaleString("id-ID")}
                    </Text>
                  </View>
                )}

                {quantity === 0 ? (
                  <View>
                    <TouchableOpacity
                      onPress={() => increaseCartQuantity(selectedTransaction)}
                    >
                      <Text
                        style={{
                          backgroundColor: "orange",
                          paddingVertical: 8,
                          paddingHorizontal: 16,
                          borderRadius: 8,
                          color: "white", // Untuk mengatur warna teks menjadi putih
                          fontWeight: "600", // Gunakan '600' untuk semibold
                          textAlign: "center", // Untuk meletakkan teks di tengah
                        }}
                      >
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.spaceBetween}>
                    <TouchableOpacity
                      onPress={() => decreaseCartQuantity(selectedTransaction)}
                    >
                      <View style={styles.quantityButton}>
                        <Text style={styles.buttonText}>-</Text>
                      </View>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{quantity}</Text>

                    <TouchableOpacity
                      onPress={() => increaseCartQuantity(selectedTransaction)}
                    >
                      <View style={styles.quantityButton}>
                        <Text style={styles.buttonText}>+</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            {/* </ScrollView> */}
          </Modal>
        </View>

        
         <Overlay />

        <View >
          <View style={styles.container}>
          <Text style={styles.heading}>LIST MENU</Text>
          {/* <Button title="Reload App" onPress={handleAppReload} /> */}

          {isLoading ? (
            <View>
              <ActivityIndicator
                size="large"
                color="orange"
                style={{ flex: 1, marginTop: 10 }}
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
                {dataMenu &&
                  dataMenu.map((menu: IMenu) => (
                    <View
                      style={
                        orientation !== "portrait" ? styles.cardMenu : null
                      }
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedTransaction(menu);
                          setModalVisible(true);
                        }}
                      >
                        <Animatable.View
                          animation="zoomIn"
                          style={styles.cardMenu}
                        >
                          <CardMenu menu={menu} key={menu.id} />
                        </Animatable.View>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </ScrollView>
          )}
        </View>
        </View>
        
      </RootLayout>
    </>
  );
};

const styles = StyleSheet.create({
  back:{
    backgroundColor:"black",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingHorizontal: 15,
    marginBottom: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
    marginLeft: 10,
    textAlign: "left",
  },

  cardMenu: {
    // width: "45%", // Menyesuaikan ukuran lebar card
    // margin: "2%", // Memberikan jarak antar card
    // aspectRatio: 1, // Memastikan setiap card memiliki aspek rasio yang sama (contohnya 1:1)
    // borderColor: "#DDD", // Warna border card (opsional)
    // borderRadius: 8, // Memberikan sudut bulat pada card (opsional)
    // padding: 10, // Memberikan padding pada card (opsional)
  },
  menuContainerPortrait: {
    flexDirection: "column",
  },
  menuContainerLandscape: {
    flexDirection: "row", // Jika landscape, gunakan dua kolom
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 250,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Ubah tinggi bayangan (shadow)
    },
    shadowOpacity: 0.5, // Ubah transparansi bayangan
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "orange",
  },
  buttonClose: {
    backgroundColor: "orange",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#EEE",
    width: 40,
    height: 40,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  overlayBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
