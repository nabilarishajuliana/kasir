
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useCoffeeCart } from "../context/CartContext";

const Overlay = () => {
    const {modalVisible, setModalVisible} = useCoffeeCart();

    return (
      <TouchableOpacity
        style={[
          styles.overlay,
          { display: modalVisible ? "flex" : "none" }, // Tampilkan overlay hanya saat modal terlihat
        ]}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.overlayBackground} />
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
   
    overlay: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1,
    },
    overlayBackground: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  
  export default Overlay;