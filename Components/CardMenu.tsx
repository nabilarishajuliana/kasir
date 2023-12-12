import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { IMenu } from '../types/menu-types';
// import { Button } from '../ui/button';
import { Card,Icon } from '@rneui/themed';
import { useCoffeeCart } from '../context/CartContext';

interface Props {
  menu: IMenu
}

const CardMenu: React.FC<Props> = ({ menu }: Props) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    cartItems,
  } = useCoffeeCart();
  const quantity = getItemQuantity(menu.id);
  
 

  return (
    <View
      key={menu.id}
    >
      <Card>
          <Card.Title>{menu.nama_menu}</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri:
              menu.gambar,
            }}
          />
          <Text style={{ marginTop:10  }}>
          {menu.deskripsi}
          </Text>
          <Text style={{ marginBottom: 20,marginTop:5, fontWeight: 'bold', color: 'orange' }}>
          Rp{menu.harga.toLocaleString('id-ID')}
          </Text>
          
          {/* <TouchableOpacity onPress={handleAddToCart}>
            <Text  style={{
              backgroundColor: 'orange',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
              color: 'white', // Untuk mengatur warna teks menjadi putih
              fontWeight: '600', // Gunakan '600' untuk semibold
              textAlign: 'center', // Untuk meletakkan teks di tengah
            }}>
              ADD
            </Text>
          </TouchableOpacity> */}

{quantity === 0 ? (
        <View style={styles.fullWidth}>
          <TouchableOpacity  onPress={() => increaseCartQuantity(menu)}>
            <Text style={{
              backgroundColor: 'orange',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
              color: 'white', // Untuk mengatur warna teks menjadi putih
              fontWeight: '600', // Gunakan '600' untuk semibold
              textAlign: 'center', // Untuk meletakkan teks di tengah
            }}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.spaceBetween}>
          <TouchableOpacity onPress={() => decreaseCartQuantity(menu)} style={styles.quantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => increaseCartQuantity(menu)} style={styles.quantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
        </Card>
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,

    flexDirection: 'column',

    alignItems: 'center',

    margin: 5,
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'orange',
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  addToCartButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  // buttonText: {
  //   color: 'white',
  //   fontWeight: 'bold',
  // },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // quantityButton: {
  //   backgroundColor: 'lightgray',
  //   padding: 8,
  //   borderRadius: 4,
  // },
  quantityButtonText: {
    fontSize: 18,
    color: 'black',
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullWidth: {
    flex: 1,
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: '#EEE',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CardMenu;
