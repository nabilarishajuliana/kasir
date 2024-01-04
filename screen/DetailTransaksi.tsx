// Halaman DetailTransaksi.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  getTransaksi,
  getFilterTransaksi,
  getTransaksiById,
} from "../Api/GetTransaksi";
import { Icon, MD3Colors } from "react-native-paper";

const DetailTransaksi = ({ route }) => {
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksiById(transaksiData.id);
        setDetail(response.data);
        console.log("detail in" + JSON.stringify(detail));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [transaksiData.id]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Image
        source={require("../assets/succses_transaksi.png")} // Ganti dengan path gambar Anda
        style={{ width: "100%", height: 200 }} // Sesuaikan ukuran gambar
      />

      <View style={styles.containerBody}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Transaksi Berhasil</Text>
          <Icon source="check-circle-outline" color="green" size={25} />
        </View>
                  <ScrollView>

        {isLoading ? ( // Menampilkan ActivityIndicator jika isLoading true
          <ActivityIndicator size="large" color="orange" />
        ) : (
            <View>
              {detail && (
                <>
                  <View style={styles.container}>
                    <View style={styles.text}>
                      <Text style={{ textAlign: "left", fontSize: 15 }}>
                        Invoice: {detail.resi}
                      </Text>
                      <Text style={{ textAlign: "left", fontSize: 15 }}>
                        Nama Pembeli: {detail.nama_pelanggan}
                      </Text>

                      <Text style={{ textAlign: "left", fontSize: 15 }}>
                        Nama Kasir: {detail.nama_kasir}
                      </Text>
                      <Text style={{ textAlign: "left", fontSize: 15 }}>
                        Tanggal Transaksi: {detail.tgl_transaksi}
                      </Text>
                      <Text style={{ textAlign: "left", fontSize: 15 }}>
                        Total: {detail.total_harga}
                      </Text>
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        borderBottomWidth: 2,
                        paddingVertical: 10,
                        marginBottom: 10,
                        fontSize: 15,
                      }}
                    >
                      Pesanan:
                    </Text>
                    <View style={styles.text}>
                      {detail.DetailTransaksi ? (
                        detail.DetailTransaksi.map((item, index) => (
                          <Text
                            key={index}
                            style={{ textAlign: "left", fontSize: 15 }}
                          >
                            {"<3 "} {item.nama_menu} = {item.jumlah}
                          </Text>
                        ))
                      ) : (
                        <Text style={{ textAlign: "left" }}>sabar</Text>
                      )}
                    </View>
                  </View>
                </>
              )}
            </View>
        )}
          </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate("List")}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    alignItems: "center",
    flexDirection: "row", // Menyusun teks dan ikon dalam satu baris
    marginVertical: 20, // Atur margin bottom sesuai kebutuhan
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    // borderBottomColor: "black",
    // borderBottomWidth: 2,
    marginRight: 10,
  },
  container: {
    marginHorizontal: 15,
  },
  containerBody: {
    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    elevation: 15,
    paddingTop: 5,
    alignItems: "center",
  },
  button: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  text: {
    marginHorizontal: 10,
  },
  shadowContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 10, // Tinggi bayangan yang ingin Anda tentukan

    elevation: 5,
  },
});

export default DetailTransaksi;
