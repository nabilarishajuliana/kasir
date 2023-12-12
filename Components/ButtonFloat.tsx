import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FAB } from "react-native-paper";
import { BottomSheet, ListItem } from "@rneui/themed";
import { useCoffeeCart } from "../context/CartContext";
import { IMenu } from "../types/menu-types";
import { getMenu } from "../Api/GetMenu";

const ButtonFloat = () => {
  const { cartItems } = useCoffeeCart(); // Menggunakan useCoffeeCart disini
  const [menu, setMenu] = React.useState<IMenu[] | null>(null);

//   useEffect(() => {
//     console.log("Cart Items changed:", cartItems);
//   }, [cartItems]); 

  useEffect(() => {
    const fetchData = async () => {
      const menuData: IMenu[] = await getMenu();
      setMenu(menuData);
    };

    fetchData();
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <>
      <FAB icon="plus" style={styles.fab} onPress={() => setIsVisible(true)} />

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {cartItems.map((item, index) => {
          const menuItem = menu?.find((m) => m.id === item.menuId);
          //   console.log("menu item",menuItem);

          if (!menuItem) {
            return null;
          }

          // cantik bisa?? di bisa bisain eh dik tapi lemot banget tombolnya

          return (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: 'bold' }}>{menuItem.nama_menu}</ListItem.Title>
                <ListItem.Subtitle>Qty: {item.jumlah} , Harga: Rp{item.harga.toLocaleString('id-ID')}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
        <ListItem
          containerStyle={{ backgroundColor: "red" }}
          onPress={() => setIsVisible(false)}
        >
          <ListItem.Content>
            <ListItem.Title style={{ color: "white" }}>cancel</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </BottomSheet>
    </>
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
});

export default ButtonFloat;
