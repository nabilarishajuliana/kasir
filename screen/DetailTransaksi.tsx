// Halaman DetailTransaksi.js

import React from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";


const DetailTransaksi = ({ route }) => {
  // Menerima data transaksi dari route.params
  const { transaksiData } = route.params;
  const { navigate } = useNavigation<NavigationProp<any>>();


  // Menampilkan data transaksi
  return (
    <View>
        {transaksiData && (
                  <>
                    <Text style={[{ fontWeight: "bold", textAlign: "center" }]}>
                      Detail Transaksi
                    </Text>
                    <Text
                      style={[
                        styles.modalText,
                        { fontWeight: "400", fontSize: 12, opacity: 0.5 },
                      ]}
                    >
                      {" "}
                      Invoice: {transaksiData.resi}
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",
                        borderTopWidth: 2,
                        paddingTop: 20,
                      }}
                    >
                      Nama Pembeli: {transaksiData.nama_pelanggan}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      Nama Kasir: {transaksiData.nama_kasir}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      Tanggal Transaksi: {transaksiData.tgl_transaksi}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      Total:{" "}
                      {transaksiData.total_harga.toLocaleString("id-ID")}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        borderBottomWidth: 2,
                        paddingVertical: 10,
                        marginBottom: 10,
                      }}
                    >
                      Pesanan:
                    </Text>
                    {transaksiData.DetailTransaksi.map((item, index) => (
                      <>
                        <Text style={{ textAlign: "left" }}>
                          {"<3 "} {item.nama_menu} = {item.jumlah}
                        </Text>
                      </>
                    ))}
                    <Text style={{ marginBottom: 10 }}></Text>
                  </>
                )}

      {/* <Text>ID Transaksi: {transaksiData.resi}</Text>
      <Text>Tanggal Transaksi: {transaksiData.tgl_transaksi}</Text>
      <Text>Status: {transaksiData.status}</Text>
      <Text>Nama Pelanggan: {transaksiData.nama_pelanggan}</Text> */}
      {/* Tambahkan informasi lain yang relevan dari data transaksi */}
      <TouchableOpacity style={styles.button} onPress={() => navigate('List')}>
     
            <Text style={{ color: "white" }}>back</Text>

      </TouchableOpacity>
    </View>
  );
};

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
    modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
   
  });

export default DetailTransaksi;
