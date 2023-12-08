import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image , } from "react-native";
import { MenuOutlined } from "@ant-design/icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import komponen atau library tambahan yang dibutuhkan di React Native

const menuData = {
  KASIR: [
    { title: "Menu", nav: "Dashboard" },
    { title: "List Transaksi", nav: "List" },
  ],
  // ... Definisikan menu untuk role ADMIN, MANAGER, dll.
};


const Sidebar = () => {

  
  const { navigate } = useNavigation<NavigationProp<any>>();

  const [open, setOpen] = useState(true);

  const handleLogout = async () => {
    try {
       AsyncStorage.clear();
      // await AsyncStorage.removeItem("uuid");
      // await AsyncStorage.removeItem("role");
      // await AsyncStorage.removeItem("id");
      // await AsyncStorage.removeItem("username");
      // await AsyncStorage.removeItem("photo_profile");
      // await AsyncStorage.removeItem("token");
      console.log('Semua item berhasil dihapus dari AsyncStorage.');

      navigate("Home" as any);
    } catch (error) {
      // Tangani kesalahan jika ada
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  const menus = menuData["KASIR"];
  return (
    <View
    style={{
      backgroundColor: open ? "white" : "transparent", // Ubah background jadi transparent jika open false
      width: open ? 240 : 80,
      height: "100%",
      padding: 20,
    }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
  onPress={() => setOpen(!open)}
  style={{
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 25,
    backgroundColor: "orange", // Background warna putih
    shadowColor: "black", // Warna bayangan
    shadowOffset: { width: 0, height: 2 }, // Penyesuaian offset bayangan
    shadowOpacity: 2, // Opasitas bayangan
    shadowRadius: 2, // Radius bayangan
    elevation: 4, // Elevation (hanya untuk Android)
  }}
>
  <View
    style={{
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "white", // Lingkaran warna orange di dalam tombol putih
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ color: "orange", fontWeight: "bold", fontSize: 20 }}>
      K
    </Text>
  </View>
</TouchableOpacity>
        {open && (
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Coffee</Text>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        {menus?.map((menu, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 10,
              // borderBottomWidth: 1,
              // borderBottomColor: "lightgrey", // Sesuaikan dengan warna yang diinginkan
            }}
            onPress={() => navigate(menu.nav)}
            // Implementasikan navigasi ke halaman yang sesuai saat menu ditekan
          >
            {/* <Image
              source={menu.icon}
              style={{ width: 20, height: 20, marginRight: 10 }}
            /> */}
            {open && <Text>{menu.title}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      {open &&<TouchableOpacity
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "lightgrey", // Sesuaikan dengan warna yang diinginkan
        }}
        onPress={handleLogout}
      >
        {/* <MenuOutlined           
        style={{ width: 20, height: 20, marginRight: 10 }}/> */}
        {/* <Image
          source={require("../assets/icons/logout.png")}
          style={{ width: 20, height: 20, marginRight: 10 }}
        /> */}
         <Text>Logout</Text>
      </TouchableOpacity>}
    </View>
  );
};

export default Sidebar;
