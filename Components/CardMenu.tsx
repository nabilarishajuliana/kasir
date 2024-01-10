import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { IMenu } from "../types/menu-types";
// import { Button } from '../ui/button';
// import { Card, Icon } from "@rneui/themed";
import { useCoffeeCart } from "../context/CartContext";
import { Card } from "react-native-paper";
import { Icon } from "react-native-paper";

interface Props {
  menu: IMenu;
}

const CardMenu: React.FC<Props> = ({ menu }: Props) => {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useCoffeeCart();
  const quantity = getItemQuantity(menu.id);

  return (
    <View key={menu.id}>
      <Card style={styles.cardContainer} mode="contained">
        <View>
          <View style={styles.cardContent}>
            <Card.Cover source={{ uri: menu.gambar }} style={styles.image} />
            <View style={styles.textContent}>
              <Card.Content>
                <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.textTittle}
                >
                  {menu.nama_menu}
                </Text>
                <Text style={styles.textDes}>{menu.deskripsi}</Text>
                </View>
                
                <View style={styles.priceAndAction}>
                  <View style={{ width: 90 }}>
                    <Text style={styles.textPrice}>
                      Rp{menu.harga.toLocaleString("id-ID")}
                    </Text>
                  </View>

                  <Card.Actions style={styles.actionsContainer}>
                    {quantity === 0 ? (
                      <View>
                        <TouchableOpacity
                          onPress={() => increaseCartQuantity(menu)}
                          style={{
                            backgroundColor: "orange",
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            borderRadius: 8,
                          }}
                        >
                          {/* <Text
                      style={{
                        backgroundColor: "orange",
                        paddingVertical: 8,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        color: "white", // Untuk mengatur warna teks menjadi putih
                        fontWeight: "600", // Gunakan '600' untuk semibold
                        textAlign: "center", // Untuk meletakkan teks di tengah
                      }}
                    >
                      Add to Cart
                    </Text> */}
                          <Icon source="plus" color="white" size={15} />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.spaceBetween}>
                        <TouchableOpacity
                          onPress={() => decreaseCartQuantity(menu)}
                          style={{
                            padding: 6,
                            borderRadius: 8,
                            borderColor: "orange",
                            borderWidth: 2,
                            marginRight: 5,
                          }}
                        >
                          {/* <View style={styles.quantityButton}>
                      <Text style={styles.buttonText}>-</Text>
                    </View> */}
                          <Icon source="minus" color="orange" size={15} />
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{quantity}</Text>

                        <TouchableOpacity
                          onPress={() => increaseCartQuantity(menu)}
                          style={{
                            padding: 5,
                            borderRadius: 8,
                            borderColor: "orange",
                            borderWidth: 2,
                            // marginHorizontal: 10,
                            marginLeft: 5,
                          }}
                        >
                          {/* <View style={styles.quantityButton}>
                      <Text style={styles.buttonText}>+</Text>
                    </View> */}
                          <Icon source="plus" color="orange" size={15} />
                        </TouchableOpacity>
                      </View>
                    )}
                  </Card.Actions>
                </View>
              </Card.Content>
            </View>
          </View>
        </View>
      </Card>

      {/* <Card >
        <Card.Title>{menu.nama_menu}</Card.Title>
        <Card.Divider />
        <Card.Image
          style={{ padding: 0 }}
          source={{
            uri: menu.gambar,
          }}
        />
        <Text style={{ marginTop: 10 }}>{menu.deskripsi}</Text>
        <Text
          style={{
            marginBottom: 20,
            marginTop: 5,
            fontWeight: "bold",
            color: "orange",
          }}
        >
          Rp{menu.harga.toLocaleString("id-ID")}
        </Text>

      

        {quantity === 0 ? (
          <View >
            <TouchableOpacity onPress={() => increaseCartQuantity(menu)}>
              <Text
                style={{
                  backgroundColor: "orange",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  color: "white", // Untuk mengatur warna teks menjadi putih
                  fontWeight: "600", // Gunakan '600' untuk semibold
                  textAlign: "center", // Untuk meletakkan teks di tengah
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.spaceBetween}>
          
            <TouchableOpacity onPress={() => decreaseCartQuantity(menu)}>
              <View style={styles.quantityButton}>
                <Text style={styles.buttonText}>-</Text>
              </View>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>
           
            <TouchableOpacity onPress={() => increaseCartQuantity(menu)}>
              <View style={styles.quantityButton}>
                <Text style={styles.buttonText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Card> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 3,
    backgroundColor: "white",
  },
  imageContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  // image: {
  //   margin: 10,
  // },
  textTittle: {
    fontSize: 17,
  },
  textDes: {
    color: "grey",
    marginTop: 5,
  },
  textPrice: {
    fontWeight: "bold",
  },
  menuName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "orange",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  addToCartButton: {
    backgroundColor: "orange",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  // quantityButton: {
  //   backgroundColor: 'lightgray',
  //   padding: 8,
  //   borderRadius: 4,
  // },
  quantityButtonText: {
    fontSize: 18,
    color: "black",
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  fullWidth: {
    flex: 1,
  },
  spaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#EEE",
    width: 40,
    height: 40,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  cardContent: {
    flexDirection: "row", // Mengatur tata letak horizontal
    alignItems: "flex-start", // Untuk menengahkan gambar dan teks vertikal
    padding: 10,
  },
  image: {
    width: 100, // Sesuaikan ukuran gambar
    height: 100, // Sesuaikan ukuran gambar
    marginRight: 3, // Untuk memberikan jarak antara gambar dan teks
  },
  textContent: {
    flex: 1, // Agar teks dapat mengisi ruang yang tersisa
  },
  priceAndAction: {
    flexDirection: "row", // Tata letak horizontal
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1, // Agar teks harga dan actions dapat mengisi ruang yang tersedia
    width: "100%", // Menggunakan lebar penuh
  },
  actionsContainer: {
    flexDirection: "row", // Tata letak horizontal
  },
});

export default CardMenu;
