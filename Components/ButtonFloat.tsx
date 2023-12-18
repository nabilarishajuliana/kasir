import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import { FAB } from "react-native-paper";
import { BottomSheet, ListItem } from "@rneui/themed";
import { useCoffeeCart } from "../context/CartContext";
import { IMenu } from "../types/menu-types";
import { getMenu } from "../Api/GetMenu";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const ButtonFloat = () => {
  const { cartItems } = useCoffeeCart(); // Menggunakan useCoffeeCart disini
  const [menu, setMenu] = React.useState<IMenu[] | null>(null);
  const { navigate } = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    const fetchData = async () => {
      const menuData: IMenu[] = await getMenu();
      setMenu(menuData);
    };

    fetchData();
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  // const [check, setCheck] = useState(false);
  const check = cartItems.length === 0;
  let totalSemua = 0;

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
      <FAB
        icon="cart"
        color="white"
        mode="elevated"
        style={styles.fab}
        onPress={() => setIsVisible(true)}
      />

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {cartItems.map((item, index) => {
          const menuItem = menu?.find((m) => m.id === item.menuId);

          // if (cartItems.length === 0) {
          //   setCheck(true); // Jika cartItems kosong, setCheck menjadi true
          // } else {
          //   setCheck(false);
          // }
          //   console.log("menu item",menuItem);

          if (!menuItem) {
            
            return null;
          }

          const totalHargaItem = item.jumlah * item.harga;
          totalSemua += totalHargaItem;
          // setCheck(false);

          return (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "bold" }}>
                  {menuItem.nama_menu}
                </ListItem.Title>
                <ListItem.Subtitle>
                  Qty: {item.jumlah} , Harga: Rp
                  {totalHargaItem.toLocaleString("id-ID")}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
        <View style={{ backgroundColor: "white" }}>
          <ListItem>
            <ListItem.Content
              style={{ borderTopWidth: 2, borderColor: "orange" }}
            >
              <ListItem.Title style={{ fontWeight: "bold", paddingTop: 10 }}>
                Total Pesanan
              </ListItem.Title>
              <ListItem.Subtitle>
                Rp{totalSemua.toLocaleString("id-ID")}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => setIsVisible(false)}
            >
              <Text style={styles.buttonText}>Hide</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "green" },
                check && { opacity: 0.5, backgroundColor: "gray" },
              ]}
              onPress={() => {
                !check && navigate("Transaksi"), setIsVisible(false);
              }}
              disabled={check}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    flexDirection: "row",
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
