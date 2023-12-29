// Halaman DetailTransaksi.js

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  getTransaksi,
  getFilterTransaksi,
  getTransaksiById,
} from "../Api/GetTransaksi";
import { ITransaksi } from "../types/transaksi-types";

const DetailTransaksi = ({ route }) => {
  // Menerima data transaksi dari route.params
  const { transaksiData } = route.params;
  const { navigate } = useNavigation<NavigationProp<any>>();
  const [detail, setDetail] = React.useState<any>([]);
  const [detailTransaksi, setDetailTransaksi] = useState({
    resi: "",
    nama_pelanggan: "",
    nama_kasir: "",
    tgl_transaksi: "",
    total_harga: 0,
    DetailTransaksi: [],
  });

  // console.log("transaksi data", transaksiData)
  // coba jalanin lagi transaksi datanya dapet dari page transaksinya

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksiById(transaksiData.id);
        setDetail(response.data);
        console.log("detail in" + JSON.stringify(detail));
        // bisa ngga cantikku? gabisaa gimana errornya? ituu detailnya cuman object aja?
        setIsLoading(false); // Setelah mendapatkan data, atur isLoading menjadi false
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here
        setIsLoading(false); // Jika terjadi kesalahan, atur isLoading menjadi false
      }
    };

    fetchData();
    // console.log("detail",detail)
    // gimana sekarang? masi tetep,sekk tak ss in
  }, [transaksiData.id]);

  // Menampilkan data transaksi
  return (
    <View>
      <>
        <Text style={[{ fontWeight: "bold", textAlign: "center" }]}>
          Detail Transaksi
        </Text>
        <>
          {/* Tampilkan detail transaksi jika data sudah diambil */}
          {detail && (
            <>
              <Text>Invoice: {detail.resi}</Text>
              <Text>Nama Pembeli: {detail.nama_pelanggan}</Text>

              <Text style={{ textAlign: "left" }}>
                Nama Kasir: {detail.nama_kasir}
              </Text>
              <Text style={{ textAlign: "left" }}>
                Tanggal Transaksi: {detail.tgl_transaksi}
              </Text>
              <Text style={{ textAlign: "left" }}>
                Total: {detail.total_harga}
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
              {detail.DetailTransaksi ? (
                detail.DetailTransaksi.map((item, index) => (
                  <Text key={index} style={{ textAlign: "left" }}>
                    {"<3 "} {item.nama_menu} = {item.jumlah}
                  </Text>
                ))
              ) : (
                <Text style={{ textAlign: "left" }}>sabar</Text>
              )}
              <Text style={{ marginBottom: 10 }}></Text>
            </>
          )}
        </>
      </>

      <TouchableOpacity style={styles.button} onPress={() => navigate("List")}>
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
