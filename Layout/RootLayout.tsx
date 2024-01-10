import React, { useState ,useRef, useEffect} from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FAB } from "react-native-paper";
import { useCoffeeCart } from "../context/CartContext";
import ButtonFloat from "../Components/ButtonFloat";


const RootLayout = ({ children }) => {
  const { open,setOpen } = useCoffeeCart(); // Menggunakan useCoffeeCart disini
  const {refreshing, setRefreshing}= useCoffeeCart()
  const [showOverlay, setShowOverlay] = useState(false); // State untuk menampilkan overlay

  const onRefresh = () => {
    // Logika refresh, misalnya:
    setRefreshing(true);
    // Lakukan operasi refresh di sini, kemudian set refreshing menjadi false ketika selesai
    
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 5000); // Contoh, tunggu 2 detik sebelum menghentikan indikator refreshing
  };

  const scrollViewRef = useRef(null);

  const handleOutsidePress = (event) => {
    const isInsideSidebar = event.nativeEvent.locationX < 200; // Ganti nilai 200 dengan lebar Sidebar Anda
    if (!isInsideSidebar) {
      setOpen(false); // Menutup Sidebar jika area di luar Sidebar ditekan
      setShowOverlay(false);
    }
  };

  useEffect(() => {
    setShowOverlay(open); // Menggunakan useEffect untuk mengubah showOverlay
  }, [open]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ButtonFloat />
        <View style={styles.container}>
        {showOverlay && ( // Menggunakan showOverlay untuk menampilkan overlay
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => {
                setOpen(false);
              }}
            />
          )}
          <View style={styles.sidebar}>
            <Sidebar />
          </View>
          <ScrollView
            style={styles.content}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ref={scrollViewRef}
            onTouchEnd={handleOutsidePress} // Tangani event sentuhan di ScrollView
          >
            <Header />
            <View>{children}</View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
    // width: 200,
  },
  content: {
    flex: 3,
  },
  fab: {
    backgroundColor: "orange",
    color: "white",
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
});

export default RootLayout;

// import React, { useEffect, useState } from 'react';
// import { View, ScrollView, Text } from 'react-native';
// import Sidebar from '../Components/Sidebar';
// import Header from '../Components/Header';
// // Impor tambahan yang khusus untuk React Native akan disertakan di sini

// // Fungsi untuk mendapatkan data pengguna (disimulasikan)
// const fetchUserData = async () => {
//   // Panggil API (disimulasikan)
//   return {
//     data: {
//       id: '1',
//       uuid: '12345',
//       name: 'John Doe',
//       // Data pengguna lainnya...
//     },
//   };
// };

// const RootLayout = ({ children }) => {
// //   const [userAuth, setUserAuth] = useState(null);

// //   useEffect(() => {
// //     const getUserAuth = async () => {
// //       try {
// //         const response = await fetchUserData(); // Ganti dengan panggilan API yang sebenarnya
// //         const responseData = response.data;

// //         const result = {
// //           id: responseData.id,
// //           uuid: responseData.uuid,
// //           name: responseData.name,
// //           // Data pengguna lainnya...
// //         };

// //         setUserAuth(result);
// //       } catch (error) {
// //         // Tangani kesalahan di sini
// //         console.error(error);
// //       }
// //     };

// //     getUserAuth();
// //   }, []);

// //   if (!userAuth) {
// //     // Tangani kasus ketika userAuth belum tersedia
// //     return <Text>Loading...</Text>;
// //   }

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Komponen SheetCart */}
//       {/* Perhatikan: React Native tidak memiliki komponen langsung yang setara dengan beberapa komponen web */}
//       {/* Anda mungkin perlu mengimplementasikan kembali komponen-komponen ini menggunakan komponen native */}

//       <View style={{ flex: 1, flexDirection: 'row' }}>
//         <View style={{ flex: 1 }}>
//             <Sidebar/>
//           {/* Sidebar (bagian kiri) */}
//           {/* Anda akan mengganti ini dengan komponen Sidebar dari React Native */}
//         </View>

//         <View style={{ flex: 3 }}>
//           {/* Header dan komponen-komponen children */}
//           {/* Ganti Header dan children dengan setara dari React Native */}
//           {/* Gunakan ScrollView untuk konten yang dapat di-scroll */}
//           <ScrollView style={{ flex: 1 }}>
//             <Header/>
//             {/* Komponen Header */}
//             {/* Komponen-komponen children */}
//             {/* Perhatikan: Gunakan komponen-komponen React Native sesuai kebutuhan */}
//             {/* <Text>Komponen Header</Text> */}
//             <View>{children}</View>
//           </ScrollView>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default RootLayout;
