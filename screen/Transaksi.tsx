import React, { useState, useEffect } from "react";
import { ListItem, Avatar } from "react-native-elements";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { TextInput, Divider } from "react-native-paper";
import { useCoffeeCart } from "../context/CartContext";
import { IMenu } from "../types/menu-types";
import { IMeja } from "../types/meja-types";
import { getMenu } from "../Api/GetMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { getMeja } from "../Api/GetMeja";
// import { PaperSelect } from "react-native-paper-select";
import { SelectList } from "react-native-dropdown-select-list";

function Transaksi() {
  const { cartItems } = useCoffeeCart(); // Menggunakan useCoffeeCart disini
  const [menu, setMenu] = React.useState<IMenu[] | null>(null);
  const [meja, setMeja] = React.useState<IMeja[] | null>(null);
  const [text, setText] = useState("");
  const [userID, setUserID] = useState("");
  const [selected, setSelected] = React.useState(0);
  const [dataOrder, setDataOrder] = React.useState({
    nama_pelanggan: "",
    status: "belum-lunas",
    tgl_transaksi: new Date().toISOString().split("T")[0],
    userId: parseInt(userID),
    mejaId: selected,
    detailTransaksi: cartItems,
  });
  // const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>([]);
  // const [value, setValue] = React.useState("first");

  useEffect(() => {
    const fetchData = async () => {
      const menuData: IMenu[] = await getMenu();
      setMenu(menuData);
    };
    const fetchDataMeja = async () => {
      const mejaItem: IMeja[] = await getMeja();
      setMeja(mejaItem);
      // console.log("data meja", meja);
    };

    fetchData();
    fetchDataMeja();
    console.log("select id meja", selected);

    AsyncStorage.getItem("id")
      .then((value) => {
        if (value !== null) {
          setUserID(value);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let totalSemua = 0;

  const handleChange = (value: any, name: any) => {
    setDataOrder({
      ...dataOrder,
      [name]: value,
    });
  };

  // const [gender, setGender] = useState({
  //   value: "",
  //   list: [
  //     { _id: "1", value: "MALE" },
  //     { _id: "2", value: "FEMALE" },
  //     { _id: "3", value: "OTHERS" },
  //   ],
  //   selectedList: [],
  //   error: "",
  // });

  const mejaArray = meja
    ? meja.map((meja) => ({
        key: meja.id, // Sesuaikan dengan tipe data yang diperlukan
        value: meja.nomor_meja,
      }))
    : null;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <Text style={styles.heading}> Data Transaksi</Text>
        {/* <Divider bold ={true} style={{marginBottom:10,}} theme={{ colors: { primary: 'green' } }} /> */}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginHorizontal: 15,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Masukkan Nama Pelanggan :
          </Text>
          <TextInput
            label="Nama"
            value={dataOrder.nama_pelanggan}
            onChangeText={(value) => handleChange(value, "nama_pelanggan")}
            mode="outlined"
            outlineColor="orange"
            activeOutlineColor="orange"
            style={{
              backgroundColor: "white",
              marginHorizontal: 15,
              marginBottom: 20,
              marginTop: 10,
              borderRadius: 30,
            }}
            outlineStyle={{ borderRadius: 10 }}
          />

          <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
            <Text style={{ marginBottom: 10, fontWeight: "500", fontSize: 15 }}>
              Pilih Meja :
            </Text>

            {/* <PaperSelect
              label="Select Gender"
              value={gender.value}
              onSelection={(value: any) => {
                setGender({
                  ...gender,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: "",
                });
              }}
              arrayList={[...gender.list]}
              selectedArrayList={gender.selectedList}
              errorText={gender.error}
              multiEnable={false}
              dialogTitleStyle={{ color: "red" }}
              // checkboxColor="yellow"
              // checkboxLabelStyle={{ color: 'red', fontWeight: '700' }}
              // textInputBackgroundColor="yellow"
              // textInputColor="red"
              // outlineColor="black"
              theme={{
                colors: {
                  placeholder: "black",
                },
              }}
            /> */}

            <SelectList
              setSelected={setSelected}
              data={mejaArray}
              onSelect={() => alert(selected)}
              boxStyles={{ borderColor: "orange" }}
              search={false} 
            />
          </View>
          <Text
            style={{
              // fontSize: 22,
              // fontWeight: "bold",
              // color: "black",
              // marginBottom: 10,
              // textAlign: "center",
              marginHorizontal: 15,
              fontWeight: "500",
              fontSize: 15,
            }}
          >
            Pesanan :
          </Text>
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
                  <ListItem.Title style={{ fontSize: 14 }}>
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
        </View>
      </ScrollView>
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
    borderBottomColor: "black",
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginHorizontal: 10,
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
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Transaksi;
