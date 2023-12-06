import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getTransaksi } from "../Api/GetTransaksi";
import { ITransaksi } from "../types/transaksi-types";
import { WebView } from "react-native-webview";
import RootLayout from "../Layout/RootLayout";
import * as React from "react";
import { Table, TableWrapper, Row } from "react-native-table-component"; 
import { DataTable } from "react-native-paper";
// import RootLayout from './RootLayout'; // Ubah path sesuai dengan struktur proyek Anda

// const ListTransaksi = () => {
//   const tableHead = [
//     "Head",
//     "Head2",
//     "Head3",
//     "Head4",
//     "Head5",
//     "Head6",
//     "Head7",
//     "Head8",
//     "Head9",
//   ];
//   const widthArr = [160, 160, 160, 160, 160, 160, 160, 160, 160];

//   const [transaksiData, setTransaksiData] = React.useState<ITransaksi[]>([]);


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
//       const response  = await getTransaksi();
//       setTransaksiData(
//         Array.isArray(response.data.data)
//           ? response.data.data
//           : [response.data.data]
//       );    };

//     fetchData();
//     // console.log(dataMenu);
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

const ListTransaksi = () => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
    {
      key: 1,
      nama_pembeli: "risa",
      nama_kasir: "kasir1",
      tgl: "2023-09-04",
      total: 400000,
      invoice: "ABCDE",

    },
    {
      key: 2,
      nama_pembeli: "kaka",
      nama_kasir: "kasir",
      tgl: "2023-09-04",
      total: 160000,
      invoice: "ABCDE",

    },
    {
      key: 3,
      nama_pembeli: "anton",
      nama_kasir: "kasir",
      tgl: "2023-09-04",
      total: 100000,
      invoice: "ABCDE",

    },
    {
      key: 4,
      nama_pembeli: "jamal",
      nama_kasir: "kasir",
      tgl: "2023-09-04",
      total: 10000,
      invoice: "ABCDE",

    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      <RootLayout>
        <View style={styles.container}>
          <Text style={styles.title}>List Transaksi</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>invoice</DataTable.Title>
              <DataTable.Title>Pembeli</DataTable.Title>
              <DataTable.Title>Petugas</DataTable.Title>
              <DataTable.Title>Tanggal Transaksi</DataTable.Title>
              <DataTable.Title numeric>Total</DataTable.Title>
            </DataTable.Header>

            {items.map((item) => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.invoice}</DataTable.Cell>
                <DataTable.Cell>{item.nama_pembeli}</DataTable.Cell>
                <DataTable.Cell>{item.nama_kasir}</DataTable.Cell>
                <DataTable.Cell>{item.tgl}</DataTable.Cell>
                <DataTable.Cell numeric>{item.total}</DataTable.Cell>
              </DataTable.Row>
            ))}

            {/* <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            /> */}
          </DataTable>
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
});

export default ListTransaksi;
