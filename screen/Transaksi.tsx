import React, { useState, useEffect } from "react";
import { ListItem, Avatar } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useCoffeeCart } from "../context/CartContext";
import { IMenu } from "../types/menu-types";
import { getMenu } from "../Api/GetMenu";

function Transaksi() {
  const { cartItems } = useCoffeeCart(); // Menggunakan useCoffeeCart disini
  const [menu, setMenu] = React.useState<IMenu[] | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const menuData: IMenu[] = await getMenu();
      setMenu(menuData);
    };

    fetchData();
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [totalHarga, setTotalHarga] = useState(0);
  let totalSemua = 0;

  return (
    <View style={{ flex: 1 ,backgroundColor:"white"}}>
        <Text style={styles.heading}> Data Transaksi</Text>

      <View style={{ flex: 1 }}>
        <Text 
        style={{
            marginHorizontal: 10,
          }}>
            Masukkan Nama pelanggan
        </Text>
        <TextInput
          label="Nama"
          value={text}
          onChangeText={(text) => setText(text)}
          mode="outlined"
          outlineColor="orange"
          activeOutlineColor="orange"
          style={{
            backgroundColor:"white",
            marginHorizontal: 10,
            marginBottom: 20,
            marginTop: 10,
          }}
        />
        <Text 
        style={{fontSize: 22,
            fontWeight: "bold",
            color: "black",
            marginBottom: 10,
            textAlign: "center",}}
        >
            Pesanan
        </Text>
        <ScrollView>
          {cartItems.map((item, index) => {
            const menuItem = menu?.find((m) => m.id === item.menuId);
            //   console.log("menu item",menuItem);

            if (!menuItem) {
              return null;
            }

            const totalHargaItem = item.jumlah * item.harga;
            totalSemua += totalHargaItem;

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
        </ScrollView>
      </View>

      <ListItem>
        <ListItem.Content style={{ borderTopWidth: 2, borderColor: "orange" }}>
          <ListItem.Title style={{ fontWeight: "bold", paddingTop: 10 }}>
            Total Pesanan
          </ListItem.Title>
          <ListItem.Subtitle>
            Rp{totalSemua.toLocaleString("id-ID")}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
      },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal:10,
    borderRadius:10
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Transaksi;
