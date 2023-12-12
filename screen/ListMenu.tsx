import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { getTransaksi } from "../Api/GetTransaksi";
import { ITransaksi } from "../types/transaksi-types";
import { WebView } from "react-native-webview";
import RootLayout from "../Layout/RootLayout";
import * as React from "react";
// import { Table, TableWrapper, Row,Cell  } from "react-native-table-component";
import { DataTable } from "react-native-paper";
// import { Col, Row, Grid } from "react-native-easy-grid";

const ListMenu = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [transaksiData, setTransaksiData] = React.useState([]);

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransaksi(); // Panggil fungsi getTransaksi dari API
        // console.log("ini response", response);

        setTransaksiData(response.data);

        if (transaksiData) {
          console.log("transaksi data", transaksiData);
          transaksiData.map((data, index) => {
            console.log(`data ${index} :` + JSON.stringify(data));
            console.log(
              `data detail transaksi untuk transaksi ke- ${index} :` +
                JSON.stringify(data.DetailTransaksi)
            );
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <RootLayout>
        <View style={styles.centeredView}>
          <ScrollView></ScrollView>
        </View>
      </RootLayout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  video: {
    width: 300,
    height: 200,
    marginTop: 20,
  },
  dataWrapper: { marginTop: -1 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4, // Ubah tinggi bayangan (shadow)
    },
    shadowOpacity: 0.5, // Ubah transparansi bayangan
    shadowRadius: 10,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "orange",
  },
  buttonClose: {
    backgroundColor: "orange",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  transactionDetail: {
    textAlign: "left",
    paddingTop: 20,
  },
});

export default ListMenu;
