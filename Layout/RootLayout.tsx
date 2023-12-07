import React, { useState } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FAB } from "react-native-paper";
import { BottomSheet, ListItem, Button } from "@rneui/themed";
import {Drawerside} from "../Nav/Navigasi";

const RootLayout = ({ children }) => {
  
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    { title: "List Item 1" },
    { title: "List Item 2" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FAB icon="plus" style={styles.fab} onPress={() => setIsVisible(true)} />
      
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <Sidebar />
        </View>
        {/* <Drawerside/> */}
        <ScrollView style={styles.content}>
          <Header />
          <View>{children}</View>
        </ScrollView>
      </View>
    </View>
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
    zIndex: 1, // Memberikan zIndex untuk memastikan Sidebar muncul di atas konten lain
    // Styling tambahan sesuai kebutuhan
    // width: 200, // Tentukan lebar sidebar di sini
  },
  content: {
    flex: 3,
    // Styling tambahan sesuai kebutuhan
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 2, // Memberikan zIndex agar tombol berada di atas konten lainnya
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
