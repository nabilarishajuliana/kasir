import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { getTransaksi, getFilterTransaksi } from "../Api/GetTransaksi";
import { ITransaksi } from "../types/transaksi-types";
import { WebView } from "react-native-webview";
import RootLayout from "../Layout/RootLayout";
import * as React from "react";
// import { Table, TableWrapper, Row,Cell  } from "react-native-table-component";
import { DataTable } from "react-native-paper";
// import { Col, Row, Grid } from "react-native-easy-grid";
import { List, Card, Searchbar } from "react-native-paper";

const ListTransaksi = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [transaksiData, setTransaksiData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");

  const fetchData = async (value?: string) => {
    setIsLoading(true);
    try {
      const response = await getFilterTransaksi(value || searchQuery);
      const fetchedTransaksiData: ITransaksi[] = response.data;
      // console.log(fetchedTransaksiData);

      if (fetchedTransaksiData.length > 1) {
        fetchedTransaksiData.sort((a, b) => {
          const dateA = new Date(a.tgl_transaksi);
          const dateB = new Date(b.tgl_transaksi);
          return dateB.getTime() - dateA.getTime();
        });
      }

      setTransaksiData(fetchedTransaksiData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const handleInputChange = async (value: string) => {
    setSearchQuery(value);
    fetchData(value);
  };

  React.useEffect(() => {
    fetchData();
  }, [searchQuery]);

  return (
    <>
      <RootLayout>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            {/* <ScrollView> */}
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {selectedTransaction && (
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
                      Invoice: {selectedTransaction.resi}
                    </Text>
                    <Text
                      style={{
                        textAlign: "left",
                        borderTopWidth: 2,
                        paddingTop: 20,
                      }}
                    >
                      Nama Pembeli: {selectedTransaction.nama_pelanggan}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      Nama Kasir: {selectedTransaction.nama_kasir}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      Tanggal Transaksi: {selectedTransaction.tgl_transaksi}
                    </Text>
                    <Text style={{ textAlign: "left" }}>
                      Total:{" "}
                      {selectedTransaction.total_harga.toLocaleString("id-ID")}
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
                    {selectedTransaction.DetailTransaksi.map((item, index) => (
                      <>
                        <Text style={{ textAlign: "left" }}>
                          {"<3 "} {item.nama_menu} = {item.jumlah}
                        </Text>
                      </>
                    ))}
                    <Text style={{ marginBottom: 10 }}></Text>
                  </>
                )}
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setSelectedTransaction(null);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
            {/* </ScrollView> */}
          </Modal>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>History Transaksi</Text>
          <Searchbar
            placeholder="masukkan invoice"
            onChangeText={handleInputChange}
            value={searchQuery}
            iconColor="orange"
            style={styles.search}
          />
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="orange"
              style={{ flex: 1, marginTop: 10 }}
            />
          ) : (
            <>
              {transaksiData && // Check if transaksiData is not null or undefined
                (Array.isArray(transaksiData) ? (
                  transaksiData.length > 0 ? (
                    <View style={styles.container}>
                      {transaksiData.map((item) => (
                        <Card key={item.id} style={styles.card}>
                          <Card.Content style={styles.cardContent}>
                            <Text style={styles.textCard}>{item.resi}</Text>
                            <Text style={{ color: "grey" }}>
                              {item.tgl_transaksi}
                            </Text>
                          </Card.Content>
                          <Card.Content>
                            <Text>Pembeli : {item.nama_pelanggan}</Text>
                            <Text>Kasir : {item.nama_kasir}</Text>
                          </Card.Content>
                          <Card.Actions>
                            <Pressable
                              style={[styles.button, styles.buttonOpen]}
                              onPress={() => {
                                setSelectedTransaction(item);
                                setModalVisible(true);
                              }}
                            >
                              <Text style={styles.textStyle}>Detail</Text>
                            </Pressable>
                          </Card.Actions>
                        </Card>
                      ))}
                    </View>
                  ) : (
                    <Text style={{ textAlign: "center" }}>
                      Data transaksi tidak ditemukan
                    </Text>
                  )
                ) : (
                  // Render a single card for the object
                  <View style={styles.container}>
                    <Card style={styles.card}>
                      <Card.Content style={styles.cardContent}>
                        <Text style={styles.textCard}>
                          {transaksiData.resi}
                        </Text>
                        <Text style={{ color: "grey" }}>
                          {transaksiData.tgl_transaksi}
                        </Text>
                      </Card.Content>
                      <Card.Content>
                        <Text>Pembeli : {transaksiData.nama_pelanggan}</Text>
                        <Text>Kasir : {transaksiData.nama_kasir}</Text>
                      </Card.Content>
                      <Card.Actions>
                        <Pressable
                          style={[styles.button, styles.buttonOpen]}
                          onPress={() => {
                            setSelectedTransaction(transaksiData);
                            setModalVisible(true);
                          }}
                        >
                          <Text style={styles.textStyle}>Detail</Text>
                        </Pressable>
                      </Card.Actions>
                    </Card>
                  </View>
                ))}
            </>
          )}
        </View>
      </RootLayout>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 7,
    width: 300,
    backgroundColor: "white",
  },
  container: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
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
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Opsional, untuk penempatan vertikal jika diperlukan
    paddingBottom: 5,
  },
  textCard: {
    fontWeight: "bold",
  },
  search: {
    backgroundColor: "white",
  },
});

