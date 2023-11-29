import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// Import komponen atau library tambahan yang dibutuhkan di React Native

const menuData = {
  KASIR: [
    {
      title: "Dashboard",
      icon: require("../assets/icons/home.png"),
      route: "/",
    },
    {
      title: "Menu",
      icon: require("../assets/icons/book.png"),
      route: "/kasir/menu",
    },
    {
      title: "History",
      icon: require("../assets/icons/history.png"),
      route: "/kasir/history",
    },
  ],
  // ... Definisikan menu untuk role ADMIN, MANAGER, dll.
};

const Sidebar = ({ role }) => {
  const [open, setOpen] = useState(true);

  const handleLogout = () => {
    // Implementasi logout di sini
  };

  const menus = menuData["KASIR"];
  return (
    <View
      style={{
        backgroundColor: "white",
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
            backgroundColor: "orange", // Sesuaikan dengan warna yang diinginkan
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            K
          </Text>
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
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey", // Sesuaikan dengan warna yang diinginkan
            }}
            // Implementasikan navigasi ke halaman yang sesuai saat menu ditekan
          >
            <Image
              source={menu.icon}
              style={{ width: 20, height: 20, marginRight: 10 }}
            />
            {open && <Text>{menu.title}</Text>}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "lightgrey", // Sesuaikan dengan warna yang diinginkan
        }}
        onPress={handleLogout}
      >
        <Image
          source={require("../assets/icons/logout.png")}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        {open && <Text>Logout</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Sidebar;
