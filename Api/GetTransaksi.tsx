import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITransaksi } from "../types/transaksi-types";

const getTransaksi = async () => {
  try {
    // const [transaksiData, setTransaksiData] = React.useState<ITransaksi[]>([]);
    const token = await AsyncStorage.getItem("token");
    // let controller  = new AbortController()
    // hi cantikk <3
    const response = await fetch(
      `https://api-cafe-ukk.vercel.app/v1/transaksi`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    } else {
      // console.log(error);
      throw error;
    }
  }
};
export { getTransaksi };

const getFilterTransaksi = async (key?: string) => {
  try {
    // const [transaksiData, setTransaksiData] = React.useState<ITransaksi[]>([]);
    const token = await AsyncStorage.getItem("token");
    // let controller  = new AbortController()
    // hi cantikk <3
    const response = await fetch(
      `https://api-cafe-ukk.vercel.app/v1/transaksi?resi=${key ?? ''}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    } else {
      // console.log(error);
      throw error;
    }
  }
};
export { getFilterTransaksi };

const getTransaksiById = async (id: number) => {
  try {
    // const [transaksiData, setTransaksiData] = React.useState<ITransaksi[]>([]);
    const token = await AsyncStorage.getItem("token");
    // let controller  = new AbortController()
    // hi cantikk <3
    const response = await fetch(
      `https://api-cafe-ukk.vercel.app/v1/transaksi/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      // console.log(error.message);
    } else {
      // console.log(error);
      throw error;
    }
  }
};
export { getTransaksiById };