export default ListTransaksi;

// INI YG PAKAI "react-native-table-component"

// const ListTransaksi = () => {
//   const tableHead = [
//     "Invoice",
//     "Nama Pembeli",
//     "Petugas",
//     "Tanggal Transaksi",
//     "Total Harga",

//   ];
//   const widthArr = [160, 160, 160, 160, 160];

//   const [transaksiData, setTransaksiData] = React.useState([]);

//   const tableData = [];
//   for (let i = 0; i < 30; i += 1) {
//     const rowData = [];
//     for (let j = 1; j <= 9; j += 1) {
//       rowData.push(`${i}${j}`);
//     }
//     tableData.push(rowData);
//   }

//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getTransaksi(); // Panggil fungsi getTransaksi dari API
//         console.log("ini response",response);

//         setTransaksiData(
//           Array.isArray(response.data)
//             ? response.data
//             : [response.data]
//         );
//         console.log("ini transaksidata",transaksiData);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();

//   }, []);
//   return (
//     <>
//       <RootLayout>
//         <View style={styles.container}>
//           <Text style={styles.title}>List Transaksi</Text>
//           <ScrollView horizontal={true}>
//             <View>
//               <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
//                 <Row
//                   data={tableHead}
//                   widthArr={widthArr}
//                   style={styles.header}
//                   textStyle={styles.text}
//                 />
//               </Table>
//               <ScrollView style={styles.dataWrapper}>
//                 <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
//                   {tableData.map((rowData, index) => (
//                     <Row
//                       key={index}
//                       data={rowData}
//                       widthArr={widthArr}
//                       style={[
//                         styles.row,
//                         index % 2 && { backgroundColor: "#F7F6E7" },
//                       ]}
//                       textStyle={styles.text}
//                     />
//                   ))}
//                 </Table>
//               </ScrollView>
//             </View>
//           </ScrollView>
//         </View>
//       </RootLayout>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 20,
//   },
//   header: { height: 50, backgroundColor: "#537791" },
//   text: { textAlign: "center", fontWeight: "100" },
//   dataWrapper: { marginTop: -1 },
//   row: { height: 40, backgroundColor: "#E7E6E1" },
// });

// export default ListTransaksi;

//INI YANG PAKAI "react-native-paper"

//INI YANG PAKAI "react-native-easy-grid"

// const ListTransaksi = () => {
//   const [page, setPage] = React.useState<number>(0);
//   const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
//   const [itemsPerPage, onItemsPerPageChange] = React.useState(
//     numberOfItemsPerPageList[0]
//   );

//   const [items] = React.useState([
//     {
//       key: 1,
//       nama_pembeli: "risa",
//       nama_kasir: "kasir1",
//       tgl: "2023-09-04",
//       total: 400000,
//       invoice: "ABCDE",
//     },
//     {
//       key: 2,
//       nama_pembeli: "kaka",
//       nama_kasir: "kasir",
//       tgl: "2023-09-04",
//       total: 160000,
//       invoice: "ABCDE",
//     },
//     {
//       key: 3,
//       nama_pembeli: "anton",
//       nama_kasir: "kasir",
//       tgl: "2023-09-04",
//       total: 100000,
//       invoice: "ABCDE",
//     },
//     {
//       key: 4,
//       nama_pembeli: "jamal",
//       nama_kasir: "kasir",
//       tgl: "2023-09-04",
//       total: 10000,
//       invoice: "ABCDE",
//     },
//   ]);

//   const from = page * itemsPerPage;
//   const to = Math.min((page + 1) * itemsPerPage, items.length);

//   React.useEffect(() => {
//     setPage(0);
//   }, [itemsPerPage]);

//   return (
//     <>
//       <RootLayout>
//         <View style={styles.container}>
//           <Text style={styles.title}>List Transaksi</Text>
//           <Grid>
//         <Col size={50}>
//           <Row style={styles.cell}>
//             <Text>A</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>B</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>C</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>D</Text>
//           </Row>
//         </Col>
//         <Col size={25}>
//         <Row style={styles.cell}>
//             <Text>E</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>F</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>G</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>H</Text>
//           </Row>
//         </Col>
//         <Col size={25}>
//         <Row style={styles.cell}>
//             <Text>1</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>2</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>3</Text>
//           </Row>
//           <Row style={styles.cell}>
//             <Text>4</Text>
//           </Row>
//         </Col>
//       </Grid>
//           {/* <Grid>
//             {items.map((item) => (
//               <Row style={styles.cell}>
//                 <Col>
//                   <Text>{item.invoice}</Text>
//                 </Col>
//                 <Col>
//                   <Text>{item.nama_pembeli}</Text>
//                 </Col>
//                 <Col>
//                   <Text>{item.nama_kasir}</Text>
//                 </Col>
//                 <Col>
//                   <Text>{item.tgl}</Text>
//                 </Col>
//                 <Col>
//                   <Text>{item.total}</Text>
//                 </Col>
//               </Row>
//             ))}
//           </Grid> */}
//
//         </View>
//       </RootLayout>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
//   video: {
//     width: 300,
//     height: 200,
//     marginTop: 20,
//   },
//   dataWrapper: { marginTop: -1 },
//   cell: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
// });

// export default ListTransaksi;
