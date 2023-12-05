import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,Button } from 'react-native';
import { useCoffeeCart } from '../context/CartContext';
import { IMenu } from '../types/menu-types';
// import { Button } from '../ui/button';
import { Card,Icon } from '@rneui/themed';

interface Props {
  menu: IMenu
}

const CardMenu: React.FC<Props> = ({ menu }: Props) => {
  // const {
  //   getItemQuantity,
  //   increaseCartQuantity,
  //   decreaseCartQuantity,
  //   cartItems,
  // } = useCoffeeCart();
  // const quantity = getItemQuantity(menu.id);

  // const formatCurrency = (amount: number) => {
  //   const formattedAmount = new Intl.NumberFormat('id-ID', {
  //     style: 'currency',
  //     currency: 'IDR',
  //     minimumFractionDigits: 0,
  //   }).format(amount);

  //   return formattedAmount;
  // };

  return (
    <View
      // style={styles.cardContainer}
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
          <Text style={{ marginBottom: 10 }}>
          {menu.deskripsi}
          </Text>
          <Button
            
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="ADD "
          />
        </Card>
      {/* <View style={styles.imageContainer}>
        <Image
          source={{
            uri: menu.gambar ||
              'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.menuName}>{menu.nama_menu}</Text>
        <Text style={styles.description}>{menu.deskripsi}</Text>
        <Text style={styles.price}>{menu.harga}</Text>
      </View>
      <View style={styles.buttonContainer}>
       
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => increaseCartQuantity(menu)}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        
      </View> */}
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
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    padding: 8,
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    color: 'black',
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CardMenu;
